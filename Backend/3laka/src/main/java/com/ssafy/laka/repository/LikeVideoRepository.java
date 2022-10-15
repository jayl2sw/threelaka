package com.ssafy.laka.repository;

import com.ssafy.laka.domain.LikeDub;
import com.ssafy.laka.domain.LikeVideo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeVideoRepository extends JpaRepository<LikeVideo, Integer> {

}
