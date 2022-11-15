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
@ApiModel(value = "RecentLearningRecordResponseDto", description = "최근 Learning record 정보 응답 Dto")
public class VideoDescriptionResponseDto {
    private String videoId;
    private String description;

    public static VideoDescriptionResponseDto from(Video entity){
        return VideoDescriptionResponseDto.builder()
                .videoId(entity.getVideoId())
                .description(entity.getDescription())
                .build();
    }
}
