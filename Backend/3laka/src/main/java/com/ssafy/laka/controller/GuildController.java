package com.ssafy.laka.controller;

import com.ssafy.laka.dto.exception.guild.RequestListEmptyException;
import com.ssafy.laka.dto.exception.guild.RequestNotFoundException;
import com.ssafy.laka.dto.guild.GuildCreateDto;
import com.ssafy.laka.dto.guild.GuildResponseDto;
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

    @DeleteMapping("/{guild_id}")
    @ApiOperation(value = "내가 마스터인 길드 삭제")
    public ResponseEntity<?> deleteGuild(@PathVariable int guildId){
        guildService.deleteGuild(guildId);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @GetMapping("/request/{guildId}")
    @ApiOperation(value = "내가 마스터인 길드 가입 요청 조회")
    public ResponseEntity <List<UserResponseDto>>  getJoinReqList(@PathVariable int guildId) {
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


}
