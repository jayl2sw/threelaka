package com.ssafy.laka.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.laka.domain.*;
import com.ssafy.laka.dto.guild.GuildSearchDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class GuildRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;
    QGuild qGuild = QGuild.guild;
    QSchedule qSchedule = QSchedule.schedule;

    // Guild 리스트 세 개
    // Guild User Study
    public List<Guild> findGuildsByConditions(GuildSearchDto guildSearchDto) {
        BooleanBuilder guildBooleanBuilder = new BooleanBuilder();
        BooleanBuilder scheduleBooleanBuilder = new BooleanBuilder();
        if(StringUtils.hasText(guildSearchDto.getKeyword())) {
            guildBooleanBuilder.and(qGuild.guildName.contains(guildSearchDto.getKeyword()));
        }
        if(guildSearchDto.getYoil() != null) {
            scheduleBooleanBuilder.and(qSchedule.yoil.eq(guildSearchDto.getYoil()));
        }
        if(guildSearchDto.getStartTime() != null) {
            scheduleBooleanBuilder.and(qSchedule.startTime.eq(guildSearchDto.getStartTime()));
        }
        if(guildSearchDto.getTime() != null) {
            scheduleBooleanBuilder.and(qSchedule.time.eq(guildSearchDto.getTime()));
        }
        List<Guild> guilds = jpaQueryFactory.selectFrom(qGuild).leftJoin(qSchedule).on(qGuild.id.eq(qSchedule.guild.id)).where(guildBooleanBuilder, scheduleBooleanBuilder).fetch();
        return guilds;
    }

}
