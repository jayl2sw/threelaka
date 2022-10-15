package com.ssafy.laka.repository;

import com.ssafy.laka.domain.SearchLog;
import com.ssafy.laka.domain.Study;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyRepository extends JpaRepository<Study, Integer> {

}
