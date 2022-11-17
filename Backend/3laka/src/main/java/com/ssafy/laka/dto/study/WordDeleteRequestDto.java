package com.ssafy.laka.dto.study;

import io.swagger.annotations.ApiModel;
import lombok.Data;

@Data
@ApiModel(value = "WordDeleteRequestDto", description = "단어와 예문으로 단어 삭제요청 Dto")
public class WordDeleteRequestDto {
    private String word;
    private String example;
}
