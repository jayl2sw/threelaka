package com.ssafy.laka.dto.guild;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentRequestDto {
    private String videoId;
    private int guildId;
    private String startDate;
    private String endDate;
}
