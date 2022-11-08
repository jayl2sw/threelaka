package com.ssafy.laka.repository;

import com.ssafy.laka.domain.Assignment;
import com.ssafy.laka.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Integer> {

    // 예정 / 진행중 / 완료
    List<Assignment> findAllByStartDateAfter(String today);
    List<Assignment> findAllByStartDateBeforeAndEndDateAfter(String today1, String today2);
    List<Assignment> findAllByEndDateBefore(String today);

}
