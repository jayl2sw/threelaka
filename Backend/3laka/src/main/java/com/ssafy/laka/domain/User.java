package com.ssafy.laka.domain;

import com.ssafy.laka.domain.basetime.BaseTime;
import com.ssafy.laka.domain.enums.Gender;
import com.ssafy.laka.domain.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

import static com.ssafy.laka.domain.enums.Gender.SECRET;

@Entity
@NoArgsConstructor
@Getter
@Builder
@AllArgsConstructor
@Table(name = "users")
public class User extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "nickname")
    private String nickname;
    @Column(name = "email")
    private String email;
    @Column(name = "role")
    private Role role;
    @Column(name = "token")
    private String token;
    private Integer age;
    private Gender gender;
    private Integer grade;
    private String lastLogin;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Comment> comments;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Dubbing> dubbings;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Essay> essays;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<LikeVideo> likeVideos;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<LikeDub> likeDubbings;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<LearningRecord> LearningRecords;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserTag> userTags;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Study> studies;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Wordbook> wordbooks;

    @ManyToOne(targetEntity = Guild.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "guild_id")
    private Guild guild;

    @PrePersist
    public void prePersist(){
        this.age = this.age == null ? 0 : this.age;
        this.gender = this.gender == null ? SECRET : this.gender;
        this.grade = this.grade == null ? 0 : this.grade;
    }

    public void saveToken(String token) {
        this.token = token;
    }
    public void changePW(String password){this.password = password;}
    public void setNickname(String nickname){this.nickname = nickname;}
    public void joinGuild(int guild_id){

    }


}
