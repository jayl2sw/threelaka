package com.ssafy.laka.dto.guild;

import com.ssafy.laka.domain.Guild;
import com.ssafy.laka.dto.user.UserListResponseDto;
import com.ssafy.laka.dto.user.UserResponseDto;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "GuildResponseDto", description = "길드 정보 찾기")
public class GuildResponseDto {
    private int guildId;
    private int masterId;
    private String guildName;
    private List<UserListResponseDto> members;

//    guild를 넣어서 GuildResponseDto를 만들어 내는 함수
    public static GuildResponseDto from(Guild entity){
        return GuildResponseDto.builder()
                .guildId(entity.getId())
                .masterId(entity.getMaster())
                .guildName(entity.getGuildName())
                .members(entity.getMembers().stream().map(u -> UserListResponseDto.from(u)).collect(Collectors.toList()))
                .build();

    }
}
