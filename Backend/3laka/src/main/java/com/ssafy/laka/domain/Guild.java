package com.ssafy.laka.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Builder
@AllArgsConstructor
@Table(name = "guild")
public class Guild {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String guildName;

    private int master;

    private String description;
    private String notice;

    @OneToMany(mappedBy = "guild")
    private List<User> members;

    @OneToMany(mappedBy = "guild", cascade = CascadeType.ALL)
    private List<JoinRequest> JoinRequests;

    public void setDescription(String description){this.description = description;}
    @PrePersist
    public void prePersist(){
        this.members = new ArrayList<User>();
    }

    public void setNotice(String notice){this.notice = notice;}

}
