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
@Table(name = "likeDub")
public class LikeDub {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeDubId;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name="user")
    private User user;

    @ManyToOne(targetEntity = Dubbing.class, fetch = FetchType.LAZY)
    @JoinColumn(name="dubbing")
    private Dubbing dubbing;

}
