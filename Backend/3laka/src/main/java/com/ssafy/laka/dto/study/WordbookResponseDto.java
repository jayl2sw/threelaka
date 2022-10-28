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
    private VideoResponseDto video;
    private String word;

    public static WordbookResponseDto from(Wordbook entity){
        return WordbookResponseDto.builder()
                .wordbookId(entity.getWordbookId())
                .user(UserResponseDto.from(entity.getUser()))
                .video(VideoResponseDto.from(entity.getVideo()))
                .word(entity.getWord())
                .build();
    }
}
