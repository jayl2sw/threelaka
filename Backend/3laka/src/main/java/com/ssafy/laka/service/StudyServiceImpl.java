package com.ssafy.laka.service;

import com.ssafy.laka.domain.*;
import com.ssafy.laka.domain.enums.Stage;
import com.ssafy.laka.dto.exception.study.*;
import com.ssafy.laka.dto.exception.user.UserNotFoundException;
import com.ssafy.laka.dto.study.*;
import com.ssafy.laka.repository.*;
import com.ssafy.laka.util.SecurityUtil;
import lombok.RequiredArgsConstructor;


import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
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

    @Override
    public VideoResponseDto getVideo(String url) {
        String videoId = parseVideoId(url);
        log.debug("send GET Request with videoId: " + videoId);
        return sendGETRequest(videoId);
    }

    private VideoResponseDto sendGETRequest(String videoId) {
        return VideoResponseDto.from(youtubeService.get(videoId));
    }

    private String parseVideoId(String url) throws VideoNotFoundException {
        if ( url.contains("watch")){
            return url.replace("https://www.youtube.com/watch?v=","");
        } else if (url.contains(".be/")) {
            String[] parts = url.split("be/");
            return parts[1];
        } else {
            throw new VideoNotFoundException();
        }
    }

    @Override
    public VideoResponseDto getRecentVideo() {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        List<LearningRecord> learningRecords = learningRecordRepository.findLearningRecordsByUserOrderByModifiedDateDesc(user);
        if (learningRecords.size() > 1) {
            return VideoResponseDto.from(learningRecords.get(0).getVideo());
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
    public List<VideoResponseDto> getVideosByKeyword(String keyword, Pageable pageable) {
        return videoRepository.findByKeyword(keyword, pageable).stream().map(
                v -> VideoResponseDto.from(v)).collect(Collectors.toList());
    }

    @Override
    public void addWord(WordRequestDto data) {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        Video video = videoRepository.findById(data.getVideoId()).orElseThrow(VideoNotFoundException::new);

        Wordbook wordbook = Wordbook.builder()
                .user(user)
                .video(video)
                .word(data.getWord())
                .example(data.getExample())
                .build();

        wordbookRepository.save(wordbook);
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
    public List<WordbookResponseDto> getWordbookByVideo(String video_id) {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        Video video = videoRepository.findById(video_id).orElseThrow(VideoNotFoundException::new);

        return wordbookRepository.findByUserAndVideo(user, video).stream()
                .map(w -> WordbookResponseDto.from(w)).collect(Collectors.toList());

    }

    @Override
    public void addEssay(EssayRequestDto data) {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        Wordbook wordbook = wordbookRepository.findById(data.getWordbookId()).orElseThrow(NotInWordbookException::new);
        try {
            Essay essay = Essay.builder().user(user).wordbook(wordbook).content(data.getContent()).build();
            essayRepository.save(essay);
        } catch (Exception e) {
            log.debug("failed to save essay: " + e);
            throw e;
        }
    }

    @Override
    public void updateCompletedStage(UpdateStageRequestDto data) {
        LearningRecord lr = learningRecordRepository.findById(data.getLearningRecordId()).orElseThrow(LearningRecordNotExistException::new);
        if (data.getStage() == 0) {
            lr.setStage(Stage.READING);
        } else if (data.getStage() == 1) {
            lr.setStage(Stage.WRITING);
        } else if (data.getStage() == 2) {
            lr.setStage(Stage.SPEAKING);
        } else {
            lr.setStage(Stage.COMPLETE);
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
            Study study = Study.builder().user(user).time(data.getTime()).build();
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
    public String getScript(String videoId) {
        return scriptRepository.findScriptByVideoId(videoId).orElseThrow(ScriptNotFoundException::new).getScripts();
    }

    @Override
    public List<VideoResponseDto> getRecommends() {
        return videoRepository.findFourVideos();
    }
}
