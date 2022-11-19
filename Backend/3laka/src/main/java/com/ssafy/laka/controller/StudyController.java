package com.ssafy.laka.controller;

import com.ssafy.laka.dto.study.*;
import com.ssafy.laka.service.StudyService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/study")
public class StudyController {

    private final StudyService studyService;

    @PostMapping("/video")
    @ApiOperation(value = "비디오 조회", notes = "링크에 해당하는 비디오를 조회하여 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<Map<String, Object>> getVideo(
            @RequestBody UrlRequestDto data
    ){
        // 링크 입력하면 DB 확인 후 없으면 데이터 저장, 있으면 불러온다.
        // Video Dto + 시청 기록 Dto 반환
        Map response = new HashMap();

        VideoResponseDto video = studyService.getVideo(data.getUrl());
        response.put("video", video);
        List<LearningRecordResponseDto> lrs = studyService.getLearningRecordsByVideo(video.getVideoId());
        if (lrs == null) {
            response.put("learning_record", null);
        } else {
            response.put("learning_record", lrs);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/start")
    @ApiOperation(value = "학습 시작", notes = "해당 비디오를 사용하여 학습을 시작한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<LearningRecordResponseDto> startLearning(
            @RequestBody VideoRequestDto data
    ){
        // 링크 입력하면 DB 확인 후 없으면 데이터 저장, 있으면 불러온다.
        // Video Dto + 시청 기록 Dto 반환

        return new ResponseEntity<>(studyService.startLearning(data.getVideoId()), HttpStatus.OK);
    }


    @GetMapping("/video/recommends")
    @ApiOperation(value = "추천 영상 조회", notes = "추천 영상 4개 전달")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> getRecommends(){

        return new ResponseEntity<>(studyService.getRecommends(), HttpStatus.OK);
    }

    @GetMapping("/video/recommends/tags")
    @ApiOperation(value = "추천 영상 조회", notes = "추천 영상 4개 전달")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> getRecommendsByTag(){

        return new ResponseEntity<>(studyService.getRecommendsList(), HttpStatus.OK);
    }
    @GetMapping("/video/latest")
    @ApiOperation(value = "가장 최근에 공부한 영상 조회", notes = "가장 최근에 공부한 영상 VideoResponseDto 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<List<RecentLearningRecordResponseDto>> getRecentVideo(){

        return new ResponseEntity<>(studyService.getRecentVideo(), HttpStatus.OK);
    }

    @GetMapping("/video/tags/{tagId}")
    @ApiOperation(value = "태그기반 필터링 조회", notes = "태그 기반 필터링 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> getVideosByTag(@PathVariable int tagId, int page){

        return new ResponseEntity<>(studyService.getVideosByTags(tagId, page), HttpStatus.OK);
    }

    @PostMapping("/video/wish")
    @ApiOperation(value = "나중에 볼 영상 추가", notes = "회원의 나중에 볼 영상에 해당 영상을 추가한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> addWishVideo(
            @RequestBody VideoRequestDto data
    ){
        // 나중에 볼 영상 추가
        studyService.addWish(data.getVideoId());
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @DeleteMapping("/video/wish")
    @ApiOperation(value = "나중에 볼 영상 제거", notes = "회원의 나중에 볼 영상에 해당 영상을 제거한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> deleteWishVideo(
            @RequestBody LikeVideoRequestDto data
    ){
        // 나중에 볼 영상 추가
        studyService.deleteWish(data.getLikeVideoId());
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @GetMapping("/video/{videoId}")
    @ApiOperation(value = "유저 단어장 조회", notes = "특정 회원의 단어 리스트를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<VideoDescriptionResponseDto> getVideoDescription(
            @PathVariable String videoId
    ){
        // 해당 강좌의 단어장 불러오기
        return new ResponseEntity<>(studyService.findVideoDescription(videoId), HttpStatus.OK);
    }

    @GetMapping("/video/search/{keyword}")
    @ApiOperation(value = "keyword로 영상 검색", notes = "keyword를 이용한 영상 검색")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> searchVideos(
            @PathVariable String keyword
    ){
        // 키워드로 영상 검색
        return new ResponseEntity<>(studyService.getVideosByKeyword(keyword), HttpStatus.OK);
    }

    @GetMapping("/user/essay")
    @ApiOperation(value = "유저의 에세이 검색", notes = "유저의 에세이 모두 검색")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> findUserEssays(){
        // 키워드로 영상 검색
        return new ResponseEntity<>(studyService.getEssays(), HttpStatus.OK);
    }

    @PostMapping("/word")
    @ApiOperation(value = "단어 추가", notes = "특정 회원의 특정 강의에 해당 단어를 추가한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> addWord(
            @RequestBody WordRequestDto data
    ) throws JSONException {
        // 단어장에 단어 하나 추가해줌
        studyService.addWord(data);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }
    @DeleteMapping("/word")
    @ApiOperation(value = "단어 제거", notes = "특정 회원의 특정 강의에 해당 단어를 제거한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> deleteWord(
            @RequestBody WordbookRequestDto data
    ){
        // 단어장에 단어 하나 삭제함
        studyService.deleteWord(data.getWordbookId());
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @DeleteMapping("/wordandexample")
    @ApiOperation(value = "단어 제거", notes = "특정 회원의 특정 강의에 해당 단어를 제거한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> deleteWordByWordAndExample(
            @RequestBody WordDeleteRequestDto data
    ){
        // 단어장에 단어랑 문장이 일치하는 단어 하나 삭제함
        studyService.deleteWordByWordAndSentence(data.getWord(), data.getExample());
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @GetMapping("/word/{lr_id}")
    @ApiOperation(value = "강의 단어장 조회", notes = "특정 회원 / 특정 강의의 단어 리스트를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<List<WordbookResponseDto>> getWords(
            @PathVariable int lr_id){
        // 해당 강좌의 단어장 불러오기
        return new ResponseEntity<>(studyService.getWordbooksById(lr_id), HttpStatus.OK);
    }

    @GetMapping("/word/user")
    @ApiOperation(value = "유저 단어장 조회", notes = "특정 회원의 단어 리스트를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<List<WordbookResponseDto>> getWordsByUser(){
        // 해당 강좌의 단어장 불러오기
        return new ResponseEntity<>(studyService.getWordbooksByUser(), HttpStatus.OK);
    }


    @PutMapping("/word/complete")
    @ApiOperation(value = "단어 외움 처리", notes = "학습량을 업데이트 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> updateWordbookStatus(
            @RequestBody WordbookRequestDto data
    ){
        // 단어장 단어 외움 처리
        studyService.memorizeWord(data.getWordbookId());
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @PostMapping("/essay")
    @ApiOperation(value = "에세이 저장", notes = "특정 회원 / 특정 강의의 에세이를 저장한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> saveEssay(
            @RequestBody EssayRequestDto essay
    ){
        // 에세이 저장
        studyService.addEssay(essay);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @GetMapping("/essay/{learningRecordId}")
    @ApiOperation(value = "에세이 다운로드", notes = "특정 회원 / 특정 강의의 에세이를 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> findEssay(
            @PathVariable int learningRecordId
    ){
        // 에세이 저장
        return new ResponseEntity<>(studyService.findEssay(learningRecordId), HttpStatus.OK);
    }


    @GetMapping("/record/{lr_id}")
    @ApiOperation(value = "Learning Record 조회", notes = "해당 아이디를 가지는 Learning Record 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> findLearningRecords(
            @PathVariable int lr_id
    ){
        // 학습 스테이지 저장
        studyService.findLearningRecordById(lr_id);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @PutMapping("/complete/stage")
    @ApiOperation(value = "학습 스테이지 업데이트", notes = "해당 학습 아이디를 가지는 학습의 스테이지를 해당 값으로 업데이트한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> updateCompletedStage(
            @RequestBody UpdateStageRequestDto data
    ){
        // 학습 스테이지 저장
        LearningRecordResponseDto lr = studyService.updateCompletedStage(data);
        return new ResponseEntity<>(lr, HttpStatus.OK);
    }

    @PutMapping("/complete/time")
    @ApiOperation(value = "학습 시간 업데이트", notes = "해당 Learning Time을 업데이트한다..")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> updateLearningTime(
            @RequestBody UpdateLearningRequestDto data
    ){
        studyService.addLearningTime(data);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }
    @GetMapping("/{videoId}/script")
    @ApiOperation(value = "스크립트 조회", notes = "해당 영상의 스크립트를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> getScript(
             @PathVariable String videoId
    ){
        // 학습 스테이지 저장
        String script = studyService.getScript(videoId);
        Map<String, Object> response = new HashMap<>();
        response.put("video_id", videoId);
        response.put("script", script);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/survey")
    @ApiOperation(value = "해당 영상에 대한 만족도 조사", notes = "해당 영상에 대한 만족도 조사")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<?> setSurvey(
            @RequestBody SurveyRequestDto data
    ) {
        studyService.setSurvey(data);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }


}
