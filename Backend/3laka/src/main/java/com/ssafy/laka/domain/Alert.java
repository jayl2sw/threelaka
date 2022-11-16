package com.ssafy.laka.domain;


import com.ssafy.laka.domain.enums.AlertState;
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
@Table(name = "Alert")
public class Alert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int AlertId;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(targetEntity = Guild.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "guild_id")
    private Guild guild;

    @ManyToOne(targetEntity = Assignment.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "assignment_id")
    private Assignment assignment;

    private AlertState alertState;
}
