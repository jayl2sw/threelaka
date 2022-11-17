package com.ssafy.laka.service;

import com.ssafy.laka.domain.*;
import com.ssafy.laka.domain.enums.Role;
import com.ssafy.laka.domain.enums.State;
import com.ssafy.laka.dto.exception.guild.*;
import com.ssafy.laka.dto.exception.study.VideoNotFoundException;
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
    private final VideoRepository videoRepository;

    @Override
//    길드 가입 요청
    public void joinGuild(int guildId) {
        User me = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        Guild guild = guildRepository.findById(guildId).orElseThrow(GuildNotFoundException::new);
        Optional<JoinRequest> joinRequest = joinRequestRepository.findByGuildAndSenderAndState(guild, me, State.pending);
        if (me.getGuild() != null){
            throw new AlreadyInGuildException();
        } else if (joinRequest.isPresent()){
            throw new DuplicateRequestException();
        } else if (guild.getMembers().size() > 20) {
            throw new GuildExcessException();
        }
        joinRequestRepository.save(JoinRequest.builder().sender(me).guild(guild).state(State.pending).build());
    }

    @Override
    public List<JoinRequestDto> getJoinReqList() {
        User me = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        List<JoinRequestDto> joinReqList = joinRequestRepository.findByGuildIdAndState(me.getGuild().getId(), State.pending);
        return joinReqList;
    }

    @Override
//    길드 가입 요청 수락
    public void acceptGuild(int requestId) {
        JoinRequest joinRequest = joinRequestRepository.findById(requestId).orElseThrow(RequestNotFoundException::new);
        User me = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        int masterId = joinRequest.getGuild().getMaster();
        if (me.getUserId() != masterId) {
            throw new NotMasterException();
        } else if (joinRequest.getGuild().getMembers().size() > 20) {
            throw new GuildExcessException();
        }
        joinRequest.setState(State.accepted);
        Guild guild = guildRepository.findByMaster(masterId).orElseThrow(GuildNotFoundException::new);
        User sender = userRepository.findById(joinRequest.getSender().getUserId()).orElseThrow(UserNotFoundException::new);
        sender.joinGuild(guild);
        guild.getMembers().add(joinRequest.getSender());
        guildRepository.flush();

//        해당 유저가 보낸 모든 가입 요청들 삭제
        List<JoinRequest> AllRequests = joinRequestRepository.findAllBySender(sender);
        for (int i = 0; i < AllRequests.size(); i ++){
            if (AllRequests.get(i).getRequestId() == joinRequest.getRequestId()){
                continue;
            }
            else {
                joinRequestRepository.delete(AllRequests.get(i));
                joinRequestRepository.flush();
            }

        }

//        해당 유저에게 alert 보냄
    }

    @Override
//    길드 가입 요청 거절
    public void rejectGuild(int requestId) {
        JoinRequest joinRequest = joinRequestRepository.findById(requestId).orElseThrow(RequestNotFoundException::new);
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
        user.be(Role.ROLE_GUILD_MASTER);
        userRepository.flush();
        guild1.getMembers().add(user);
        return GuildResponseDto.from(guild1, user.getNickname());
    }

    @Override
    public void setDescription(String description){
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        int userGuild = user.getUserId();
        Guild guild = guildRepository.findById(user.getGuild().getId()).orElseThrow(GuildNotFoundException::new);
        if (userGuild != guild.getMaster()){
            throw new NotMasterException();
        }
        guild.setDescription(description);
        guildRepository.save(guild);
    }

    @Override
//    내가 마스터인 길드 삭제
    public void deleteGuild() {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        Guild guild = user.getGuild();
        if (guild.getMembers().size() > 1){
            throw new LeftMemberExistException();
        }
        else {
            user.joinGuild(null);
            user.be(Role.ROLE_USER);
            guildRepository.delete(guild);
        }
    }

//  길드에서 멤버 추방
    @Override
    public void deleteMember(int userId) {
        User me = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        User member = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        int memberMasterId = member.getGuild().getMaster();
        if (me.getUserId() != memberMasterId){
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
    public NoticeResponseDto createNotice(String notice) {
        User me = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        Guild guild = me.getGuild();
        guild.setNotice(notice);
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
    public void deleteNotice() {
        User me = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        Guild guild = me.getGuild();
        guild.setNotice(null);
        guildRepository.save(guild);
    }

    @Override
    public NoticeResponseDto updateNotice(String notice) {
        User me = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        Guild guild = me.getGuild();
        guild.setNotice(notice);
        guildRepository.save(guild);
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
        me.be(Role.ROLE_USER);
        member.be(Role.ROLE_GUILD_MASTER);
    }

    @Override
    public List<GuildRankDto> getRankGuild() {
        return guildRepository.findRanking3Guilds().stream().map(s -> GuildRankDto.from(s)).collect(Collectors.toList());
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
    public List<AssignmentResponseDto> getAssignments(int status) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        String today = formatter.format(date);
        switch (status) {
            case 0:
                return assignmentRepository.findAllByStartDateAfterOrderByEndDateDesc(today)
                        .stream().map(s -> AssignmentResponseDto.from(s)).collect(Collectors.toList());
            case 1:
                return assignmentRepository.findAllByStartDateBeforeAndEndDateAfterOrderByEndDateDesc(today, today)
                        .stream().map(s -> AssignmentResponseDto.from(s)).collect(Collectors.toList());
            case 2:
                return assignmentRepository.findAllByEndDateBeforeOrderByEndDateDesc(today)
                        .stream().map(s -> AssignmentResponseDto.from(s)).collect(Collectors.toList());
            default:
                return null;
        }
    }

    @Override
    public List<ProgressInterface> getProgress(int assignmentId) {
        Assignment assignment = assignmentRepository.findById(assignmentId).orElseThrow(AssignmentNotFoundException::new);
        return learningRecordRepository.findProgress(assignment.getGuild().getId(), assignment.getVideo().getVideoId(), assignment.getStartDate(), assignment.getEndDate());
    }

    @Override
    public List<GuildOrderResponseDto> getGuildOrderActivity() {
        return guildRepository.findRankingGuilds().stream().map(s -> GuildOrderResponseDto.from(s, userRepository.findById(s.getMaster()).orElseThrow(UserNotFoundException::new).getNickname())).collect(Collectors.toList());
    }

    @Override
    public List<GuildOrderResponseDto> getGuildOrderName() {
        return guildRepository.findAllByOrderByGuildName().stream().map(s -> GuildOrderResponseDto.from(s, userRepository.findById(s.getMaster()).orElseThrow(UserNotFoundException::new).getNickname())).collect(Collectors.toList());
    }

    @Override
    public List<GuildOrderResponseDto> getGuildOrderSize() {
        return guildRepository.findAllByOrderByGuildSize().stream().map(s -> GuildOrderResponseDto.from(s, userRepository.findById(s.getMaster()).orElseThrow(UserNotFoundException::new).getNickname())).collect(Collectors.toList());
    }

    @Override
    public List<GoodMemberInterface> getGoodMembers(int guildId) {
        return userRepository.findGoodMembers(guildId);
    }

    @Override
    public List<EssayDto> getEssayForVideo(String videoId) {
        User me = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        Video video = videoRepository.findById(videoId).orElseThrow(VideoNotFoundException::new);
        return learningRecordRepository.findAllByUserAndVideoOrderByModifiedDateDesc(me, video)
                .stream().map(s -> EssayDto.from(s)).collect(Collectors.toList());
    }

    @Override
    public String createAssignment(AssignmentRequestDto info) {
        User me = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        Assignment assignment = Assignment.builder()
                .video(videoRepository.findById(info.getVideoId()).orElseThrow(VideoNotFoundException::new))
                .guild(guildRepository.findById(me.getGuild().getId()).orElseThrow(GuildNotFoundException::new))
                .startDate(info.getStartDate())
                .endDate(info.getEndDate())
                .build();
        assignmentRepository.save(assignment);
        return "SUCCESS";
    }

    @Override
    public String updateAssignment(AssignmentUpdateRequestDto info) {
        Assignment assignment = assignmentRepository.findById(info.getAssignmentId()).orElseThrow(AssignmentNotFoundException::new);
        Assignment newAssignment = Assignment.builder()
                .assignmentId(assignment.getAssignmentId())
                .video(videoRepository.findById(info.getVideoId()).orElseThrow(VideoNotFoundException::new))
                .guild(guildRepository.findById(info.getGuildId()).orElseThrow(GuildNotFoundException::new))
                .startDate(info.getStartDate())
                .endDate(info.getEndDate())
                .build();
        assignmentRepository.save(newAssignment);
        return "SUCCESS";
    }

    @Override
    public String deleteAssignment(int assignmentId) {
        Assignment assignment = assignmentRepository.findById(assignmentId).orElseThrow(AssignmentNotFoundException::new);
        assignmentRepository.delete(assignment);
        return "SUCCESS";
    }

    @Override
    public void updateProfile(int guildId, String profileId) {
        Guild guild = guildRepository.findById(guildId).orElseThrow(GuildNotFoundException::new);
        guild.changeProfile(profileId);
    }
}
