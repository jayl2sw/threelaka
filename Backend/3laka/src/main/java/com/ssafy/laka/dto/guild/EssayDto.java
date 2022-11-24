package com.ssafy.laka.dto.guild;

import com.ssafy.laka.domain.LearningRecord;
import com.ssafy.laka.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EssayDto {
    private int userId;
    private int learningRecordId;
    private String createDate;
    private String modifiedDate;
    private String essay;

    public static EssayDto from(LearningRecord entity) {
        String createDate = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(entity.getCreatedDate()).toString();
        String modifiedDate = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(entity.getModifiedDate()).toString();
        return EssayDto.builder()
                .userId(entity.getUser().getUserId())
                .learningRecordId(entity.getLearningRecordId())
                .createDate(createDate)
                .modifiedDate(modifiedDate)
                .essay(entity.getEssay())
                .build();
    }
}
