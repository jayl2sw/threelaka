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
@RequestMapping("/api/v1/admin")
public class AdminController {

    @GetMapping("/user")
    @ApiOperation(value = "회원 목록 조회", notes = "모든 회원의 목록을 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> getUsers(){
        // 회원 목록 조회
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/user/{user_id}")
    @ApiOperation(value = "회원 정보 조회", notes = "특정 회원의 상세 정보를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> getUserInfo(){
        // 회원 정보 반환
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @DeleteMapping("/user/{user_id}")
    @ApiOperation(value = "회원 강제 탈퇴", notes = "특정 회원을 강제로 탈퇴시킨다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> quit(){
        // 회원 삭제
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/stat/view")
    @ApiOperation(value = "영상별 조회수 통계", notes = "조회수에 대한 통계 자료를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> getViewAnalysis(){
        // 영상 조회수 통계 자료 (얘는 나중에 더 얘기해봐야할 듯)
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/stat/visit")
    @ApiOperation(value = "태그 인기 순위 조회", notes = "태그에 대한 통계 자료를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> getTagAnalysis(){
        // 태그 통계 자료 (얘도 더)
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/stat/search")
    @ApiOperation(value = "검색 순위 조회", notes = "검색에 대한 통계 자료를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> getLikes(){
        // 나중에 공부할 영상 리스트 반환
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

}
