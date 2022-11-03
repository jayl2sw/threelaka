package com.ssafy.laka.repository;

import com.ssafy.laka.domain.Video;
import com.ssafy.laka.dto.study.VideoResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface VideoRepository extends JpaRepository<Video, String> {

    @Query(value = "select * from video where title like keyword",
            countQuery = "select count(*) from video where title like %keyword%",
            nativeQuery = true)
    Page<Video> findByKeyword(String keyword, Pageable pageable);

    @Query(value="select * from video limit 4", nativeQuery = true)
    List<Video> findFourVideos();
}
