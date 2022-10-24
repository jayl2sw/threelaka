package com.ssafy.laka.controller;

import com.ssafy.laka.dto.guild.GuildCreateDto;
import com.ssafy.laka.dto.guild.GuildResponseDto;
import com.ssafy.laka.service.GuildService;
import com.ssafy.laka.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user/guild")
public class GuildController {
    private final GuildService guildService;
    private final UserService userService;
    @PostMapping("/request")
    @ApiOperation(value = "길드 가입 요청")
    public ResponseEntity<?> joinGuild(@RequestBody int guildId){
        guildService.joinGuild(guildId);
    return new ResponseEntity<>("SUCCESS", HttpStatus.OK);}

    @PostMapping("")
    @ApiOperation(value = "길드 생성")
    public ResponseEntity<GuildResponseDto> createGuild(@RequestBody GuildCreateDto data){
        return new ResponseEntity<>(guildService.createGuild(data), HttpStatus.OK);

    }

    @DeleteMapping("/{guild_id}")
    @ApiOperation(value = "내가 마스터인 길드 삭제")
    public ResponseEntity<?> deleteGuild(@PathVariable int guild_id){
        guildService.deleteGuild(guild_id);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);

    }
}
