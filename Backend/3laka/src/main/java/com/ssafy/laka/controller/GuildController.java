package com.ssafy.laka.controller;

import com.ssafy.laka.dto.exception.guild.RequestListEmptyException;
import com.ssafy.laka.dto.exception.guild.RequestNotFoundException;
import com.ssafy.laka.dto.guild.*;
import com.ssafy.laka.dto.user.UserResponseDto;
import com.ssafy.laka.service.GuildService;
import com.ssafy.laka.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user/guild")
public class GuildController {
    private final GuildService guildService;
    private final UserService userService;
    @PostMapping("")
    @ApiOperation(value = "길드 생성")
    public ResponseEntity<GuildResponseDto> createGuild(@RequestBody GuildCreateDto data){
        return new ResponseEntity<>(guildService.createGuild(data), HttpStatus.OK);
    }

    @DeleteMapping("/{guildId}")
    @ApiOperation(value = "내가 마스터인 길드 삭제")
    public ResponseEntity<String> deleteGuild(@PathVariable int guildId){
        guildService.deleteGuild(guildId);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @GetMapping("/request/{guildId}")
    @ApiOperation(value = "내가 마스터인 길드 가입 요청 조회")
    public ResponseEntity <List<JoinRequestDto>> getJoinReqList(@PathVariable int guildId) {
        List RequestLists = guildService.getJoinReqList(guildId);
        if (RequestLists.size() < 1) {
            throw new RequestListEmptyException();
        }
        return new ResponseEntity<>(guildService.getJoinReqList(guildId), HttpStatus.OK);
    }

    @PostMapping("/request")
    @ApiOperation(value = "길드 가입 요청")
    public ResponseEntity<String> joinGuild(@RequestBody int guildId){
        guildService.joinGuild(guildId);
    return new ResponseEntity<>("SUCCESS", HttpStatus.OK);}

    @PutMapping("/accept")
    @ApiOperation(value = "길드 가입 요청 수락")
    public ResponseEntity<String> acceptGuild(@RequestBody int requestId){
        guildService.acceptGuild(requestId);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @DeleteMapping("/reject")
    @ApiOperation(value = "길드 가입 요청 거절")
    public ResponseEntity<String> rejectGuild(@RequestBody int requestId){
        guildService.rejectGuild(requestId);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @GetMapping("/search/{guildId}")
    @ApiOperation(value = "멤버 정보 제외한 길드 정보 조회")
    public ResponseEntity<GuildResponseDto> searchGuild(@PathVariable @RequestBody int guildId){
        return new ResponseEntity<>(guildService.searchGuild(guildId), HttpStatus.OK);

    }

    @GetMapping("/members/{guildId}")
    @ApiOperation(value = "길드의 멤버들 정보 조회")
    public ResponseEntity<MemberResponseDto> searchMembers(@PathVariable @RequestBody int guildId){
        return new ResponseEntity<>(guildService.searchMembers(guildId), HttpStatus.OK);

    }

    @PutMapping("/user/guild")
    @ApiOperation(value = "내가 마스터인 길드 정보 수정")
    public ResponseEntity<String> updateGuild(String description, int guildId){
        guildService.setDescription(description, guildId);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @DeleteMapping("/quit/{guildId}")
    @ApiOperation(value = "내가 가입한 길드 탈퇴")
    public ResponseEntity<String> quitGuild(@PathVariable int guildId){
        guildService.quitGuild(guildId);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @DeleteMapping("/remove/{userId}")
    @ApiOperation(value = "마스터의 멤버 추방")
    public ResponseEntity<String> deleteMember(@PathVariable int userId){
        guildService.deleteMember(userId);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @PostMapping("/notice/{guildId}")
    @ApiOperation(value = "내가 마스터인 길드 공지 생성")
    public ResponseEntity<NoticeResponseDto> createNotice(@PathVariable int guildId, String notice){
        return new ResponseEntity<>(guildService.createNotice(guildId, notice), HttpStatus.OK);
    }

    @GetMapping("/notice/{guildId}")
    @ApiOperation(value = "길드 멤버의 길드 공지 조회")
    public ResponseEntity<NoticeResponseDto> getNotice(@PathVariable int guildId){
        return new ResponseEntity<>(guildService.getNotice(guildId), HttpStatus.OK);
    }

    @DeleteMapping("/notice/{guildId}")
    @ApiOperation(value = "길드 마스터의 길드 공지 삭제")
    public ResponseEntity<String> deleteNotice(@PathVariable int guildId){
        guildService.deleteNotice(guildId);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @PutMapping("/notice/{guildId}")
    @ApiOperation(value = "길드 마스터의 길드 공지 수정")
    public ResponseEntity<NoticeResponseDto> updateNotice(@PathVariable int guildId, String notice){
        return new ResponseEntity<>(guildService.UpdateNotice(guildId, notice), HttpStatus.OK);
    }

    @PostMapping("/master/{userId}")
    @ApiOperation(value = "길드 마스터 변경")
    public ResponseEntity<String> changeMaster(@PathVariable int userId){
        guildService.changeMaster(userId);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    // 여기서부터 전부 반환값 협의 필요 =====================================================================================
    @GetMapping("/ranking")
    @ApiOperation(value = "상위 랭킹 길드 조회")
    public ResponseEntity<?> getRankGuild(){
        // 상위 3위 길드 조회 (반환값 형식 미정)
        return new ResponseEntity<>(guildService.getRankGuild(), HttpStatus.OK);
    }

    @GetMapping("/request")
    @ApiOperation(value = "나의 길드 요청 목록 조회")
    public ResponseEntity<?> getMyRequests(){
        // 로그인한 유저가 가입 요청한 길드의 리스트 조회
        return new ResponseEntity<>(guildService.getMyRequests(), HttpStatus.OK);
    }

    // 수정 필요 ========================================================================================================
    @GetMapping("/search")
    @ApiOperation(value = "조건에 맞는 길드 검색")
    public ResponseEntity<?> searchGuild(@RequestParam GuildSearchDto condition){
        // 키워드, 요일, 시작시각, 시간 등의 조건을 받아 해당 조건을 만족하는 길드 리스트 조회
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/assignment/{status}")
    @ApiOperation(value = "공통 과제 목록 조회")
    public ResponseEntity<?> getAssignments(int status){
        // 예정(0) / 진행중(1) / 완료된(2) 공통 과제 조회
        return new ResponseEntity<>(guildService.getAssignments(status), HttpStatus.OK);
    }

    @GetMapping("/{assignment_id}/progress")
    @ApiOperation(value = "해당 공통과제의 모든 길드원 진행도 조회")
    public ResponseEntity<?> getProgress(@PathVariable int assignment_id){
        // 해당 공통과제의 모든 길드원 진행도 조회 (반환값 형식에 길드원의 일부 유저정보 필요)
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/{assignment_id}/essay")
    @ApiOperation(value = "해당 공통과제의 모든 길드원 에세이 조회")
    public ResponseEntity<?> getEssay(@PathVariable int assignment_id){
        // 해당 공통과제의 모든 길드원 에세이 조회 (반환값 형식에 길드원의 일부 유저정보 필요)
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    // 길드 마스터 권한 한정 기능 ==========================================================================================
    @GetMapping("/auth/member")
    @ApiOperation(value = "길드원 목록 조회")
    public ResponseEntity<?> getMembers(){
        // 최근 학습일을 포함해야함
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping("/auth/assignment")
    @ApiOperation(value = "공통 과제 생성")
    public ResponseEntity<?> createAssignment(){
        // 공통 과제를 생성
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PutMapping("/auth/assignment")
    @ApiOperation(value = "공통 과제 수정")
    public ResponseEntity<?> updateAssignment(){
        // 공통 과제 수정
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @DeleteMapping("/auth/assignment/{assignment_id}")
    @ApiOperation(value = "공통 과제 삭제")
    public ResponseEntity<?> deleteAssignment(@PathVariable int assignment_id){
        // 공통 과제 삭제
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PutMapping("/auth/info")
    @ApiOperation(value = "길드 정보 수정")
    public ResponseEntity<?> updateGuildInfo(){
        // 길드 정보 수정 (길드 설명, 길드 스케줄, 길드명 등)
        return new ResponseEntity<>(null, HttpStatus.OK);
    }


}
