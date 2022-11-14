package com.ssafy.laka.service;

import com.ssafy.laka.domain.*;
import com.ssafy.laka.domain.enums.Stage;
import com.ssafy.laka.dto.exception.dashboard.LearningRecordNotFoundException;
import com.ssafy.laka.dto.exception.study.*;
import com.ssafy.laka.dto.exception.user.UserNotFoundException;
import com.ssafy.laka.dto.study.*;
import com.ssafy.laka.repository.*;
import com.ssafy.laka.util.SecurityUtil;
import lombok.RequiredArgsConstructor;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class StudyServiceImpl implements StudyService{

    private final UserRepository userRepository;
    private final VideoRepository videoRepository;
    private final LikeVideoRepository likeVideoRepository;
    private final StudyRepository studyRepository;
    private final LearningRecordRepository learningRecordRepository;
    private final EssayRepository essayRepository;
    private final WordbookRepository wordbookRepository;
    private final YoutubeService youtubeService;
    private final ScriptRepository scriptRepository;

    private TooShortToSearchException tooShortToSearchException = new TooShortToSearchException();
    private WordAlreadyExistException wordAlreadyExistException = new WordAlreadyExistException();

    @Value("${naver.id}")
    private String clientId;//애플리케이션 클라이언트 아이디값";
    @Value("${naver.secret}")
    private String clientSecret;
    @Override
    public VideoResponseDto getVideo(String url) {
        String videoId = parseVideoId(url);
        log.debug("send GET Request with videoId: " + videoId);
        Optional<Video> video = videoRepository.findById(videoId);
        if (video.isPresent()) {
            return VideoResponseDto.from(video.get());
        } else {
            return sendGETRequest(videoId);
        }
    }

    private VideoResponseDto sendGETRequest(String videoId) {
        return VideoResponseDto.from(youtubeService.get(videoId));
    }

    private String parseVideoId(String url) throws VideoNotFoundException {
        if ( url.contains("watch")){
            String url2 = url.replace("https://www.youtube.com/watch?v=","");
            String[] splits = url2.split("&");
            return new ArrayList<String>(Arrays.asList(splits)).get(0);
        } else if (url.contains(".be/")) {
            String[] parts = url.split("be/");
            return parts[1];
        } else {
            throw new VideoNotFoundException();
        }
    }

    @Override
    public RecentLearningRecordResponseDto getRecentVideo() {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        List<LearningRecord> learningRecords = learningRecordRepository.findLearningRecordsByUserOrderByModifiedDateDesc(user);
        if (learningRecords.size() > 1) {
            return RecentLearningRecordResponseDto.from(learningRecords.get(0));
        } else {
            return null;
        }
    }

    @Override
    public void addWish(String video_id) {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        Video video = videoRepository.findById(video_id).orElseThrow(VideoNotFoundException::new);
        try {
            LikeVideo lv = LikeVideo.builder().user(user).video(video).build();
            likeVideoRepository.save(lv);
        } catch (Exception e) {
            log.debug("failed to add wishlist:" + e);
            throw e;
        }

    }

    @Override
    public void deleteWish(int like_video_id) {
        LikeVideo lv = likeVideoRepository.findById(like_video_id).orElseThrow(NotLikedVideoException::new);
        likeVideoRepository.delete(lv);
    }

    @Override
    public List<VideoResponseDto> getVideosByKeyword(String keyword) {
        if (keyword.length() <= 2) {
            throw tooShortToSearchException;
        }
        return videoRepository.findByTitleContaining(keyword).stream().map(
                v -> VideoResponseDto.from(v)).collect(Collectors.toList());
    }

    @Override
    public void addWord(WordRequestDto data) {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        LearningRecord lr = learningRecordRepository.findById(data.getLrId()).orElseThrow(LearningRecordNotFoundException::new);
        Optional<Wordbook> wb = wordbookRepository.findByLearningRecordAndWord(lr, data.getWord());

        if (wb.isPresent()) {
            throw wordAlreadyExistException;
        } else {
            Wordbook wordbook = Wordbook.builder()
                    .user(user)
                    .learningRecord(lr)
                    .word(data.getWord())
                    .example(data.getExample())
                    .build();

            wordbookRepository.save(wordbook);
        }
    }


    @Override
    public void deleteWord(int wordbook_id) {
        try {
            Wordbook wordbook = wordbookRepository.findById(wordbook_id).orElseThrow(NotInWordbookException::new);
            wordbookRepository.delete(wordbook);
        } catch (Exception e) {
            log.debug("failed to delete workbook: " + e);
            throw e;
        }
    }


    @Override
    public List<WordbookResponseDto> getWordbooksById(int lrId) {
        LearningRecord lr = learningRecordRepository.findById(lrId).orElseThrow(LearningRecordNotFoundException::new);
        return wordbookRepository.findWordbooksByLearningRecord(lr).stream()
                .map(w -> WordbookResponseDto.from(w)).collect(Collectors.toList());

    }

    @Override
    public List<WordbookResponseDto> getWordbooksByUser() {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        translate("word");
        return wordbookRepository.findWordbooksByUser(user).stream()
                .map(w -> WordbookResponseDto.from(w)).collect(Collectors.toList());

    }


    @Override
    public LearningRecordResponseDto updateCompletedStage(UpdateStageRequestDto data) {
        LearningRecord lr = learningRecordRepository.findById(data.getLearningRecordId()).orElseThrow(LearningRecordNotExistException::new);
        if (SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new).equals(lr.getUser())) {
            lr.setStage(data.getStage());
            return LearningRecordResponseDto.from(lr);
        } else {
            throw new NotCurrentUserException();
        }
    }

    @Override
    public void addLearningTime(UpdateLearningRequestDto data) {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        String today = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(LocalDate.now()).toString();
        Optional<Study> learning = studyRepository.findByUserAndDate(user, today);
        if (learning.isPresent()) {
            learning.get().addTime(data.getTime());
        } else {
            Study study = new Study(user, data.getTime());
            studyRepository.save(study);
            user.addContinuousLearningDate();
        }
    }

    @Override
    public void memorizeWord(int wordbook_id) {
        Wordbook wordbook = wordbookRepository.findById(wordbook_id).orElseThrow(NotInWordbookException::new);
        wordbook.setMemorized();
    }

    @Override
    public void checkContinuousLearningDate(String token) {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        String today = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(LocalDate.now()).toString();
        String yesterday = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(LocalDate.now().minusDays(1)).toString();
        if (!studyRepository.findByUserAndDate(user, yesterday).isPresent() && !studyRepository.findByUserAndDate(user, today).isPresent()) {
            user.resetContinuousLearningDate();
        }
    }

    @Override
    public LearningRecordResponseDto startLearning(String videoId) {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        Video video = videoRepository.findById(videoId).orElseThrow(VideoNotFoundException::new);
        LearningRecord lr = LearningRecord.builder()
                .user(user)
                .video(video)
                .stage(Stage.READING)
                .build();
        learningRecordRepository.save(lr);
        return LearningRecordResponseDto.from(lr);

    }

    @Override
    public LearningRecordResponseDto getLearningRecordByVideo(String videoId) {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        Video video = videoRepository.findById(videoId).orElseThrow(VideoNotFoundException::new);
        List<LearningRecord> lrs = learningRecordRepository.findByUserAndVideoOrderByModifiedDateDesc(user, video);
        if (lrs.isEmpty()) {
            return null;
        } else {
            return LearningRecordResponseDto.from(lrs.get(0));
        }
    }

    @Override
    public LearningRecordResponseDto findLearningRecordById(int lrId) {
        return LearningRecordResponseDto.from(learningRecordRepository.findById(lrId).orElseThrow(LearningRecordNotFoundException::new));
    }

    @Override
    public String getScript(String videoId) {
        return scriptRepository.findScriptByVideoId(videoId).orElseThrow(ScriptNotFoundException::new).getScripts();
    }

    @Override
    public List<VideoResponseDto> getRecommends() {
        return videoRepository.findFourVideos().stream().map(v -> VideoResponseDto.from(v)).collect(Collectors.toList());
    }

    @Override
    public void addEssay(EssayRequestDto essay) {
        LearningRecord lr = learningRecordRepository.findById(essay.getLearningRecordId()).orElseThrow(LearningRecordNotFoundException::new);
        lr.setEssay(essay.getContent());
    }

    @Override
    public EssayResponseDto findEssay(int learningRecordId) {
        LearningRecord lr = learningRecordRepository.findById(learningRecordId).orElseThrow(LearningRecordNotFoundException::new);
        return EssayResponseDto.from(lr);

    }

    @Override
    public void setSurvey(SurveyRequestDto data) {
        LearningRecord lr = learningRecordRepository.findById(data.getLearningRecordId()).orElseThrow(LearningRecordNotFoundException::new);
        lr.setSurvey(data.getSurvey());
    }

}
