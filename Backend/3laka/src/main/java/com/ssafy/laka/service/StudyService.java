package com.ssafy.laka.service;

import com.ssafy.laka.dto.study.LearningRecordResponseDto;
import com.ssafy.laka.dto.study.*;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface StudyService {

    VideoResponseDto getVideo(String url);

    VideoResponseDto getRecentVideo();

    void addWish(String video_id);
    void deleteWish(int like_video_id);
    List<VideoResponseDto> getVideosByKeyword(String keyword, Pageable pageable);

    void addWord(WordRequestDto data);
    void deleteWord(int wordbook_id);

    List<WordbookResponseDto> getWordbookByVideo(String video_id);

    void addEssay(EssayRequestDto essay);

    void updateCompletedStage(UpdateStageRequestDto data);

    void addLearningTime(UpdateLearningRequestDto data);

    void memorizeWord(int wordbook_id);

    void checkContinuousLearningDate(String token);

    LearningRecordResponseDto startLearning(String videoId);

    LearningRecordResponseDto getLearningRecordByVideo(String videoId);

    String getScript(String videoId);
}
