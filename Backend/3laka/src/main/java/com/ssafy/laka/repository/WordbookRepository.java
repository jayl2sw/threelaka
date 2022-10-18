package com.ssafy.laka.repository;

import com.ssafy.laka.domain.User;
import com.ssafy.laka.domain.Video;
import com.ssafy.laka.domain.Wordbook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WordbookRepository extends JpaRepository<Wordbook, Integer> {

    List<Wordbook> findByUserAndVideo(User user, Video video);
}
