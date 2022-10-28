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
    public ResponseEntity<?> deleteGuild(@PathVariable int guildId){
        guildService.deleteGuild(guildId);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @GetMapping("/request/{guildId}")
    @ApiOperation(value = "내가 마스터인 길드 가입 요청 조회")
    public ResponseEntity <List<JoinRequestDto>>  getJoinReqList(@PathVariable int guildId) {
        List RequestLists = guildService.getJoinReqList(guildId);
        if (RequestLists.size() < 1) {
            throw new RequestListEmptyException();
        }
        return new ResponseEntity<>(guildService.getJoinReqList(guildId), HttpStatus.OK);
    }

    @PostMapping("/request")
    @ApiOperation(value = "길드 가입 요청")
    public ResponseEntity<?> joinGuild(@RequestBody int guildId){
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
    public ResponseEntity<String> UpdateGuild(String description, int guildId){
        guildService.setDescription(description, guildId);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @DeleteMapping("/user/guild/quit/{guildId}")
    @ApiOperation(value = "내가 가입한 길드 탈퇴")
    public ResponseEntity<String> quitGuild(@PathVariable int guildId){
        guildService.quitGuild(guildId);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @DeleteMapping("/user/guild/remove/{userId}")
    @ApiOperation(value = "마스터의 멤버 추방")
    public ResponseEntity<String> DeleteMember(@PathVariable int userId){
        guildService.deleteMember(userId);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @PostMapping("/user/guild/notice/{guildId}")
    @ApiOperation(value = "내가 마스터인 길드 공지 생성")
    public ResponseEntity<NoticeResponseDto> createNotice (@PathVariable int guildId, String notice){
        return new ResponseEntity<>(guildService.createNotice(guildId, notice), HttpStatus.OK);
    }

    @GetMapping("/user/guild/notice/{guildId}")
    @ApiOperation(value = "길드 멤버의 길드 공지 조회")
    public ResponseEntity<NoticeResponseDto> GetNotice (@PathVariable int guildId){
        return new ResponseEntity<>(guildService.getNotice(guildId), HttpStatus.OK);
    }

    @DeleteMapping("/user/guild/notice/{guildId}")
    @ApiOperation(value = "길드 마스터의 길드 공지 삭제")
    public ResponseEntity<String> DeleteNotice (@PathVariable int guildId){
        guildService.deleteNotice(guildId);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @PutMapping("/user/guild/notice/{guildId}")
    @ApiOperation(value = "길드 마스터의 길드 공지 수정")
    public ResponseEntity<NoticeResponseDto> UpdateNotice (@PathVariable int guildId, String notice){
        return new ResponseEntity<>(guildService.UpdateNotice(guildId, notice), HttpStatus.OK);
    }

    @PostMapping("/user/guild/master/{userId}")
    @ApiOperation(value = "길드 마스터 변경")
    public ResponseEntity<String> ChangeMaster (@PathVariable int userId){
        guildService.changeMaster(userId);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }


}
