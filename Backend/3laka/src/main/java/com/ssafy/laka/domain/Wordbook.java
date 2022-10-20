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
@Table(name = "wordbook")
public class Wordbook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int wordbookId;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(targetEntity = Video.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "video_id")
    private Video video;

    @ManyToOne(targetEntity = Dictionary.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "word")
    private Dictionary dictionary;

    @Column(name ="custom_word")
    private String customWord;

    @Column(name ="definition")
    private String definition;

    @Column(name ="example")
    private String example;

    @Column(name = "is_memorized")
    private boolean isMemorized;

    @OneToMany(mappedBy = "wordbook", cascade = CascadeType.ALL)
    private List<Essay> essays;

    public void setMemorized(){this.isMemorized = true;}
}
