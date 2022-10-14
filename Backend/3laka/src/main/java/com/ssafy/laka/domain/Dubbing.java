package com.ssafy.laka.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Builder
@AllArgsConstructor
@Table(name = "dubbing")
public class Dubbing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int dubbingId;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "url")
    private String url;

    @OneToMany(mappedBy = "dubbing", cascade = CascadeType.ALL)
    private List<Comment> comments;

    @OneToMany(mappedBy = "dubbing", cascade = CascadeType.ALL)
    private List<LikeDub> likeDubbings;

}
