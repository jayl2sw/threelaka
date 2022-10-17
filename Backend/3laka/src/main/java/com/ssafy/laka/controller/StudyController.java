package com.ssafy.laka.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/study")
public class StudyController {

    @PostMapping("")
    @ApiOperation(value = "비디오 조회", notes = "링크에 해당하는 비디오를 조회하여 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> getVideo(){
        // 링크 입력하면 DB 확인 후 없으면 데이터 저장, 있으면 불러온다.
        // Video Dto + 시청 기록 Dto 반환
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("")
    @ApiOperation(value = "나중에 볼 영상 추가", notes = "회원의 나중에 볼 영상에 해당 영상을 추가한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> addVideo(){
        // 나중에 볼 영상 추가
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping("/wordlist")
    @ApiOperation(value = "단어 추가", notes = "특정 회원의 특정 강의에 해당 단어를 추가한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> addWord(){
        // 단어장에 단어 하나 추가해줌
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/wordlist/{video_id}")
    @ApiOperation(value = "강의 단어장 조회", notes = "특정 회원 / 특정 강의의 단어 리스트를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> getWords(){
        // 해당 강좌의 단어장 불러오기
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/essay/download")
    @ApiOperation(value = "에세이 저장", notes = "특정 회원 / 특정 강의의 에세이를 저장한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> saveEssay(){
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
