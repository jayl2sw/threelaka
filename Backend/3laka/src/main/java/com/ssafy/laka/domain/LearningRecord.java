package com.ssafy.laka.domain;

import com.ssafy.laka.domain.basetime.BaseTime;
import com.ssafy.laka.domain.enums.Stage;
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
@Table(name = "learning_record")
public class LearningRecord extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int learningRecordId;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(targetEntity = Video.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "video_id")
    private Video video;

    private String continueTime;
    private Stage stage;

    @Column(name = "latest_time")
    private String latestTime;

    @OneToMany(mappedBy = "learningRecord", cascade = CascadeType.ALL)
    private List<Wordbook> wordbooks;

    private int survey;

    private String essay;
    public void setStage (Stage stage) { this.stage = stage; }
    public void setEssay (String content) { this.essay = content; }
    public void setSurvey (int result) { this.survey = result; }
}
