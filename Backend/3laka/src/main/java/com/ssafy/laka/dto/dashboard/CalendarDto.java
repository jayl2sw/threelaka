package com.ssafy.laka.dto.dashboard;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "CalendarDto", description = "이번 달 학습일 및 연속 출석일 Dto")
public class CalendarDto {
    private boolean[] presence;
    private int seqDays;
}
