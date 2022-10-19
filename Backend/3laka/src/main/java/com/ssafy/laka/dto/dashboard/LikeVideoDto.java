package com.ssafy.laka.dto.dashboard;

import com.ssafy.laka.domain.Video;
import com.ssafy.laka.domain.enums.Stage;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "LikeVideoDto", description = "나중에 볼 영상 Dto")
public class LikeVideoDto {

    private int videoId;
    private String title;
    private String url;

    public static LikeVideoDto of(Video video) {
        return LikeVideoDto.builder()
                .videoId(video.getVideoId())
                .title(video.getTitle())
                .url(video.getUrl())
                .build();
    }

}
