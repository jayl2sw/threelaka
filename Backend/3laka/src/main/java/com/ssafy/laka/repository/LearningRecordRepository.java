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

    List<LearningRecord> findLearningRecordsByUserOrderByModifiedDateDesc(User user);
    Optional<LearningRecord> findTop1ByUserOrderByModifiedDateDesc(User user);
    List<LearningRecord> findAllByUserAndStageLessThanOrderByModifiedDateDesc(User user, Stage stage);
    Integer countByUserAndStage(User user, Stage stage);
    List<LearningRecord> findAllByUserAndStage(User user, Stage stage);
    List<LearningRecord> findByUserAndVideoOrderByModifiedDateDesc(User user, Video video);
    List<LearningRecord> findAllByUserAndVideoOrderByModifiedDateDesc(User user, Video video);

    @Query(nativeQuery = true,
            value="SELECT u.nickname, u.profile, max(lr.stage) stage " +
                    "FROM learning_record lr, users u where " +
                    "lr.user_id = u.user_id and " +
                    "u.guild_id = :guildId and " +
                    "video_id = :videoId and " +
                    "lr.modified_date between :start and :end " +
                    "group by u.user_id")
    List<ProgressInterface> findProgress(int guildId, String videoId, String start, String end);
}
