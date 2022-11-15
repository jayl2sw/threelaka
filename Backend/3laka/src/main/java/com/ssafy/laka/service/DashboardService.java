package com.ssafy.laka.service;

import com.ssafy.laka.dto.dashboard.*;
import com.ssafy.laka.dto.user.UpdateUserRequestDto;

import java.util.List;

public interface DashboardService {

    List<TodayWordDto> getRandomWords();
    List<PlayingVideoDto> getPlayingList();
    HistoryNumDto getHistory();
    CalendarDto getCalendar();
    List<VideoDto> getLikeVideos();
    List<VideoDto> getDoneVideos();
    int[] getData();
    List<String> getInterestTags();
    void updateInterestTags(int[] interestTags);
    void updateProfile(String profile);

    void updateUserInfo(UpdateUserRequestDto requestDto);

}
