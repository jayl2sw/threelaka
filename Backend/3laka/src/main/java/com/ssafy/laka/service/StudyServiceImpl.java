package com.ssafy.laka.service;

import com.ssafy.laka.dto.study.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional
public class StudyServiceImpl implements StudyService{

    @Override
    public VideoResponseDto getVideo() {
        return null;
    }

    @Override
    public VideoResponseDto getRecentVideo() {
        return null;
    }

    @Override
    public void addWish(int video_id) {

    }

    @Override
    public List<VideoResponseDto> getVideosByKeyword(String keyword) {
        return null;
    }

    @Override
    public void addWord(String word) {

    }

    @Override
    public WordResponseDto getWord(String word) {
        return null;
    }

    @Override
    public List<WordbookResponseDto> getWordbookByVideo(String video_id) {
        return null;
    }

    @Override
    public void addCustomWord(CustomWordRequestDto data) {

    }

    @Override
    public void addEssay(EssayRequestDto essay) {

    }

    @Override
    public void updateCompletedStage(UpdateStageRequestDto data) {

    }
}
