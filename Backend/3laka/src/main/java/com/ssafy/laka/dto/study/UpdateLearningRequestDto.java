package com.ssafy.laka.dto.study;

import io.swagger.annotations.ApiModel;
import lombok.Data;

@Data
@ApiModel(value = "UpdateLearningRequestDto", description = "학습량 저장 요청 Dto")
public class UpdateLearningRequestDto {
    private int time;

}
