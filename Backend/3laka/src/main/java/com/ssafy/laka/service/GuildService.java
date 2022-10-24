package com.ssafy.laka.service;

import com.ssafy.laka.dto.guild.GuildCreateDto;
import com.ssafy.laka.dto.guild.GuildResponseDto;
import com.ssafy.laka.dto.user.UserResponseDto;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface GuildService {
//    길드 가입 요청
    void joinGuild(int guildId);

//    길드 가입 요청 목록 조회
    List<UserResponseDto> getJoinReqList();
//    길드 가입 요청 수락
    void AcceptGuild(int guildId);
//    길드 가입 요청 거절
    void RejectGuild(int guildId);
//    길드원 목록
    List<UserResponseDto> getMemberList();
//    길드 찾기
    List<GuildResponseDto> SearchGuild();
//    회원 조회
    UserResponseDto getMemberInfo(String username, int guildId);
//    길드 생성
    void CreateGuild(GuildCreateDto data);
//    길드 해체
    void DeleteGuild(int userId);
//    길드원 추방
    Void DeleteMember(int userId);
}
