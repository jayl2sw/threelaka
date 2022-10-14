package com.ssafy.laka.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import reactor.core.publisher.Sinks;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Builder
@AllArgsConstructor
@Table(name = "study")
public class Study {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int studyId;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    private User user;

    private int time;
}
