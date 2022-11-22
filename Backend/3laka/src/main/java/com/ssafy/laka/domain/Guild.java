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
    private Integer exp;
    private String profile;

    @OneToMany(mappedBy = "guild")
    private List<User> members;

    @OneToMany(mappedBy = "guild", cascade = CascadeType.ALL)
    private List<JoinRequest> JoinRequests;

    @OneToMany(mappedBy = "guild", cascade = CascadeType.ALL)
    private List<Assignment> assignments;

    @OneToMany(mappedBy = "guild", cascade = CascadeType.ALL)
    private List<Schedule> schedules;

    @OneToMany(mappedBy = "guild", cascade = CascadeType.ALL)
    private List<Alert> alerts;

    public void setDescription(String description){this.description = description;}
    @PrePersist
    public void prePersist(){
        this.members = new ArrayList<User>();
        this.exp = 0;
        this.profile = this.profile == null ? "https://threelaka.s3.ap-northeast-2.amazonaws.com/0.png" : this.profile;
    }

    public void setNotice(String notice){this.notice = notice;}

    public void setMaster(int master){this.master = master;}

    public void changeProfile(String profileId) {this.profile = "https://threelaka.s3.ap-northeast-2.amazonaws.com/" + profileId;}

}
