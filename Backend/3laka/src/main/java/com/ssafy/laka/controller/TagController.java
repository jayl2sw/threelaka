//package com.ssafy.laka.controller;
//
//import com.ssafy.laka.domain.Tag;
//import com.ssafy.laka.dto.tag.TagResponseDto;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import com.ssafy.laka.service.TagService;
//import io.swagger.annotations.ApiOperation;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/api/v1/user/tag")
//public class TagController {
//    private final TagService tagService;
//
//    @GetMapping("")
//    @ApiOperation(value = "내 태그 정보조회")
//    public ResponseEntity<List<TagResponseDto>> getTagList(){
//        return new ResponseEntity<>(tagService.getTagList(), HttpStatus.OK);
//    }
//
//
//}
