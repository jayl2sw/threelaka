package com.ssafy.laka.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.json.JSONObject;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Builder
@AllArgsConstructor
@Table(name = "video")
public class Video {

    @Id
    private String videoId;
    private String title;
    private String description;

    @OneToMany(mappedBy = "video", cascade = CascadeType.ALL)
    private List<VideoTag> videoTags;

    @OneToMany(mappedBy = "video", cascade = CascadeType.ALL)
    private List<LearningRecord> LearningRecords;

    @OneToMany(mappedBy = "video", cascade = CascadeType.ALL)
    private List<LikeVideo> likeVideos;

    public static Video from(com.google.api.services.youtube.model.Video entity) {
        return Video.builder()
                .videoId(entity.getId())
                .title(entity.getSnippet().getTitle())
                .description(entity.getSnippet().getDescription())
                .build();
    }
}
