package com.ssafy.laka.service;

import com.ssafy.laka.domain.LearningRecord;
import com.ssafy.laka.domain.Study;
import com.ssafy.laka.domain.User;
import com.ssafy.laka.domain.UserTag;
import com.ssafy.laka.domain.enums.Stage;
import com.ssafy.laka.dto.dashboard.*;
import com.ssafy.laka.dto.exception.dashboard.LearningRecordNotFoundException;
import com.ssafy.laka.dto.exception.dashboard.StudyNotFoundException;
import com.ssafy.laka.dto.exception.dashboard.TagNotFoundException;
import com.ssafy.laka.dto.exception.dashboard.TooManyTagException;
import com.ssafy.laka.dto.exception.study.VideoNotFoundException;
import com.ssafy.laka.dto.exception.user.DuplicateNicknameException;
import com.ssafy.laka.dto.exception.user.UserNotFoundException;
import com.ssafy.laka.dto.user.UpdateUserRequestDto;
import com.ssafy.laka.repository.*;
import com.ssafy.laka.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Transactional
public class DashboardServiceImpl implements DashboardService{

    private final UserRepository userRepository;
    private final LearningRecordRepository learningRecordRepository;
    private final WordbookRepository wordbookRepository;
    private final VideoRepository videoRepository;
    private final EssayRepository essayRepository;
    private final LikeVideoRepository likeVideoRepository;
    private final StudyRepository studyRepository;
    private final TagRepository tagRepository;
    private final UserTagRepository userTagRepository;

    private User getUser() {
        return SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername)
                .orElseThrow(UserNotFoundException::new);
    }
    @Override
    public List<TodayWordDto> getRandomWords() {
        User user = getUser();
        LearningRecord learningRecord = learningRecordRepository.findTop1ByUserOrderByModifiedDateDesc(user)
                .orElseThrow(LearningRecordNotFoundException::new);
        List<TodayWordDto> wordbook = wordbookRepository.findRandom5ByUserAndVideoAndMemorized(user.getUserId(), learningRecord.getVideo().getVideoId(), false)
                .stream().map(s -> TodayWordDto.of(s)).collect(Collectors.toList());
        return wordbook;
    }

    @Override
    public List<PlayingVideoDto> getPlayingList() {
        User user = getUser();
        List<LearningRecord> learningRecord = learningRecordRepository.findTop5ByUserAndStageLessThanOrderByModifiedDateDesc(user, Stage.COMPLETE);
        return learningRecord.stream().map(s -> PlayingVideoDto.of(videoRepository.findById(s.getVideo().getVideoId()).orElseThrow(VideoNotFoundException::new),
                s.getContinueTime(), s.getStage())).collect(Collectors.toList());
    }

    @Override
    public HistoryNumDto getHistory() {
        User user = getUser();
        int videos = learningRecordRepository.countByUserAndStage(user, Stage.COMPLETE);
        int essays = learningRecordRepository.countByUserAndAndEssayNotNull(user);
        int words = wordbookRepository.countByUser(user);
        HistoryNumDto historyNumDto = new HistoryNumDto(videos, essays, words);
        return historyNumDto;
    }

    @Override
    public TimeHistoryDto getTimeHistory() {
        User user = getUser();
        List<Study> studies = studyRepository.findByUser(user);
        if (studies.size() < 1){
            throw new StudyNotFoundException();
        }
        int time = 0;
        for (int i = 0; i < studies.size(); i ++){
            int thisTime = studies.get(i).getTime();
            time = thisTime + time;
        }
        return new TimeHistoryDto(time);
    }

    @Override
    public CalendarDto getCalendar() {
        User user = getUser();
        int[] time = new int[32];
        List<Study> studies = studyRepository.findStudyDateThisMonth(user.getUserId());

        for (int i = 0; i < studies.size(); i++) {
            int len = studies.get(i).getDate().length();
            time[Integer.parseInt(studies.get(i).getDate().substring(len - 2, len))] = studies.get(i).getTime();
        }
        int seqDay = user.getContiuousLearningDate();
        return new CalendarDto(time, seqDay);
    }

    @Override
    public List<VideoDto> getLikeVideos() {
        User user = getUser();
        return likeVideoRepository.findAllByUser(user)
                .stream().map(s -> VideoDto.of(s.getVideo())).collect(Collectors.toList());
    }

    @Override
    public List<VideoDto> getDoneVideos() {
        User user = getUser();
        return learningRecordRepository.findAllByUserAndStageOrderByModifiedDateDesc(user, Stage.COMPLETE)
                .stream().map(s -> VideoDto.of(s.getVideo())).collect(Collectors.toList());
    }

    @Override
    public int[] getData() {
        User user = getUser();
        int[] week = new int[15];
        List<Study> study = studyRepository.findStudyDateThisWeek(user.getUserId());
        List<Study> study2 = studyRepository.findStudyDateLastWeek(user.getUserId());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        for (int i = 0; i < study2.size(); i++) {
            String date = study2.get(i).getDate();
            LocalDate ld = LocalDate.parse(date, formatter);
            week[ld.getDayOfWeek().getValue()] = study2.get(i).getTime();
        }
        for (int i = 0; i < study.size(); i++) {
            String date = study.get(i).getDate();
            LocalDate ld = LocalDate.parse(date, formatter);
            week[ld.getDayOfWeek().getValue() + 7] = study.get(i).getTime();
        }
        return week;
    }

    @Override
    public List<String> getInterestTags() {
        User user = getUser();
        List<String> interestTagList = userTagRepository.findAllByUser(user)
                .stream().map(s -> s.getTag().getName()).collect(Collectors.toList());
        if (interestTagList.size() > 3) {
            throw new TooManyTagException();}

        return interestTagList;
    }

    @Override
    public void updateInterestTags(int[] interestTags) {
        User user = getUser();
        userTagRepository.deleteAllByUser(user);

        if (interestTags.length > 3) {
            throw new TooManyTagException();}


        for (int i = 0; i < interestTags.length; i++) {
            UserTag usertag = UserTag.builder()
                    .user(user)
                    .tag(tagRepository.findById(interestTags[i]).orElseThrow(TagNotFoundException::new))
                    .build();
            userTagRepository.save(usertag);
        }
    }

    @Override
    public void updateProfile(String profile) {
        User user = getUser();
        user.updateProfile(profile);
    }

    @Override
    public void updateUserInfo(UpdateUserRequestDto requestDto){
        User user = getUser();
        String MyNickname = requestDto.getNickname();
        if (userRepository.findByNickname(MyNickname).isPresent()){
            throw new DuplicateNicknameException();

        }
        user.updateUserInfo(requestDto);

    }
}
