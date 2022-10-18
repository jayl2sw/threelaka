package com.ssafy.laka.repository;

import com.ssafy.laka.domain.LearningRecord;
import com.ssafy.laka.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LearningRecordRepository extends JpaRepository<LearningRecord, Integer> {

    List<LearningRecord> findLearningRecordsByUserOrderByModifiedDateDesc(User user);

}
