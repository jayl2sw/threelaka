package com.ssafy.laka.controller;

import com.ssafy.laka.dto.dashboard.HistoryNumDto;
import com.ssafy.laka.dto.dashboard.PlayingVideoDto;
import com.ssafy.laka.dto.dashboard.TodayWordDto;
import com.ssafy.laka.service.DashboardService;
import com.ssafy.laka.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/profile")
    @ApiOperation(value = "회원 정보 조회", notes = "회원의 프로필 관련 정보를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> getUserInfo(){
        // 사용자 프로필 관련 Dto 싹다 보내줌
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/dailywords")
    @ApiOperation(value = "오늘의 단어 조회", notes = "회원의 단어장 중 외우지 못한 단어를 랜덤하게 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = TodayWordDto.class)
    })
    public ResponseEntity<List<TodayWordDto>> getDailyWords(){
        // 제일 최근 영상의 단어장에서 몇개 뽑아서 오늘의 단어 다섯 개 반환
        return new ResponseEntity<>(dashboardService.getRandomWords(), HttpStatus.OK);
    }

    @GetMapping("/playing")
    @ApiOperation(value = "현재 공부 중인 영상 조회", notes = "회원이 현재 공부를 완료하지 못한 영상 리스트를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = PlayingVideoDto.class)
    })
    public ResponseEntity<PlayingVideoDto> getPlayingList(){
        // 현재 공부중인 영상 리스트 반환
        return new ResponseEntity<>(dashboardService.getPlayingList(), HttpStatus.OK);
    }

    @GetMapping("/history")
    @ApiOperation(value = "최근 학습량 및 영상수 조회", notes = "회원이 최근 학습한 양과 영상의 수를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = HistoryNumDto.class)
    })
    public ResponseEntity<HistoryNumDto> getHistory(){
        // 지금까지 전체 공부한 양 반환 (공부 완료 비디오, 에세이, 단어 수)
        return new ResponseEntity<>(dashboardService.getHistory(), HttpStatus.OK);
    }

    @GetMapping("/calendar")
    @ApiOperation(value = "캘린더 조회", notes = "회원의 캘린더 관련 정보를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> getCalendarInfo(){
        // 이번 달 학습량 반환 (List<Study> 이번달)
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/liked")
    @ApiOperation(value = "나중에 볼 영상 조회", notes = "회원의 나중에 볼 영상 리스트를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> getLikes(){
        // 나중에 공부할 영상 리스트 반환
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/done")
    @ApiOperation(value = "학습 히스토리 데이터 조회", notes = "회원의 학습 히스토리 데이터를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> getDone(){
        // 지금까지 공부한 영상 리스트 반환
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PutMapping("/tag")
    @ApiOperation(value = "관심 태그 수정", notes = "회원의 관심 태그를 수정한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> changeTag(){
        // 관심 태그 수정 (최대 3개)
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PutMapping("/profile")
    @ApiOperation(value = "프로필 사진 수정", notes = "회원의 프로필 사진을 수정한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> changeProfile(){
        // 프로필 사진 수정
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

}
