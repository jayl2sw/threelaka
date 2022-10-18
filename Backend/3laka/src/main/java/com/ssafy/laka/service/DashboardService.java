package com.ssafy.laka.service;

import com.ssafy.laka.dto.dashboard.HistoryNumDto;
import com.ssafy.laka.dto.dashboard.PlayingVideoDto;
import com.ssafy.laka.dto.dashboard.TodayWordDto;

import java.util.List;

public interface DashboardService {

    List<TodayWordDto> getRandomWords();
    PlayingVideoDto getPlayingList();
    HistoryNumDto getHistory();

}
