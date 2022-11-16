package com.ssafy.laka.dto.dashboard;

import com.ssafy.laka.domain.Video;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "HistoryNumDto", description = "현재까지의 공부양 Dto")
public class HistoryNumDto {
    private int videos;
    private int essays;
    private int words;
}
