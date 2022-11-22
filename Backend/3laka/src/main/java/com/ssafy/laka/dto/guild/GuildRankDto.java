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
    private int time;
}
