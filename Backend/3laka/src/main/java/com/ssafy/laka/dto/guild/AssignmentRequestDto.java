package com.ssafy.laka.dto.guild;

import com.ssafy.laka.domain.Assignment;
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
    private String startDate;
    private String endDate;
}
