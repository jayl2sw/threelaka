package com.ssafy.laka.service;

import com.ssafy.laka.domain.Guild;
import com.ssafy.laka.domain.JoinRequest;
import com.ssafy.laka.domain.User;
import com.ssafy.laka.domain.enums.State;
import com.ssafy.laka.dto.exception.guild.*;
import com.ssafy.laka.dto.exception.user.UserNotFoundException;
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
//    길드 가입 요청
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
//    길드 가입 요청 수락
    public void acceptGuild(int userId) {

    }

    @Override
//    길드 가입 요청 거절
    public void rejectGuild(int userId) {

    }

    @Override
    public List<UserResponseDto> getMemberList() {
        return null;
    }

    @Override
    public List<GuildResponseDto> searchGuild() {
        return null;
    }


    //    해당 username을 가진 멤버가 해당 길드에 있는지 조회
    @Override
    public UserResponseDto getMemberInfo(String username, int guildId) {
        User user = userRepository.findByUsername(username).orElseThrow(UserNotFoundException::new);

        return UserResponseDto.from(user);
    }

    @Override
    public GuildResponseDto createGuild(GuildCreateDto data) {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        Guild guild = Guild.builder()
                .guildName(data.getName())
                .master(user.getUserId())
                .description(data.getDescription())
                .build();
        Guild guild1 = guildRepository.save(guild);
        user.joinGuild(guild1);
        userRepository.flush();
        guild1.getMembers().add(user);
        System.out.println(guild1.getId());
        System.out.println(guild1.getMembers());
        return GuildResponseDto.from(guild1);


    }

    @Override
//    내가 마스터인 길드 삭제
    public void deleteGuild(int guild_id) {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        int userId = user.getUserId();
        Guild guild = guildRepository.findById(guild_id).orElseThrow(GuildNotFoundException::new);
        int master = guild.getMaster();

        if (userId != master){
            throw new NotMasterException();
        }
        else if (guild.getMembers().size() > 1){
            throw new LeftMemberExistException();
        }

        else {
            user.joinGuild(null);
            guildRepository.delete(guild);
        }

    }

//  길드에서 멤버 추방
    @Override
    public Void deleteMember(int userId) {
        return null;
    }
}
