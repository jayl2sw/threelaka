package com.ssafy.laka.service;

import com.ssafy.laka.dto.dashboard.*;

import java.util.List;

public interface DashboardService {

    List<TodayWordDto> getRandomWords();
    PlayingVideoDto getPlayingList();
    HistoryNumDto getHistory();
    CalendarDto getCalendar();
    List<VideoDto> getLikeVideos();
    List<VideoDto> getDoneVideos();
    void updateInterestTags(InterestTagReqeustDto interestTagReqeustDto);

}
