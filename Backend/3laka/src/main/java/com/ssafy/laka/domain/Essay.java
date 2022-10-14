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
@Table(name = "essay")
public class Essay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long essayId;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(targetEntity = Wordbook.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "wordbook_id")
    private Wordbook wordbook;

    @ManyToOne(targetEntity = Dictionary.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "word")
    private Dictionary dictionary;

}
