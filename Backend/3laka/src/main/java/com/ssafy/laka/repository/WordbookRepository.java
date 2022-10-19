package com.ssafy.laka.repository;

import com.ssafy.laka.domain.User;
import com.ssafy.laka.domain.Video;
import com.ssafy.laka.domain.Wordbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

import java.util.List;

public interface WordbookRepository extends JpaRepository<Wordbook, Integer> {

    List<Wordbook> findByUserAndVideo(User user, Video video);
    @Query(nativeQuery = true, value = "select * from wordbook wb where wb.user_id = :userId and wb.video_id = :videoId order by RAND() limit 5")
    List<Wordbook> findRandom5ByUserAndVideo(int userId, String videoId);

}
