package com.ssafy.laka.controller;

import com.ssafy.laka.dto.study.VideoResponseDto;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/study")
public class StudyController {

    @PostMapping("/video")
    @ApiOperation(value = "비디오 조회", notes = "링크에 해당하는 비디오를 조회하여 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<VideoResponseDto> getVideo(){
        // 링크 입력하면 DB 확인 후 없으면 데이터 저장, 있으면 불러온다.
        // Video Dto + 시청 기록 Dto 반환
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping("/video/latest")
    @ApiOperation(value = "가장 최근에 공부한 영상 조회", notes = "가장 최근에 공부한 영상 VideoResponseDto 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<VideoResponseDto> getRecentVideo(){

        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping("/video/wish")
    @ApiOperation(value = "나중에 볼 영상 추가", notes = "회원의 나중에 볼 영상에 해당 영상을 추가한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> addWishVideo(){
        // 나중에 볼 영상 추가
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping("/video/search")
    @ApiOperation(value = "나중에 볼 영상 추가", notes = "회원의 나중에 볼 영상에 해당 영상을 추가한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> searchVideos(){
        // 나중에 볼 영상 추가
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping("/word")
    @ApiOperation(value = "단어 추가", notes = "특정 회원의 특정 강의에 해당 단어를 추가한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> addWord(){
        // 단어장에 단어 하나 추가해줌
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping("/word/search")
    @ApiOperation(value = "단어 검색", notes = "단어 검색, 내 딕셔너리에 없으면 콜린스 api로 받아서 추가하고 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> searchWord(){
        // 단어장에 단어 하나 추가해줌
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/word/{video_id}")
    @ApiOperation(value = "강의 단어장 조회", notes = "특정 회원 / 특정 강의의 단어 리스트를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> getWords(
            @PathVariable String video_id){
        // 해당 강좌의 단어장 불러오기
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping("/word/myword")
    @ApiOperation(value = "커스텀 단어 추가", notes = "특정 회원의 특정 강의에 해당 커스텀 단어를 추가한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> addCustomWord(){
        // 단어장에 커스텀 단어 하나 추가해줌
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/essay")
    @ApiOperation(value = "에세이 저장", notes = "특정 회원 / 특정 강의의 에세이를 저장한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> saveEssay(){
        // 에세이 저장
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/essay/download")
    @ApiOperation(value = "에세이 다운로드", notes = "특정 회원 / 특정 강의의 에세이를 저장한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> downloadEssay(){
        // 에세이 저장
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping("/complete")
    @ApiOperation(value = "학습 스테이지 업데이트", notes = "해당 학습 아이디를 가지는 학습의 스테이지를 해당 값으로 업데이트한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> updateCompletedStage(){
        // 에세이 저장
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

}
