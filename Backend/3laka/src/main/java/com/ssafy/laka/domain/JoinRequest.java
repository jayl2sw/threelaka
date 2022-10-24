package com.ssafy.laka.domain;

import com.ssafy.laka.domain.enums.State;
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
@Table(name = "join_request")
public class JoinRequest{
    @Id
    @GeneratedValue
    @Column(name = "request_Id")
    private int requestId;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_Id")
    private User sender;

    @ManyToOne(targetEntity = Guild.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "guild_Id")
    private Guild guild;

    private State state;

}
