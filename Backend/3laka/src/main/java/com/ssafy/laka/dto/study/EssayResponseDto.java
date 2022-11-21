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
@ApiModel(value = "EssayResponseDto", description = "에세이 정보 응답 Dto")
public class EssayResponseDto {
    private String essay;

    public static EssayResponseDto from(LearningRecord entity) {
        return EssayResponseDto.builder()
                .essay(entity.getEssay())
                .build();
    }
}
