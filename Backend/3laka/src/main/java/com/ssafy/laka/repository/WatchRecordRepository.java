package com.ssafy.laka.repository;

import com.ssafy.laka.domain.Video;
import com.ssafy.laka.domain.WatchRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WatchRecordRepository extends JpaRepository<WatchRecord, Integer> {

}
