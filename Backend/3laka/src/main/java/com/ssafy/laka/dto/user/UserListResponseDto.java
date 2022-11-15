package com.ssafy.laka.dto.user;

import com.ssafy.laka.domain.User;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.joda.time.Days;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "UserListResponseDto", description = "유저 리스트 응답 Dto")

public class UserListResponseDto {
    private int userId;
    private String nickname;
    // n일 전 형식
    private int lastLearningDay;

    public static UserListResponseDto from(User entity){
        LocalDateTime today = LocalDateTime.now();
        int diff = (int) ChronoUnit.DAYS.between(entity.getModifiedDate(), today);
        return UserListResponseDto.builder()
                .userId(entity.getUserId())
                .nickname(entity.getNickname())
                .lastLearningDay(diff)
                .build();

    }
}
