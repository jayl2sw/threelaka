package com.ssafy.laka.repository;

import com.ssafy.laka.domain.LearningRecord;
import com.ssafy.laka.domain.User;
import com.ssafy.laka.domain.Video;
import com.ssafy.laka.domain.enums.Stage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LearningRecordRepository extends JpaRepository<LearningRecord, Integer> {

    List<LearningRecord> findLearningRecordsByUserOrderByModifiedDateDesc(User user);
    Optional<LearningRecord> findTop1ByUserOrderByModifiedDateDesc(User user);
    Optional<LearningRecord> findTop1ByUserAndStageLessThanOrderByModifiedDateDesc(User user, Stage stage);
    Integer countByUserAndStage(User user, Stage stage);
    List<LearningRecord> findAllByUserAndStage(User user, Stage stage);
    List<LearningRecord> findByUserAndVideoOrderByModifiedDateDesc(User user, Video video);
    Optional<LearningRecord> findTop1ByVideoAndAndUserAndModifiedDateAfterOrderByModifiedDateDesc(Video video, User user, String start);
}
