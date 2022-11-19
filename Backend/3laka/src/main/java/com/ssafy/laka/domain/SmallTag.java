package com.ssafy.laka.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Builder
@AllArgsConstructor
@Table(name = "SmallTag")
public class SmallTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int smallTagId;

    public String smallTagName;
    //  로라킴 화이팅 !

    @ManyToOne(targetEntity = Tag.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;

}
