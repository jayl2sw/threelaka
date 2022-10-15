package com.ssafy.laka.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/dashboard")
public class DashboardController {

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
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> getDailyWords(){
        // 단어장에서 몇개 뽑아서 오늘의 단어 반환
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/playing")
    @ApiOperation(value = "현재 공부 중인 영상 조회", notes = "회원이 현재 공부를 완료하지 못한 영상 리스트를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> getPlayingList(){
        // 현재 공부중인 영상 리스트 반환
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/time")
    @ApiOperation(value = "최근 학습량 및 영상수 조회", notes = "회원이 최근 학습한 양과 영상의 수를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> getTime(){
        // 최근 몇 주간 학습량, 영상 개수 (목업에서 더 자세히 살펴보기)
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/calendar")
    @ApiOperation(value = "캘린더 조회", notes = "회원의 캘린더 관련 정보를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> getCalendarInfo(){
        // 캘린더에 필요한 데이터 제공 (얘도 목업 참고)
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

    @GetMapping("/history")
    @ApiOperation(value = "학습 히스토리 데이터 조회", notes = "회원의 학습 히스토리 데이터를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> getHistory(){
        // 학습 히스토리를 한눈에 확인할 수 있는 데이터 제공 (얘도 목업 참고)
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PutMapping("/tag")
    @ApiOperation(value = "관심 태그 수정", notes = "회원의 관심 태그를 수정한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> changeTag(){
        // 관심 태그 수정
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
