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
@ApiModel(value = "InterestTagReqeustDto", description = "관심 태그 요청 Dto")
public class InterestTagReqeustDto {
    private int tag1;
    private int tag2;
    private int tag3;
}
