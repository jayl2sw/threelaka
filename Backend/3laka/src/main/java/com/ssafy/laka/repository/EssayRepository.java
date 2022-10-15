package com.ssafy.laka.repository;

import com.ssafy.laka.domain.Dubbing;
import com.ssafy.laka.domain.Essay;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EssayRepository extends JpaRepository<Essay, Integer> {

}
