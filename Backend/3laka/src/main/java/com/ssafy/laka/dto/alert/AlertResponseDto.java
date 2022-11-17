package com.ssafy.laka.dto.alert;

import com.ssafy.laka.domain.Alert;
import com.ssafy.laka.domain.enums.AlertState;
import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "UserAlertResponseDto", description = "유저 할당 알림정보 응답 Dto")
public class AlertResponseDto {
    private Integer alertId;
    private Integer assignmentId;
    private String videoId;
    private String videoTitle;
    private Integer guildId;
    private String guildName;
    private AlertState alertState;

    public static AlertResponseDto from(Alert entity) {
        return AlertResponseDto.builder()
                .alertId(entity.getAlertId())
                .assignmentId(entity.getAssignment() == null ? null : entity.getAssignment().getAssignmentId())
                .videoId(entity.getAssignment() == null ? null : entity.getAssignment().getVideo().getVideoId())
                .videoTitle(entity.getAssignment() == null ? null : entity.getAssignment().getVideo().getTitle())
                .guildId(entity.getGuild() == null ? null : entity.getGuild().getId())
                .guildName(entity.getGuild()== null ? null : entity.getGuild().getGuildName())
                .alertState(entity.getAlertState())
                .build();



    }
}
