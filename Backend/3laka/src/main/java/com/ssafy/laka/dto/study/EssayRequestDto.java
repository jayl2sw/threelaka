package com.ssafy.laka.dto.study;

import com.ssafy.laka.dto.user.UserResponseDto;
import io.swagger.annotations.ApiModel;
import lombok.Data;

@Data
@ApiModel(value = "EssayRequestDto", description = "에세이 저장 요청 Dto")
public class EssayRequestDto {

    private WordbookResponseDto wordbook;
    private UserResponseDto user;
    private String content;

}
