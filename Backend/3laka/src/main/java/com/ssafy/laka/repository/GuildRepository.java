package com.ssafy.laka.repository;

import com.ssafy.laka.domain.Guild;
import com.ssafy.laka.domain.User;
import com.ssafy.laka.dto.guild.GoodMemberDto;
import com.ssafy.laka.dto.guild.GuildWithTimeInterface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GuildRepository extends JpaRepository<Guild, Integer> {
    Optional<Guild> findById(int id);
    Optional<Guild> findByMaster(int master);

    Optional<Guild> findByGuildName(String guildName);
    List<Guild> findTop3ByOrderByExp();

    @Query(nativeQuery = true,
            value = "SELECT a.id, a.guild_name guildname, a.profile, sum(a.times) time " +
                    "FROM (SELECT u.user_id, g.*, sum(time) as times FROM guild g, users u, study s WHERE u.guild_id = g.id AND u.user_id = s.user_user_id GROUP BY u.user_id) a " +
                    "GROUP BY a.id ORDER BY sum(a.times) DESC limit 3;")
    List<GuildWithTimeInterface> findRanking3Guilds();

    @Query(nativeQuery = true,
            value = "SELECT a.id, a.description, a.guild_name, a.master, a.notice, a.exp, a.profile " +
                    "FROM (SELECT u.user_id, g.*, sum(time) times FROM guild g, users u, study s WHERE u.guild_id = g.id AND u.user_id = s.user_user_id GROUP BY u.user_id) a " +
                    "GROUP BY a.id ORDER BY sum(a.times) DESC;")
    List<Guild> findRankingGuilds();

    List<Guild> findAllByOrderByGuildName();
    @Query(value = "SELECT g FROM Guild g ORDER BY g.members.size DESC")
    List<Guild> findAllByOrderByGuildSize();

}
