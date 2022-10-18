package com.ssafy.laka.repository;

import com.ssafy.laka.domain.User;
import com.ssafy.laka.domain.Video;
import com.ssafy.laka.domain.Wordbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface WordbookRepository extends JpaRepository<Wordbook, Integer> {

    @Query(nativeQuery = true, value = "select * from wordbook wb where wb.user_id = :userId and wb.video_id = :videoId order by RAND() limit 5")
    List<Wordbook> findRandom5ByUserAndVideo(int userId, int videoId);

    int countByUser(User user);

}
