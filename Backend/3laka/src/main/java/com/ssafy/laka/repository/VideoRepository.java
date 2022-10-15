package com.ssafy.laka.repository;

import com.ssafy.laka.domain.UserTag;
import com.ssafy.laka.domain.Video;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepository extends JpaRepository<Video, Integer> {

}
