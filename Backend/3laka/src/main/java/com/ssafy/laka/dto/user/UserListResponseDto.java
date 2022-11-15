package com.ssafy.laka.dto.user;

import com.ssafy.laka.domain.User;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "UserListResponseDto", description = "유저 리스트 응답 Dto")

public class UserListResponseDto {
    private int userId;
    private String nickname;

    public static UserListResponseDto from(User entity){
        return UserListResponseDto.builder()
                .userId(entity.getUserId())
                .nickname(entity.getNickname())
                .build();

    }
}
