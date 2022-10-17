package com.ssafy.laka.repository;

import com.ssafy.laka.domain.LearningRecord;
import com.ssafy.laka.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LearningRecordRepository extends JpaRepository<LearningRecord, Integer> {

    Optional<LearningRecord> findTop1ByUserOrderByModifiedDateDesc(User user);

}
