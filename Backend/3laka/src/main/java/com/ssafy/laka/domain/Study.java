package com.ssafy.laka.domain;

import com.ssafy.laka.domain.basetime.BaseTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

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

    private String date;

    private int time;

    public void addTime(int time) { this.time = this.time + time; }
    public Study(User user, int time) {
        String date = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(LocalDate.now()).toString();

        this.user = user;
        this.date = date;
        this.time = time;
    }
}
