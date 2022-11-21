package com.ssafy.laka.dto.study;

import io.swagger.annotations.ApiModel;
import lombok.Data;

@Data
@ApiModel(value = "WordRequestDto", description = "단어장에 단어 추가 요청 Dto")
public class WordRequestDto {
    private int lrId;
    private String word;
    private String definition;
    private String example;

}
