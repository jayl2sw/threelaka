package com.ssafy.laka.repository;

import com.ssafy.laka.domain.UserTag;
import com.ssafy.laka.domain.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VideoRepository extends JpaRepository<Video, Integer> {

}
