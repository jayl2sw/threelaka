package com.ssafy.laka.repository;

import com.ssafy.laka.domain.Tag;
import com.ssafy.laka.domain.User;
import com.ssafy.laka.domain.UserTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserTagRepository extends JpaRepository<UserTag, Integer> {

    List<UserTag> findAllByUser(User user);
    void deleteAllByUser(User user);

}
