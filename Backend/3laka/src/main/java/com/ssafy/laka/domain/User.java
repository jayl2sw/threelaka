package com.ssafy.laka.domain;

import com.ssafy.laka.domain.basetime.BaseTime;
import com.ssafy.laka.domain.enums.Role;
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
@Table(name = "users")
public class User extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;
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

    public void saveToken(String token) {
        this.token = token;
    }

    public void changePW(String password){this.password = password;}
    public void setNickname(String nickname){this.nickname = nickname;}

}
