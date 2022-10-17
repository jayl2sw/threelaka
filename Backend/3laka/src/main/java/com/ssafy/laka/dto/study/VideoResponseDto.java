package com.ssafy.laka.dto.study;

import com.ssafy.laka.domain.User;
import com.ssafy.laka.domain.Video;
import com.ssafy.laka.dto.user.UserResponseDto;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "VideoResponseDto", description = "영상 정보 응답 Dto")
public class VideoResponseDto {

    private int videoId;
    private String title;
    private String description;
    private String script;
    private String url;
    private int views;

    public static VideoResponseDto from(Video entity){

        return VideoResponseDto.builder()
                .videoId(entity.getVideoId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .script(entity.getScript())
                .url(entity.getUrl())
                .views(0)
                .build();
    }
}
