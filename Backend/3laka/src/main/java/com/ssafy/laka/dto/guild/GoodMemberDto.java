package com.ssafy.laka.dto.guild;

import com.ssafy.laka.domain.Guild;
import com.ssafy.laka.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GoodMemberDto {
    private int userId;
    private String userNickname;
    private int time;

    public static GoodMemberDto from(User entity, int time) {
        return GoodMemberDto.builder()
                .userId(entity.getUserId())
                .userNickname(entity.getNickname())
                .time(time)
                .build();
    }
}
