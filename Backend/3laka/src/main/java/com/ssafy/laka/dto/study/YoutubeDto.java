package com.ssafy.laka.dto.study;

import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "YoutubeDto", description = "유튜브 응답 Dto")
public class YoutubeDto {

    private String title; // 동영상 제목
    private String thumbnailPath; //동영상 썸네일 경로
    private String videoId; // 동영상 식별 ID

}