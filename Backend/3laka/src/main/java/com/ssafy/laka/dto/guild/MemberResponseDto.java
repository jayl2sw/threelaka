package com.ssafy.laka.dto.guild;

import com.ssafy.laka.domain.Guild;
import com.ssafy.laka.dto.user.UserListResponseDto;
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
@ApiModel(value = "MemberResponseDto", description = "길드 정보 찾기")
public class MemberResponseDto {
    private int guildId;
    private String guildName;
    private List<UserListResponseDto> members;

    public static MemberResponseDto from(Guild entity){
        return MemberResponseDto.builder()
                .guildId(entity.getId())
                .guildName(entity.getGuildName())
                .members(entity.getMembers().stream().map(u -> UserListResponseDto.from(u)).collect(Collectors.toList()))
                .build();
    }
}
