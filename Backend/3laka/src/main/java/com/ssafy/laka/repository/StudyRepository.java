package com.ssafy.laka.repository;

import com.ssafy.laka.domain.SearchLog;
import com.ssafy.laka.domain.Study;
import com.ssafy.laka.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudyRepository extends JpaRepository<Study, Integer> {

    Optional<Study> findByUserAndDate(User user, String date);
}
