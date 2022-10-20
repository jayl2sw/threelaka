package com.ssafy.laka.service;

import com.ssafy.laka.dto.study.*;
import org.springframework.data.domain.Page;
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
    WordResponseDto getWord(String word);

    List<WordbookResponseDto> getWordbookByVideo(String video_id);

    void addCustomWord(CustomWordRequestDto data);
    void addEssay(EssayRequestDto essay);

    void updateCompletedStage(UpdateStageRequestDto data);

    void addLearningTime(UpdateStageRequestDto data);

    void memorizeWord(int wordbook_id);

    void checkContinuousLearningDate(String token);
}
