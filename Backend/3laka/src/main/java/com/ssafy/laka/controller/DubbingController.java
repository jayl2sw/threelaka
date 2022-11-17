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
@RequestMapping("/api/v1/dubbing")
public class DubbingController {

    @GetMapping("")
    @ApiOperation(value = "더빙 영상 목록 조회", notes = "모든 더빙 영상 리스트를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> getVideos(){
        // 영상 리스트 제공
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/{dubbing_id}")
    @ApiOperation(value = "더빙 영상 조회", notes = "특정 더빙 영상 정보를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> getVideoInfo(){
        // 더빙 영상 디테일 제공
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping("")
    @ApiOperation(value = "더빙 영상 업로드", notes = "새로운 더빙 영상을 추가한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> addVideo(){
        // 더빙 영상 추가
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/search/{keyword}")
    @ApiOperation(value = "더빙 영상 검색", notes = "해당 키워드로 더빙 영상을 검색하여 리스트를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> searchVideos(){
        // 키워드로 더빙 영상 검색
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping("/comment/{dubbing_id}")
    @ApiOperation(value = "더빙 영상 댓글 작성", notes = "해당 더빙 영상에 댓글을 추가한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> writeComment(){
        // 더빙 영상 댓글 쓰기
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PutMapping("/comment/{comment_id}")
    @ApiOperation(value = "더빙 영상 댓글 수정", notes = "해당 댓글을 수정한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> updateComment(){
        // 더빙 영상 댓글 수정
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @DeleteMapping("/comment/{dubbing_id}")
    @ApiOperation(value = "더빙 영상 댓글 삭제", notes = "해당 댓글을 삭제한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> deleteComment(){
        // 더빙 영상 댓글 삭제
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping("/like/{dubbing_id}")
    @ApiOperation(value = "더빙 영상 좋아요/취소", notes = "해당 더빙 영상에 좋아요를 추가하거나 제거한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> like(){
        // 더빙 영상 좋아요/취소
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

}
