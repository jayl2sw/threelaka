package com.ssafy.laka.controller;

import com.ssafy.laka.dto.guild.GuildCreateDto;
import com.ssafy.laka.service.GuildService;
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
    @PostMapping("/request")
    @ApiOperation(value = "길드 가입 요청")
    public ResponseEntity<String> joinGuild(@RequestBody int guildId){
        guildService.joinGuild(guildId);
    return new ResponseEntity<>("SUCCESS", HttpStatus.OK);}

    @PostMapping("")
    @ApiOperation(value = "길드 생성")
    public ResponseEntity<String> createGuild(GuildCreateDto data){
        guildService.CreateGuild(data);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);

    }

}
