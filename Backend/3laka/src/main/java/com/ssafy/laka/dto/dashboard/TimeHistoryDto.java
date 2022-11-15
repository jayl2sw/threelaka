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
@ApiModel(value = "TimeHistoryDto", description = "현재까지의 공부 시간Dto")
public class TimeHistoryDto {
    private int time;
}
