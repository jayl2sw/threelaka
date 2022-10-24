package com.ssafy.laka.dto.guild;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "GuildResponseDto", description = "길드 정보 찾기")
public class GuildResponseDto {
    private int guildId;
    private int userId;
    private String guildName;

}