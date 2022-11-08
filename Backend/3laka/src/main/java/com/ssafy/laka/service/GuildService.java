package com.ssafy.laka.service;

import com.ssafy.laka.domain.Assignment;
import com.ssafy.laka.domain.Guild;
import com.ssafy.laka.dto.guild.*;
import com.ssafy.laka.dto.user.UserResponseDto;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface GuildService {
//    길드 가입 요청
    void joinGuild(int guildId);
//    길드 가입 요청 목록 조회
List<JoinRequestDto> getJoinReqList(int guildId);
//    길드 가입 요청 수락
    void acceptGuild(int guildId);
//    길드 가입 요청 거절
    void rejectGuild(int guildId);
//    길드원 목록 조회
    List<UserResponseDto> getMemberDetail();
//   멤버 정보 제외한 길드 조회
    GuildResponseDto searchGuild(int guildId);
//    회원 조회
    UserResponseDto getMemberInfo(String username, int guildId);
//    길드 생성
    GuildResponseDto createGuild(GuildCreateDto data);
//    길드 해체
    void deleteGuild(int userId);
//    마스터의 길드원 추방
    void deleteMember(int userId);
//    해당 길드의 멤버 조회
    MemberResponseDto searchMembers(int guildId);
//    회원의 길드 탈퇴
//    길드 이름 중복 검사
//    마스터 이름 중복 검사
//    길드 공지 수정
//    길드 정보 수정
    void setDescription(String description, int guildId);
    void quitGuild(int guildId);
    NoticeResponseDto createNotice(int guildId, String notice);
    NoticeResponseDto getNotice(int guildId);
    void deleteNotice(int guildId);
    NoticeResponseDto UpdateNotice(int guildId, String notice);
    void changeMaster(int userId);

    List<Guild> getRankGuild();
    List<Guild> getMyRequests();
    List<Guild> searchGuilds(GuildSearchDto guildSearchDto);
    List<Assignment> getAssignments(int status);

    List<?> getProgress(int assignmentId);
}



