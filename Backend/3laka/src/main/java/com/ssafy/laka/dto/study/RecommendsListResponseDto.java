package com.ssafy.laka.dto.study;

import com.ssafy.laka.domain.Video;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "RecommendsListResponseDto", description = "태그 기반 추천 List")
public class RecommendsListResponseDto {

    private List<VideoResponseDto> recommends;

    public static RecommendsListResponseDto from(List<Video> entityList){
        System.out.println(entityList);
        return RecommendsListResponseDto.builder()
                .recommends(entityList.stream().map(e -> VideoResponseDto.from(e)).collect(Collectors.toList()))
                .build();
    }
}
