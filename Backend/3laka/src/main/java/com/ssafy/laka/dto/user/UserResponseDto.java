package com.ssafy.laka.dto.user;

import com.ssafy.laka.domain.User;
import com.ssafy.laka.domain.enums.Gender;
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
    private String nickname;
    private String email;
    private Role role;
    private int age;
    private Gender gender;
    private int grade;
    private int continuousLearningDate;
    private String createDate;
    private Integer guildId;
    private String profile;


    public static UserResponseDto from(User entity){
        String createDate = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(entity.getCreatedDate()).toString();

        return UserResponseDto.builder()
                .userId(entity.getUserId())
                .username(entity.getUsername())
                .nickname(entity.getNickname())
                .role(entity.getRole())
                .age(entity.getAge())
                .gender(entity.getGender())
                .grade(entity.getGrade())
                .continuousLearningDate(entity.getContiuousLearningDate())
                .createDate(createDate)
                .guildId(entity.getGuild() == null ? null : entity.getGuild().getId())
                .profile(entity.getProfile())
                .build();
    }
}