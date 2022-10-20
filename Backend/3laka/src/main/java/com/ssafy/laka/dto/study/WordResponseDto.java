package com.ssafy.laka.dto.study;

import com.ssafy.laka.domain.Dictionary;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "WordResponseDto", description = "단어 정보 응답 Dto")
public class WordResponseDto {

    private int wordId;
    private String word;
    private String content;

    public static WordResponseDto from(Dictionary entity) {
        return WordResponseDto.builder()
                .wordId(entity.getWordId())
                .word(entity.getWord())
                .content(entity.getContent())
                .build();
    }
}
