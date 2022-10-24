package com.ssafy.laka.service;

import com.ssafy.laka.domain.Guild;
import com.ssafy.laka.domain.JoinRequest;
import com.ssafy.laka.domain.User;
import com.ssafy.laka.domain.enums.State;
import com.ssafy.laka.dto.exception.guild.DuplicateRequestException;
import com.ssafy.laka.dto.exception.guild.RequestNotFoundException;
import com.ssafy.laka.dto.exception.user.UserNotFoundException;
import com.ssafy.laka.dto.exception.guild.GuildNotFoundException;
import com.ssafy.laka.dto.guild.GuildCreateDto;
import com.ssafy.laka.dto.guild.GuildResponseDto;
import com.ssafy.laka.dto.user.UserResponseDto;
import com.ssafy.laka.repository.GuildRepository;
import com.ssafy.laka.repository.JoinRequestRepository;
import com.ssafy.laka.repository.UserRepository;
import com.ssafy.laka.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class GuildServiceImpl implements GuildService{
    private final UserRepository userRepository;
    private final GuildRepository guildRepository;
    private final JoinRequestRepository joinRequestRepository;

    @Override
    public void joinGuild(int guildId) {
        User me = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        Guild guild = guildRepository.findById(guildId).orElseThrow(GuildNotFoundException::new);
        JoinRequest joinRequest = joinRequestRepository.findByGuildAndSender(guild, me).orElseThrow(RequestNotFoundException::new);
        if (joinRequest != null){
            throw new DuplicateRequestException();
        }
        joinRequestRepository.save(JoinRequest.builder().sender(me).guild(guild).state(State.pending).build());


    }

    @Override
    public List<UserResponseDto> getJoinReqList() {
        return null;
    }

    @Override
    public void AcceptGuild(int userId) {

    }

    @Override
    public void RejectGuild(int userId) {

    }

    @Override
    public List<UserResponseDto> getMemberList() {
        return null;
    }

    @Override
    public List<GuildResponseDto> SearchGuild() {
        return null;
    }


    //    해당 username을 가진 멤버가 해당 길드에 있는지 조회
    @Override
    public UserResponseDto getMemberInfo(String username, int guildId) {
        User user = userRepository.findByUsername(username).orElseThrow(UserNotFoundException::new);

        return UserResponseDto.from(user);
    }

    @Override
    public void CreateGuild(GuildCreateDto data) {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        Guild guild = Guild.builder()
                .guildName(data.getName())
                .master(user.getUserId())
                .description(data.getDescription())
                .build();
        guildRepository.save(guild);
        user.joinGuild(guild);



    }

    @Override
    public void DeleteGuild(int userId) {

    }

    @Override
    public Void DeleteMember(int userId) {
        return null;
    }
}
