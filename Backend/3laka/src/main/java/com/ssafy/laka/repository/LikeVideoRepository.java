package com.ssafy.laka.repository;

import com.ssafy.laka.domain.LikeDub;
import com.ssafy.laka.domain.LikeVideo;
import com.ssafy.laka.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeVideoRepository extends JpaRepository<LikeVideo, Integer> {

    List<LikeVideo> findAllByUser(User user);

}
