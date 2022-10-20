package com.ssafy.laka.controller;

import com.ssafy.laka.dto.dashboard.*;
import com.ssafy.laka.service.DashboardService;
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

    // 아직 안함 =========================================================================================================
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
        // 제일 최근 영상의 단어장에서 안 외운 단어만 뽑아서 오늘의 단어 다섯 개 반환
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
    @ApiOperation(value = "학습량 지표 조회", notes = "회원이 학습완료한 비디오 수, 작성한 에세이 수, 추가한 단어 수를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = HistoryNumDto.class)
    })
    public ResponseEntity<HistoryNumDto> getHistory(){
        // 지금까지 전체 공부한 양 반환 (공부 완료 비디오, 에세이, 단어 수)
        return new ResponseEntity<>(dashboardService.getHistory(), HttpStatus.OK);
    }

    // 아직 안함 =========================================================================================================
    @GetMapping("/calendar")
    @ApiOperation(value = "캘린더 조회", notes = "회원의 캘린더 관련 정보를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> getCalendarInfo(){
        // 이번 달 학습한 날짜 반환(이거 스터디테이블에 createdate 생기면 할게요), 연속 출석일 수 (유저테이블에 있음)
        return new ResponseEntity<>(dashboardService.getCalendar(), HttpStatus.OK);
    }

    @GetMapping("/liked")
    @ApiOperation(value = "나중에 볼 영상 조회", notes = "회원의 나중에 볼 영상 리스트를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = VideoDto.class)
    })
    public ResponseEntity<List<VideoDto>> getLikes(){
        // 나중에 공부할 영상 리스트 반환
        return new ResponseEntity<>(dashboardService.getLikeVideos(), HttpStatus.OK);
    }

    @GetMapping("/done")
    @ApiOperation(value = "완료 학습 데이터 조회", notes = "현재까지 공부한 영상 리스트를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = VideoDto.class)
    })
    public ResponseEntity<List<VideoDto>> getDone(){
        // 지금까지 공부한 영상 리스트 반환
        return new ResponseEntity<>(dashboardService.getDoneVideos(), HttpStatus.OK);
    }

    // 아직 안함 =========================================================================================================
    @GetMapping("/data")
    @ApiOperation(value = "학습 히스토리 데이터 조회", notes = "회원의 일별/주별/월별 학습 데이터를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> getData(){
        // 회원의 일별/주별/월별 학습 데이터를 반환
        // 주별 : 월~오늘
        // 월별 : 1일~오늘 아마두
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    // 아직 안함 =========================================================================================================
    @PutMapping("/tag")
    @ApiOperation(value = "관심 태그 수정", notes = "회원의 관심 태그를 수정한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = String.class)
    })
    public ResponseEntity<String> changeTag(@RequestBody InterestTagReqeustDto interestTags){
        // 관심 태그 수정 (최대 3개)
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    // 아직 안함 =========================================================================================================
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
