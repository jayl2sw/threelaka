package com.ssafy.laka.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Builder
@AllArgsConstructor
@Table(name = "tag")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int tagId;

    public String name;
    //  로라킴 화이팅 !

    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL)
    private List<VideoTag> videoTags;

    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL)
    private List<UserTag> userTags;
}
