package com.ssafy.laka.repository;

import com.ssafy.laka.domain.Assignment;
import com.ssafy.laka.domain.Comment;
import com.ssafy.laka.domain.Guild;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Integer> {

    // 예정 / 진행중 / 완료
    List<Assignment> findAllByGuildAndStartDateAfterOrderByEndDateDesc(Guild guild, String today);
    List<Assignment> findAllByGuildAndStartDateBeforeAndEndDateAfterOrderByEndDateDesc(Guild guild, String today1, String today2);
    List<Assignment> findAllByGuildAndEndDateBeforeOrderByEndDateDesc(Guild guild, String today);

}
