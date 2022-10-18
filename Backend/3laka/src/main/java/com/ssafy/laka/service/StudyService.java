package com.ssafy.laka.service;

import com.ssafy.laka.dto.study.*;

import java.util.List;

public interface StudyService {

    VideoResponseDto getVideo();

    VideoResponseDto getRecentVideo();

    void addWish(int video_id);
    void deleteWish(int like_video_id);
    List<VideoResponseDto> getVideosByKeyword(String keyword);

    void addWord(WordRequestDto data);
    void deleteWord(int wordbook_id);
    WordResponseDto getWord(String word);

    List<WordbookResponseDto> getWordbookByVideo(int video_id);

    void addCustomWord(CustomWordRequestDto data);
    void addEssay(EssayRequestDto essay);

    void updateCompletedStage(UpdateStageRequestDto data);

    void addLearningTime(UpdateLearningRequestDto data);

    void memorizeWord(int wordbook_id);
}
