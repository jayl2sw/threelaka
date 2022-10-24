package com.ssafy.laka.dto.study;

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
@ApiModel(value = "VideoResponseDto", description = "영상 정보 응답 Dto")
public class VideoResponseDto {

    private String videoId;
    private String title;
    private String description;
    private String script;


    public static VideoResponseDto from(Video entity){

        return VideoResponseDto.builder()
                .videoId(entity.getVideoId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .script(entity.getScript())
                .build();
    }
}
