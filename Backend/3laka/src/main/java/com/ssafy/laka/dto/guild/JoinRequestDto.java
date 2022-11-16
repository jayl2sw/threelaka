package com.ssafy.laka.dto.guild;

import com.ssafy.laka.domain.JoinRequest;
import com.ssafy.laka.domain.enums.State;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "JoinRequestDto", description = "길드 가입 요청 정보 반환" )

public class JoinRequestDto {
    private int requstId;
    private int guildId;
    private int userId;
    private String nickName;
    private State state;

    public static JoinRequestDto from(JoinRequest entity){
        return JoinRequestDto.builder()
                .requstId(entity.getRequestId())
                .guildId(entity.getGuild().getId())
                .userId(entity.getSender().getUserId())
                .nickName(entity.getSender().getNickname())
                .state(entity.getState())
                .build();
    }
}
