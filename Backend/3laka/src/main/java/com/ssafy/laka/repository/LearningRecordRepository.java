package com.ssafy.laka.repository;

import com.ssafy.laka.domain.LearningRecord;
import com.ssafy.laka.domain.User;
import com.ssafy.laka.domain.Video;
import com.ssafy.laka.domain.enums.Stage;
import com.ssafy.laka.dto.guild.ProgressInterface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LearningRecordRepository extends JpaRepository<LearningRecord, Integer> {

    List<LearningRecord> findTop5ByUserOrderByModifiedDateDesc(User user);
    Optional<LearningRecord> findTop1ByUserOrderByModifiedDateDesc(User user);
    List<LearningRecord> findTop5ByUserAndStageLessThanOrderByModifiedDateDesc(User user, Stage stage);
    Integer countByUserAndStage(User user, Stage stage);
    List<LearningRecord> findAllByUserAndStageOrderByModifiedDateDesc(User user, Stage stage);
    List<LearningRecord> findByUserAndVideoOrderByModifiedDateDesc(User user, Video video);
    List<LearningRecord> findAllByUserAndVideoOrderByModifiedDateDesc(User user, Video video);
    List<LearningRecord> findAllByUser(User user);

    @Query(nativeQuery = true,
            value="SELECT t1.stage, t1.essay, u.nickname, u.profile " +
                    "FROM (SELECT lr.learning_record_id, lr.essay, lr.user_id, lr.stage, ROW_NUMBER() " +
                    "OVER(PARTITION BY lr.user_id ORDER BY lr.stage DESC, lr.modified_date DESC) AS RowIdx " +
                    "FROM learning_record lr WHERE lr.video_id = :videoId AND lr.modified_date BETWEEN :start AND :end) AS t1, users u " +
                    "WHERE RowIdx = 1 AND u.user_id = t1.user_id AND u.guild_id = :guildId")
    List<ProgressInterface> findProgress(int guildId, String videoId, String start, String end);

    int countByUserAndAndEssayNotNull(User usr);
}
