package com.ssafy.laka.service;

import com.ssafy.laka.domain.*;
import com.ssafy.laka.domain.enums.Stage;
import com.ssafy.laka.dto.exception.study.*;
import com.ssafy.laka.dto.exception.user.UserNotFoundException;
import com.ssafy.laka.dto.study.*;
import com.ssafy.laka.repository.*;
import com.ssafy.laka.util.SecurityUtil;
import lombok.RequiredArgsConstructor;

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
public class StudyServiceImpl implements StudyService{

    private final UserRepository userRepository;
    private final VideoRepository videoRepository;
    private final LikeVideoRepository likeVideoRepository;
    private final DictionaryRepository dictionaryRepository;
    private final StudyRepository studyRepository;
    private final LearningRecordRepository learningRecordRepository;
    private final EssayRepository essayRepository;
    private final WordbookRepository wordbookRepository;

    private final YoutubeService youtubeService;

    @Override
    public VideoResponseDto getVideo(String url) {
        String videoId = parseVideoId(url);
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
        LikeVideo.builder().user(user).video(video);
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
        // 딕셔너리에 해당 word가 있는지 확인
        Dictionary dict = dictionaryRepository.findByWord(data.getWord()).orElseThrow(NotInDictionaryException::new);
        Video video = videoRepository.findById(data.getVideoId()).orElseThrow(VideoNotFoundException::new);
        // 인덱싱 쓰고 싶은데 어케함?
        Wordbook wordbook = Wordbook.builder()
                .user(user)
                .video(video)
                .dictionary(dict)
                .example(data.getExample())
                .build();

        wordbookRepository.save(wordbook);
    }

    @Override
    public void addCustomWord(CustomWordRequestDto data) {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        Video video = videoRepository.findById(data.getVideoId()).orElseThrow(VideoNotFoundException::new);
        Wordbook wordbook = Wordbook.builder().user(user).video(video)
                .customWord(data.getWord())
                .definition(data.getDefinition())
                .example(data.getExample())
                .build();
        wordbookRepository.save(wordbook);
    }

    @Override
    public void deleteWord(int wordbook_id) {
        Wordbook wordbook = wordbookRepository.findById(wordbook_id).orElseThrow(NotInWordbookException::new);
        wordbookRepository.delete(wordbook);
    }

    @Override
    public WordResponseDto getWord(String word) {
        // DB 확인
        Optional<Dictionary> dict = dictionaryRepository.findByWord(word);
        // 만약 DB에 데이터가 존재하면 그대로 반환
        if (dict.isPresent()) {
            return WordResponseDto.from(dict.get());
        } else {
            // 만약 DB에 데이터가 존재하지 않으면 API 요청을 통해서 DB를 채운 후에 저장

        }
        return null;
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

        Essay essay = Essay.builder().user(user).wordbook(wordbook).content(data.getContent()).build();
        essayRepository.save(essay);
    }

    @Override
    public void updateCompletedStage(UpdateStageRequestDto data) {
        LearningRecord lr = learningRecordRepository.findById(data.getLearningRecordId()).orElseThrow(LearningRecordNotExistException::new);
        if (data.getStage() == 0) {
            lr.setStage(Stage.LISTENING);
        } else if (data.getStage() == 1) {
            lr.setStage(Stage.WRITING);
        } else if (data.getStage() == 2) {
            lr.setStage(Stage.COMPLETE);
        } else {
            lr.setStage(Stage.COMPLETE);
        }
    }

    @Override
    public void addLearningTime(UpdateStageRequestDto data) {
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
}
