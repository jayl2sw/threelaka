package com.ssafy.laka.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.laka.domain.Comment;
import com.ssafy.laka.domain.Guild;
import com.ssafy.laka.domain.Schedule;
import com.ssafy.laka.dto.guild.GuildSearchDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleRepository {

    List<Guild> findAllByConditions(GuildSearchDto guildSearchDto);

}
