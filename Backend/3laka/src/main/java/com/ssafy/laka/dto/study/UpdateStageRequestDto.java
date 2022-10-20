package com.ssafy.laka.dto.study;

import io.swagger.annotations.ApiModel;
import lombok.Data;

@Data
@ApiModel(value = "UpdateStageRequestDto", description = "스테이지 업데이트 요청 Dto")
public class UpdateStageRequestDto {

    private int learningRecordId;
    private int stage;
    private int time;

}
