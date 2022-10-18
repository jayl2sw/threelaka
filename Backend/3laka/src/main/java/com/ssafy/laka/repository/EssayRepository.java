package com.ssafy.laka.repository;

import com.ssafy.laka.domain.Dubbing;
import com.ssafy.laka.domain.Essay;
import com.ssafy.laka.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EssayRepository extends JpaRepository<Essay, Integer> {

    int countByUser(User user);

}
