package com.ssafy.laka.repository;

import com.ssafy.laka.domain.Guild;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GuildRepository extends JpaRepository<Guild, Integer> {
    Optional<Guild> findById(int id);
    Optional<Guild> findByMaster(int master);

    Optional<Guild> findByGuildName(String guildName);

}
