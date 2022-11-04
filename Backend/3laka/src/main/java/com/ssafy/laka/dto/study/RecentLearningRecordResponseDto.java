package com.ssafy.laka.dto.study;

import com.ssafy.laka.domain.LearningRecord;
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
public class RecentLearningRecordResponseDto {
    private int learningRecordId;
    private VideoResponseDto video;
    private String stage;

    public static RecentLearningRecordResponseDto from(LearningRecord entity){
        return RecentLearningRecordResponseDto.builder()
                .learningRecordId(entity.getLearningRecordId())
                .video(VideoResponseDto.from(entity.getVideo()))
                .stage(entity.getStage().toString())
                .build();
    }
}
