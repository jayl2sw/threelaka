package com.ssafy.laka.service;

import com.ssafy.laka.domain.Video;
import com.ssafy.laka.dto.study.LearningRecordResponseDto;
import com.ssafy.laka.dto.study.*;
import org.json.JSONException;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface StudyService {

    VideoResponseDto getVideo(String url);

    RecentLearningRecordResponseDto getRecentVideo();

    void addWish(String video_id);
    void deleteWish(int like_video_id);
    List<VideoResponseDto> getVideosByKeyword(String keyword);

    void addWord(WordRequestDto data) throws JSONException;
    void deleteWord(int wordbook_id);

    List<WordbookResponseDto> getWordbooksById(int lrId);
    List<WordbookResponseDto> getWordbooksByUser();

    void addLearningTime(UpdateLearningRequestDto data);

    void memorizeWord(int wordbook_id);

    void checkContinuousLearningDate(String token);

    LearningRecordResponseDto updateCompletedStage(UpdateStageRequestDto data);

    LearningRecordResponseDto startLearning(String videoId);

    LearningRecordResponseDto getLearningRecordByVideo(String videoId);

    LearningRecordResponseDto findLearningRecordById(int lrId);

    String getScript(String videoId);

    List<VideoResponseDto> getRecommends();

    void addEssay(EssayRequestDto essay);

    EssayResponseDto findEssay(int learningRecordId);

    void setSurvey(SurveyRequestDto data);

    VideoDescriptionResponseDto findVideoDescription(String videoId);
}
