package com.ssafy.laka.dto.study;

import io.swagger.annotations.ApiModel;
import lombok.Data;

@Data
@ApiModel(value = "CustomWordRequestDto", description = "커스텀 단어 생성 요청 Dto")
public class CustomWordRequestDto {

    private String videoId;
    private String word;
    private String definition;
    private String example;

}
