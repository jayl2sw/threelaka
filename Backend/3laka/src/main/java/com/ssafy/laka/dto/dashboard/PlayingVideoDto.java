package com.ssafy.laka.dto.dashboard;

import com.ssafy.laka.domain.Video;
import com.ssafy.laka.domain.Wordbook;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "PlayingVideoDto", description = "현재 공부 중인 영상 Dto")
public class PlayingVideoDto {
    private int videoId;
    private String title;
    private String url;
    public static PlayingVideoDto of(Video video) {
        return PlayingVideoDto.builder().videoId(video.getVideoId()).title(video.getTitle()).url(video.getUrl()).build();
    }
}
