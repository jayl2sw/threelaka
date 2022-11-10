package com.ssafy.laka.repository;

import com.ssafy.laka.domain.SearchLog;
import com.ssafy.laka.domain.Study;
import com.ssafy.laka.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StudyRepository extends JpaRepository<Study, Integer> {

    Optional<Study> findByUserAndDate(User user, String date);
    @Query(nativeQuery = true,
            value = "select * from study s where s.user_user_id = :userId and s.date between date_format(now(), '%Y-%m-01') and date_format(now(), '%Y-%m-%d')")
    List<Study> findStudyDateThisMonth(int userId);

    @Query(nativeQuery = true,
            value = "select * from study s where s.user_user_id = :userId and date(s.date) " +
                    "between subdate(curdate(), date_format(curdate(), '%w') - 1) " +
                    "and subdate(curdate(), date_format(curdate(), '%w') - 7)")
    List<Study> findStudyDateThisWeek(int userId);

}
