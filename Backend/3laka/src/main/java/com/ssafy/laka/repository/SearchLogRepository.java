package com.ssafy.laka.repository;

import com.ssafy.laka.domain.LikeVideo;
import com.ssafy.laka.domain.SearchLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SearchLogRepository extends JpaRepository<SearchLog, Integer> {

}
