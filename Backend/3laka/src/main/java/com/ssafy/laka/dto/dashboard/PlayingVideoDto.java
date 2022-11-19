package com.ssafy.laka.dto.dashboard;

import com.ssafy.laka.domain.Video;
import com.ssafy.laka.domain.Wordbook;
import com.ssafy.laka.domain.enums.Stage;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "PlayingVideoDto", description = "현재 공부 중인 영상 Dto")
public class PlayingVideoDto {
    private String videoId;
    private String title;
    private String continueTime;
    private Stage stage;
    public static PlayingVideoDto of(Video video, String continueTime, Stage stage) {
        return PlayingVideoDto.builder()
                .videoId(video.getVideoId())
                .title(video.getTitle())
                .continueTime(continueTime)
                .stage(stage)
                .build();
    }
}
