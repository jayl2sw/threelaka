package com.ssafy.laka.service;

import com.ssafy.laka.domain.Video;

public interface YoutubeService {
    Video get(String videoId);
}
