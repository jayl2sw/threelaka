package com.ssafy.laka.repository;

import com.ssafy.laka.domain.Essay;
import com.ssafy.laka.domain.Friend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendRepository extends JpaRepository<Friend, Integer> {

}
