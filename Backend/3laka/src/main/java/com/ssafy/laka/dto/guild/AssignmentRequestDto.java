package com.ssafy.laka.dto.guild;

import com.ssafy.laka.domain.Assignment;
import com.ssafy.laka.domain.Guild;
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

    public static AssignmentRequestDto from(Assignment entity){
        return AssignmentRequestDto.builder()
                .videoId(entity.getVideo().getVideoId())
                .guildId(entity.getGuild().getId())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .build();
    }
}
