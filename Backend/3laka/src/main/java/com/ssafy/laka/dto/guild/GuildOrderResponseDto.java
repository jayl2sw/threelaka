package com.ssafy.laka.dto.guild;

import com.ssafy.laka.domain.Assignment;
import com.ssafy.laka.domain.Guild;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "GuildResponseDto", description = "길드 정렬 정보 조회")
public class GuildOrderResponseDto {
    private int guildId;
    private int masterId;
    private String masterNickname;
    private String guildName;
    private String description;
    private int memberSize;

    public static GuildOrderResponseDto from(Guild entity, String masterNickname){
        return GuildOrderResponseDto.builder()
                .guildId(entity.getId())
                .masterId(entity.getMaster())
                .masterNickname(masterNickname)
                .guildName(entity.getGuildName())
                .description(entity.getDescription())
                .memberSize(entity.getMembers().size())
                .build();
    }
}
