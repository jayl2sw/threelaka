package com.ssafy.laka.repository;

import com.ssafy.laka.domain.Study;
import com.ssafy.laka.domain.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Integer> {

}
