package com.ssafy.laka.repository;

import com.ssafy.laka.domain.LearningRecord;
import com.ssafy.laka.domain.User;
import com.ssafy.laka.domain.enums.Stage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LearningRecordRepository extends JpaRepository<LearningRecord, Integer> {

    Optional<LearningRecord> findTop1ByUserOrderByModifiedDateDesc(User user);
    Optional<LearningRecord> findTop1ByUserAndStageLessThanOrderByModifiedDateDesc(User user, Stage stage);
    Integer countByUserAndStage(User user, Stage stage);

}
