package com.ssafy.laka.controller;

import com.ssafy.laka.dto.exception.common.InvalidParameterException;
import com.ssafy.laka.dto.exception.user.UserNotFoundException;
import com.ssafy.laka.dto.jwt.TokenDto;
import com.ssafy.laka.dto.jwt.TokenRequestDto;
import com.ssafy.laka.dto.user.*;
import com.ssafy.laka.service.user.MailService;
import com.ssafy.laka.service.user.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;

    @GetMapping("/auth/check/nickname/{nickname}")
    @ApiOperation(value = "닉네임 중복 검사")
    public ResponseEntity<Boolean> checkNickName(@PathVariable String nickname){
        // 이미 있으면 true, 없으면 false
        return new ResponseEntity<>(userService.checkNickName(nickname), HttpStatus.OK);
    }

    @GetMapping("/auth/check/username/{username}")
    @ApiOperation(value = "아이디 중복 검사")
    public ResponseEntity<Boolean> checkUsername(@PathVariable String username){
        return new ResponseEntity<>(userService.checkUsername(username), HttpStatus.OK);
    }

    @GetMapping("/auth/check/email/{email}")
    @ApiOperation(value = "이메일 중복 검사")
    public ResponseEntity<Boolean> checkEmail(@PathVariable String email){
        // 이미 있으면 true, 없으면 false
        return new ResponseEntity<>(userService.checkEmail(email), HttpStatus.OK);
    }

    @PostMapping("/auth/signup")
    @ApiOperation(value = "회원 가입")
    public ResponseEntity<UserResponseDto> doSignUp(@Valid @RequestBody SignUpRequestDto requestDto, BindingResult result){

        if(result.hasErrors()){
            throw new InvalidParameterException(result);
        }
        return new ResponseEntity<>(userService.doSignUp(requestDto), HttpStatus.OK);
    }

    @PostMapping("/auth/login")
    @ApiOperation(value = "로그인")
    public ResponseEntity<TokenDto> doLogin(@Valid @RequestBody LoginRequestDto requestDto, BindingResult result){
        if(result.hasErrors()){
            throw new InvalidParameterException(result);
        }
        TokenDto tokenDto = userService.doLogin(requestDto);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Auth", tokenDto.getAccessToken());
        headers.add("Refresh", tokenDto.getRefreshToken());

        return new ResponseEntity<>(tokenDto, headers, HttpStatus.OK);
    }
    
//    @PutMapping("/")
//    @ApiOperation(value = "회원 정보 수정")
//    public ResponseEntity<String> updateUser(@RequestBody UpdateUserRequestDto requestDto, BindingResult result){
//        if(result.hasErrors()){
//            throw new InvalidParameterException(result);
//        }
//        Long id = userService.getMyInfo().getUser_id();
//        userService.updateUser(id, requestDto);
//        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
//    }
    @PutMapping("/password")
    @ApiOperation(value = "비밀번호 변경")
    public ResponseEntity<String> changePassword(@Valid @RequestBody ChangePasswordDto dto, BindingResult result){
        if(result.hasErrors()){
            throw new InvalidParameterException(result);
        }
        Long id = userService.getMyInfo().getUserId();
        if(!userService.checkPW(id, dto.getNowPW())){
            throw new RuntimeException("비밀번호가 다릅니다.");
        }
        userService.changePW(id, passwordEncoder.encode(dto.getNewPW()));
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @PutMapping("/set/nickname")
    @ApiOperation(value = "닉네임 설정")
    public ResponseEntity<String> setNickname(@RequestParam String nickname){
        userService.setNickname(nickname);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }
    
    @DeleteMapping("/")
    @ApiOperation(value = "회원 탈퇴")
    public ResponseEntity<String> deleteUser(){
        Long id = userService.getMyInfo().getUserId();
        userService.deleteUser(id);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @PutMapping("/auth/findpw")
    @ApiOperation(value = "비밀번호 찾기")
    public ResponseEntity<String> findPW(@RequestBody FindPasswordDto dto){
        String email = dto.getEmail();
        String username = dto.getUsername();

        try {
            if(!userService.checkEmail(email)){
                throw new UserNotFoundException();
            }

            if(!userService.checkSameUser(email, username)){
                throw new RuntimeException("이메일과 아이디가 일치하지 않습니다.");
            }

            String newPW = mailService.sendSimpleMessage(email);
            userService.changePW(email, passwordEncoder.encode(newPW));

            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        }catch(UserNotFoundException e){
            throw new UserNotFoundException();
        }catch(Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("FAIL", HttpStatus.NO_CONTENT);
    }

    @GetMapping("/myinfo")
    @ApiOperation(value = "내 정보 보기")
    public ResponseEntity<UserResponseDto> getMyInfo(){
        return new ResponseEntity<>(userService.getMyInfo(), HttpStatus.OK);
    }

    @PostMapping("/auth/refresh")
    @ApiOperation(value = "Access Token 재발급")
    public ResponseEntity<TokenDto> refresh(@RequestBody TokenRequestDto requestDto){
        return new ResponseEntity<>(userService.refresh(requestDto), HttpStatus.OK);
    }

    @PutMapping("/logout")
    @ApiOperation(value = "로그아웃")
    public ResponseEntity<String> logout(){
        userService.logout();
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @GetMapping("/search/{keyword}")
    @ApiOperation(value = "회원 검색")
    public ResponseEntity<UserResponseDto> search(@PathVariable String keyword){

        return new ResponseEntity<>(userService.search(keyword), HttpStatus.OK);
    }

}
