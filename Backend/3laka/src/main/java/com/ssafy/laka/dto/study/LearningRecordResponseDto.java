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
@ApiModel(value = "LearningRecordResponseDto", description = "학습 기록 응답 Dto")
public class LearningRecordResponseDto {
    private int learningRecordId;
    private int userId;
    private String stage;

    public static LearningRecordResponseDto from(LearningRecord entity) {
        return LearningRecordResponseDto.builder()
                .learningRecordId(entity.getLearningRecordId())
                .userId(entity.getUser().getUserId())
                .stage(entity.getStage().toString())
                .build();
    }
}
