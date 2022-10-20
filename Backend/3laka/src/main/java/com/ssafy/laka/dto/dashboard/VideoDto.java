package com.ssafy.laka.dto.dashboard;

import com.ssafy.laka.domain.Video;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "VideoDto", description = "영상 Dto")
public class VideoDto {

    private String videoId;
    private String title;

    public static VideoDto of(Video video) {
        return VideoDto.builder()
                .videoId(video.getVideoId())
                .title(video.getTitle())
                .build();
    }

}
