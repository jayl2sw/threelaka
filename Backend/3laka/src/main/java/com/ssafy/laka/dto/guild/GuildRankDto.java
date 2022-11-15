package com.ssafy.laka.dto.guild;

import com.ssafy.laka.domain.Guild;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GuildRankDto {
    private int guildId;
    private String guildName;
    private String profile;

    public static GuildRankDto from(Guild entity) {
        return GuildRankDto.builder()
                .guildId(entity.getId())
                .guildName(entity.getGuildName())
                .profile(entity.getProfile())
                .build();
    }
}
