package com.ssafy.laka.repository;

import com.ssafy.laka.domain.User;
import com.ssafy.laka.dto.guild.GoodMemberDto;
import com.ssafy.laka.dto.guild.GoodMemberInterface;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Page<User> findAll(Pageable pageable);
    Optional<User> findByUsername(String username);
    Optional<User> findByNickname(String nickname);

    @Query(nativeQuery = true,
            value = "select u.user_id userId, u.nickname, u.profile, sum(s.time) time from study s, users u " +
                    "where u.guild_id = :guildId and s.user_user_id = u.user_id and date(s.date) " +
                    "between subdate(curdate(), date_format(curdate(), '%w') - 1) " +
                    "and subdate(curdate(), date_format(curdate(), '%w') - 7) group by u.user_id order by sum(s.time) desc;")
    List<GoodMemberInterface> findGoodMembers(int guildId);

}
