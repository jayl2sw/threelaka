package com.ssafy.laka.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.laka.domain.Guild;
import com.ssafy.laka.domain.QGuild;
import com.ssafy.laka.domain.QSchedule;
import com.ssafy.laka.domain.Schedule;
import com.ssafy.laka.dto.guild.GuildSearchDto;
import org.springframework.util.StringUtils;

import java.util.List;

public class ScheduleRepositoryImpl implements ScheduleRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QGuild qGuild = QGuild.guild;
    QSchedule qSchedule = QSchedule.schedule;

    public ScheduleRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<Guild> findAllByConditions(GuildSearchDto guildSearchDto) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if(StringUtils.hasText(guildSearchDto.getKeyword())) {
            booleanBuilder.and(qGuild.guildName.contains(guildSearchDto.getKeyword()));
        }
        if(guildSearchDto.getYoil() != null) {
            booleanBuilder.and(qSchedule.yoil.eq(guildSearchDto.getYoil()));
        }
        if(guildSearchDto.getStartTime() != null) {
            booleanBuilder.and(qSchedule.startTime.eq(guildSearchDto.getStartTime()));
        }
        if(guildSearchDto.getTime() != null) {
            booleanBuilder.and(qSchedule.time.eq(guildSearchDto.getTime()));
        }
        List<Guild> guilds = jpaQueryFactory.selectFrom(qGuild).where(booleanBuilder).fetch();
        return guilds;
    }

}
