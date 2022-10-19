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
@ApiModel(value = "StudyDataDto", description = "일별/주별/월별 학습 데이터 Dto")
public class StudyDataDto {

    private int day;
    private int week;
    private int month;

}
