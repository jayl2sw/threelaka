package com.ssafy.laka.service;

import com.ssafy.laka.dto.study.*;

import java.util.List;

public interface StudyService {

    VideoResponseDto getVideo();

    VideoResponseDto getRecentVideo();

    void addWish(int video_id);

    List<VideoResponseDto> getVideosByKeyword(String keyword);

    void addWord(String word);

    WordResponseDto getWord(String word);

    List<WordbookResponseDto> getWordbookByVideo(String video_id);

    void addCustomWord(CustomWordRequestDto data);

    void addEssay(EssayRequestDto essay);

    void updateCompletedStage(UpdateStageRequestDto data);
}
