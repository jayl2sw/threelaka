package com.ssafy.laka.dto.guild;

import com.ssafy.laka.domain.Guild;
import com.ssafy.laka.domain.enums.State;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GuildRequestDto {
    private String guildName;
    private State state;
}
