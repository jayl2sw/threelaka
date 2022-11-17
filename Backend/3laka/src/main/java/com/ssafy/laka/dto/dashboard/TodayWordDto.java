package com.ssafy.laka.dto.dashboard;

import com.ssafy.laka.domain.Wordbook;
import io.swagger.annotations.ApiModel;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "TodayWordDto", description = "오늘의 단어 Dto")
public class TodayWordDto {
    private String word;
    private String definition;
    public static TodayWordDto of(Wordbook wordbook) {
        if (wordbook.getWord() == null) {
            return TodayWordDto.builder().word(wordbook.getWord()).build();
        }
        return TodayWordDto.builder().word(wordbook.getWord()).build();
    }
}
