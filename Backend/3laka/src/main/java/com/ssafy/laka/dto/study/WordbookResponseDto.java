package com.ssafy.laka.dto.study;

import com.ssafy.laka.domain.Wordbook;
import com.ssafy.laka.dto.user.UserResponseDto;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "WordbookResponseDto", description = "단어장 정보 응답 Dto")
public class WordbookResponseDto {
    private int wordbookId;
    private UserResponseDto user;
    private LearningRecordResponseDto lr;
    private String word;

    public static WordbookResponseDto from(Wordbook entity){
        return WordbookResponseDto.builder()
                .wordbookId(entity.getWordbookId())
                .user(UserResponseDto.from(entity.getUser()))
                .lr(LearningRecordResponseDto.from(entity.getLearningRecord()))
                .word(entity.getWord())
                .build();
    }
}
