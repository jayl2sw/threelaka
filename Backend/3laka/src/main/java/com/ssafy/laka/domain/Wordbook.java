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

    @ManyToOne(targetEntity = LearningRecord.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "learning_record_id")
    private LearningRecord learningRecord;


    private String word;

    @Column(name ="example")
    private String example;

    @Column(name = "is_memorized")
    private boolean isMemorized;


    public void setMemorized(){this.isMemorized = true;}
}
