package com.ssafy.laka.dto.study;

import com.ssafy.laka.domain.enums.Stage;
import io.swagger.annotations.ApiModel;
import lombok.Data;

@Data
@ApiModel(value = "UpdateStageRequestDto", description = "스테이지 업데이트 요청 Dto")
public class UpdateStageRequestDto {

    private int learningRecordId;
    private Stage stage;

}
