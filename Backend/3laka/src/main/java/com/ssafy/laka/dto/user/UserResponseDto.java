package com.ssafy.laka.dto.user;

import com.ssafy.laka.domain.User;
import com.ssafy.laka.domain.enums.Role;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "UserResponseDto", description = "유저 정보 응답 Dto")
public class UserResponseDto {

    private int userId;
    private String username;
    private String password;
    private String nickname;
    private String email;
    private Role role;
    private String token;
    private String createDate;

    public static UserResponseDto from(User entity){
//        System.out.println(entity.getCreatedDate());
        String createDate = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(entity.getCreatedDate()).toString();

        return UserResponseDto.builder()
                .userId(entity.getUserId())
                .username(entity.getUsername())
                .email(entity.getEmail())
                .nickname(entity.getNickname())
                .role(entity.getRole())
                .createDate(createDate)
                .build();
    }
}