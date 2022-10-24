package com.ssafy.laka.repository;

import com.ssafy.laka.domain.Comment;
import com.ssafy.laka.domain.Dubbing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DubbingRepository extends JpaRepository<Dubbing, Integer> {

}
