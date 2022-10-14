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
public class LikeDub {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int likeDubId;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(targetEntity = Dubbing.class, fetch = FetchType.LAZY)
    @JoinColumn(name="dubbing")
    private Dubbing dubbing;

}
