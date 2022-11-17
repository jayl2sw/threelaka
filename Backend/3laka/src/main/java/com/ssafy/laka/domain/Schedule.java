package com.ssafy.laka.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Builder
@AllArgsConstructor
@Table(name = "schedule")
public class Schedule {
    @Id
    @GeneratedValue
    @Column(name = "schedule_id")
    private int scheduleId;

    @ManyToOne(targetEntity = Guild.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "guild_Id")
    private Guild guild;

    // 요일, 시작 시각, 총 시간
    private int yoil;
    private int startTime;
    private int time;

}
