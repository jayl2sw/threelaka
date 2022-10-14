package com.ssafy.laka.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Builder
@AllArgsConstructor
@Table(name = "video_tag")
public class VideoTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int videoTagId;

    // 이게 외래키라서 video에서 videoId 컬럼을 가져오는 거예요
    // 얘는 1:N 관계라서 videoTag에는 ManyToOne 어노테이션 해주구
    // video에 가서는 OneToMany 어노테이션으로 List<VideoTag> 넣어줘야함
    // 누가 이렇게 착하게 적어줌? choi 왔따감
    @ManyToOne(targetEntity = Video.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "video_id")
    private Video video;

    @ManyToOne(targetEntity = Tag.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;

}