package com.ssafy.laka.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.util.Lazy;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Builder
@AllArgsConstructor
public class LikeVideo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int likeVideoId;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(targetEntity = Video.class, fetch = FetchType.LAZY)
    @JoinColumn(name="video")
    private Video video;

}