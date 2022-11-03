package com.ssafy.laka.repository;

import com.ssafy.laka.domain.LearningRecord;
import com.ssafy.laka.domain.User;
import com.ssafy.laka.domain.Video;
import com.ssafy.laka.domain.Wordbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import java.util.List;

public interface WordbookRepository extends JpaRepository<Wordbook, Integer> {

    @Query(nativeQuery = true, value = "select * from wordbook wb where wb.user_id = :userId and wb.video_id = :videoId and wb.is_memorized = :isMemorized order by RAND() limit 5")
    List<Wordbook> findRandom5ByUserAndVideoAndMemorized(int userId, String videoId, boolean isMemorized);

    int countByUser(User user);

    List<Wordbook> findWordbooksByLearningRecord(LearningRecord learningRecord);

    Optional<Wordbook> findByLearningRecordAndWord(LearningRecord lr, String word);
}
