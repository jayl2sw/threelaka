package com.ssafy.laka.service;

import com.ssafy.laka.domain.*;
import com.ssafy.laka.domain.enums.State;
import com.ssafy.laka.dto.exception.guild.*;
import com.ssafy.laka.dto.exception.user.UserNotFoundException;
import com.ssafy.laka.dto.guild.*;
import com.ssafy.laka.dto.user.UserResponseDto;
import com.ssafy.laka.repository.*;
import com.ssafy.laka.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class GuildServiceImpl implements GuildService{
    private final UserRepository userRepository;
    private final GuildRepository guildRepository;
    private final JoinRequestRepository joinRequestRepository;
    private final AssignmentRepository assignmentRepository;
    private final LearningRecordRepository learningRecordRepository;
    private final GuildRepositorySupport guildRepositorySupport;

    @Override
//    길드 가입 요청
    public void joinGuild(int guildId) {
        User me = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        Guild guild = guildRepository.findById(guildId).orElseThrow(GuildNotFoundException::new);
        Optional<JoinRequest> joinRequest = joinRequestRepository.findByGuildAndSenderAndState(guild, me, State.pending);

        if (me.getGuild() != null){
            throw new AlreadyInGuildException();
        }

        else if (joinRequest.isPresent()){
            throw new DuplicateRequestException();
        }
        joinRequestRepository.save(JoinRequest.builder().sender(me).guild(guild).state(State.pending).build());


    }

    @Override
    public List<JoinRequestDto> getJoinReqList(int guildId) {
        User me = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        int myId = me.getUserId();

        Guild guild = guildRepository.findById(guildId).orElseThrow(GuildNotFoundException::new);
        int masterId = guild.getMaster();

        if (myId != masterId) {
            throw new NotMasterException();
        }
        else{
            List<JoinRequestDto> joinReqList = joinRequestRepository.findByGuildIdAndState(guild.getId(), State.pending);


            return joinReqList;

        }


    }

    @Override
//    길드 가입 요청 수락
    public void acceptGuild(int requestId) {
        JoinRequest joinRequest = joinRequestRepository.findById(requestId).orElseThrow(RequestNotFoundException::new);
        System.out.println("joinRequest" + joinRequest);

        User me = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        int masterId = joinRequest.getGuild().getMaster();

        if (me.getUserId() != masterId) {
            throw new NotMasterException();
        }
        joinRequest.setState(State.accepted);
        Guild guild = guildRepository.findByMaster(masterId).orElseThrow(GuildNotFoundException::new);


        User sender = userRepository.findById(joinRequest.getSender().getUserId()).orElseThrow(UserNotFoundException::new);
        sender.joinGuild(guild);
        guild.getMembers().add(joinRequest.getSender());
        guildRepository.flush();
        System.out.println(guild);

    }

    @Override
//    길드 가입 요청 거절
    public void rejectGuild(int requestId) {
        JoinRequest joinRequest = joinRequestRepository.findById(requestId).orElseThrow(RequestNotFoundException::new);
        System.out.println("joinRequest" + joinRequest);

        User me = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        int masterId = joinRequest.getGuild().getMaster();

        if (me.getUserId() != masterId) {
            throw new NotMasterException();
        }
        joinRequest.setState(State.rejected);

    }

    @Override
    public List<UserResponseDto> getMemberDetail() {
        return null;
    }

    @Override
    public GuildResponseDto searchGuild(int guildId) {
        Guild guild = guildRepository.findById(guildId).orElseThrow(GuildNotFoundException::new);
        User master = userRepository.findById(guild.getMaster()).orElseThrow(UserNotFoundException::new);

        return GuildResponseDto.from(guild, master.getNickname());
    }

    @Override
    public MemberResponseDto searchMembers(int guildId) {
        Guild guild = guildRepository.findById(guildId).orElseThrow(GuildNotFoundException::new);
        return MemberResponseDto.from(guild);
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
//이미 소속된 길드가 있다면 에러 반환
//        System.out.println("================");
//        System.out.println(user.getGuild().getId());
//        System.out.println("================");
        if (user.getGuild() != null){
            throw new AlreadyInGuildException();
        }
        if (guildRepository.findByGuildName(data.getName()).isPresent()) {
            throw new DuplicateGuildNameException();
        }
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
        return GuildResponseDto.from(guild1, user.getNickname());


    }

    @Override
    public void setDescription(String description, int guildId){
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        int userGuild = user.getUserId();
        System.out.println("userGuild  " + userGuild);

        if (user.getGuild() == null){
            throw new NotInGuildException();
        };
        Guild guild = guildRepository.findById(user.getGuild().getId()).orElseThrow(GuildNotFoundException::new);
        System.out.println("guildMasterId  " + guild.getMaster());

        if (userGuild != guild.getMaster()){
            throw new NotMasterException();
        }

        guild.setDescription(description);
        guildRepository.save(guild);
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
    public void deleteMember(int userId) {
        User me = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
//        로그인 한 유저의 길드 마스터 ID
        int myMasterId = me.getGuild().getMaster();
//        추방하려는 유저의 길드 마스터 ID
        User member = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        int memberMasterId = member.getGuild().getMaster();

        if (me.getUserId() != myMasterId){
            throw new NotMasterException();
        }
        if (myMasterId != memberMasterId){
            throw new NotGuildMemberException();
        }

        member.joinGuild(null);
    }
    @Override
    public void quitGuild(int guildId){
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        Guild guild = guildRepository.findById(guildId).orElseThrow(GuildNotFoundException::new);

        if (user.getUserId() == guild.getMaster()){
            throw new GuildMasterException();

        }
        if (user.getGuild() == null){
            throw new NotInGuildException();
        }

        if (guildId != user.getGuild().getId()){
            throw new NotMyGuildException();
        }
        user.joinGuild(null);
    }

    @Override
    public NoticeResponseDto createNotice(int guildId, String notice) {
        Guild guild = guildRepository.findById(guildId).orElseThrow(GuildNotFoundException::new);
        guild.setNotice(notice);
        guildRepository.save(guild);
        int masterId = guild.getMaster();

        User me = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        if (me.getUserId() != masterId){
            throw new NotMasterException();
        };

        return NoticeResponseDto.from(guild);
    }

    @Override
    public NoticeResponseDto getNotice(int guildId) {
        Guild guild = guildRepository.findById(guildId).orElseThrow(GuildNotFoundException::new);
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        if (!guild.getMembers().contains(user)){
            throw new NotMyGuildException();
        }
        return NoticeResponseDto.from(guild);

    }

    @Override
    public void deleteNotice(int guildId) {
        Guild guild = guildRepository.findById(guildId).orElseThrow(GuildNotFoundException::new);
User me = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        if (me.getUserId() != guild.getMaster()){
            throw new NotMasterException();
        };

        guild.setNotice(null);
        guildRepository.save(guild);
    }

    @Override
    public NoticeResponseDto UpdateNotice(int guildId, String notice) {
        Guild guild = guildRepository.findById(guildId).orElseThrow(GuildNotFoundException::new);
        guild.setNotice(notice);
        guildRepository.save(guild);
        int masterId = guild.getMaster();

        User me = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        if (me.getUserId() != masterId){
            throw new NotMasterException();
        };

        return NoticeResponseDto.from(guild);
    }

    @Override
    public void changeMaster(int userId) {
        User me = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);

        User member = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        Guild myGuild = me.getGuild();
//        내가 멤버가 속한 길드의 마스터가 아닐 경우
        if (me.getUserId() != member.getGuild().getMaster()){
            throw new NotMasterException();
        }
//        내 길드에 해당 멤버가 없을 경우
        if (!me.getGuild().getMembers().contains(member)){
            throw new NotGuildMemberException();
        }

        myGuild.setMaster(userId);


    }

    @Override
    public List<GuildRankDto> getRankGuild() {
        return guildRepository.findRankingGuilds().stream().map(s -> GuildRankDto.from(s)).collect(Collectors.toList());
    }

    @Override
    public List<GuildRequestDto> getMyRequests() {
        User me = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        return joinRequestRepository.findAllBySenderAndStateNot(me, State.accepted)
                .stream().map(s -> new GuildRequestDto(s.getGuild().getGuildName(), s.getState())).collect(Collectors.toList());
    }

    @Override
    public List<Guild> searchGuilds(GuildSearchDto guildSearchDto) {
        // 쿼리 장인 도움 필요
        return guildRepositorySupport.findGuildsByConditions(guildSearchDto);
    }

    @Override
    public List<Assignment> getAssignments(int status) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        String today = formatter.format(date);
        switch (status) {
            case 0:
                return assignmentRepository.findAllByStartDateAfter(today);
            case 1:
                return assignmentRepository.findAllByStartDateBeforeAndEndDateAfter(today, today);
            case 2:
                return assignmentRepository.findAllByEndDateBefore(today);
            default:
                return null;
        }
    }

    @Override
    public List<?> getProgress(int assignmentId) {
//        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        Date date = new Date();
//        String today = formatter.format(date);
//        Assignment assignment = assignmentRepository.findById(assignmentId).orElseThrow();
//        List<User> members = assignment.getGuild().getMembers();
//        for (int i = 0; i < members.size(); i++) {
//            learningRecordRepository.findTop1ByVideoAndAndUserAndModifiedDateAfterOrderByModifiedDateDesc(assignment.getVideo(), members.get(i), today);
//        }
        return null;
    }
}
