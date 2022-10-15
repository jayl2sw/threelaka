package com.ssafy.laka.repository;

import com.ssafy.laka.domain.Tag;
import com.ssafy.laka.domain.UserTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTagRepository extends JpaRepository<UserTag, Integer> {

}
