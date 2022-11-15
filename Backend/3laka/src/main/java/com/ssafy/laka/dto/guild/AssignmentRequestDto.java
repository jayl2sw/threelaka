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
    private int assignmentId;
    private String videoId;
    private String videoTitle;
    private int guildId;
    private String startDate;
    private String endDate;

    public static AssignmentRequestDto from(Assignment entity){
        return AssignmentRequestDto.builder()
                .assignmentId(entity.getAssignmentId())
                .videoId(entity.getVideo().getVideoId())
                .videoTitle(entity.getVideo().getTitle())
                .guildId(entity.getGuild().getId())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .build();
    }
}
