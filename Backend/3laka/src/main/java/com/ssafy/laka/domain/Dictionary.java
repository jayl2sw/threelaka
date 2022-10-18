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
@Table(name = "dictionary")
public class Dictionary {

    @Id
    @GeneratedValue
    private int wordId;

    private String word;

    private String content;

    @OneToMany(mappedBy = "dictionary", cascade = CascadeType.ALL)
    private List<Essay> essays;

    @OneToMany(mappedBy = "dictionary", cascade = CascadeType.ALL)
    private List<Wordbook> wordbooks;

}
