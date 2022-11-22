package com.ssafy.laka.dto.study;

import com.ssafy.laka.domain.LearningRecord;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "RecentLearningRecordResponseDto", description = "최근 Learning record 정보 응답 Dto")
public class LearningResultResponseDto {
    private int learningRecord;
    private String startDate;
    private String finishedDate;
    private int numberOfWordbook;
    private int todayLearningTime;

    public static LearningResultResponseDto from(LearningRecord entity, int wordbook, int time){
        String today = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(LocalDate.now()).toString();
        return LearningResultResponseDto.builder()
                .learningRecord(entity.getLearningRecordId())
                .startDate(entity.getCreatedDate().toString())
                .finishedDate(today)
                .numberOfWordbook(wordbook)
                .todayLearningTime(time)
                .build();
    }
}
