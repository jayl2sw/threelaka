package com.ssafy.laka.repository;

import com.ssafy.laka.domain.LearningRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LearningRecordRepository extends JpaRepository<LearningRecord, Integer> {

}
