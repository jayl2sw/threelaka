package com.ssafy.laka.repository;

import com.ssafy.laka.domain.Video;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;



public interface VideoRepository extends JpaRepository<Video, String> {

    @Query(value = "select * from Video where v.title like keyword",
            countQuery = "select count(*) from Video where v.title like %keyword%",
            nativeQuery = true)
    Page<Video> findByKeyword(String keyword, Pageable pageable);
}
