package com.ssafy.laka.controller;

import com.ssafy.laka.dto.exception.common.InvalidParameterException;
import com.ssafy.laka.dto.exception.user.DuplicateEmailException;
import com.ssafy.laka.dto.exception.user.DuplicateNicknameException;
import com.ssafy.laka.dto.exception.user.DuplicateUsernameException;
import com.ssafy.laka.dto.exception.user.UserNotFoundException;
import com.ssafy.laka.dto.jwt.TokenDto;
import com.ssafy.laka.dto.jwt.TokenRequestDto;
import com.ssafy.laka.dto.user.*;
import com.ssafy.laka.service.MailService;
import com.ssafy.laka.service.StudyService;
import com.ssafy.laka.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;
    private final StudyService studyService;

    @GetMapping("/auth/check/nickname/{nickname}")
    @ApiOperation(value = "닉네임 중복 검사", notes = "해당 닉네임이 중복인지 확인하여 중복이면 true, 중복이 아니면 false를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Boolean.class)
    })
    public ResponseEntity<Boolean> checkNickName(@PathVariable String nickname){
        return new ResponseEntity<>(userService.checkNickName(nickname), HttpStatus.OK);
    }

    @GetMapping("/auth/check/email/{email}")
    @ApiOperation(value = "이메일 중복 검사", notes = "해당 이메일이 중복인지 확인하여 중복이면 true, 중복이 아니면 false를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Boolean.class)
    })
    public ResponseEntity<Boolean> checkEmail(@PathVariable String email){
        return new ResponseEntity<>(userService.checkUsername(email), HttpStatus.OK);
    }

    @PostMapping("/auth/signup")
    @ApiOperation(value = "회원 가입", notes = "회원 정보를 통해 회원을 추가한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = String.class)
    })
    public ResponseEntity<String> doSignUp(@Valid @RequestBody SignUpRequestDto requestDto, BindingResult result){
        if (result.hasErrors()) {
            throw new InvalidParameterException(result);
        } else if (userService.checkUsername(requestDto.getUsername())) {
            throw new DuplicateUsernameException();
        } else if (userService.checkNickName(requestDto.getNickname())) {
            throw new DuplicateNicknameException();
        }
        userService.doSignUp(requestDto);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @PostMapping("/auth/login")
    @ApiOperation(value = "로그인", notes = "아이디와 비밀번호로 로그인한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = TokenDto.class)
    })
    public ResponseEntity<TokenDto> doLogin(@Valid @RequestBody LoginRequestDto requestDto, BindingResult result){
        if(result.hasErrors()){
            throw new InvalidParameterException(result);
        }
        System.out.println(1);
        TokenDto tokenDto = userService.doLogin(requestDto);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Auth", tokenDto.getAccessToken());
        headers.add("Refresh", tokenDto.getRefreshToken());
        studyService.checkContinuousLearningDate(tokenDto.getAccessToken());

        return new ResponseEntity<>(tokenDto, headers, HttpStatus.OK);
    }
    
    @PutMapping("/")
    @ApiOperation(value = "회원 정보 수정", notes = "회원 정보 입력을 통해 회원 정보를 수정한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Void.class)
    })
    public ResponseEntity<String> updateUser(){
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PutMapping("/password")
    @ApiOperation(value = "비밀번호 변경", notes = "현재 비밀번호와 비교한 후 비밀번호를 수정한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = String.class)
    })
    public ResponseEntity<String> changePassword(@Valid @RequestBody ChangePasswordDto dto, BindingResult result){
        if(result.hasErrors()){
            throw new InvalidParameterException(result);
        }
        int id = userService.getMyInfo().getUserId();
        if(!userService.checkPW(id, dto.getNowPW())){
            throw new RuntimeException("비밀번호가 다릅니다.");
        }
        userService.changePW(id, passwordEncoder.encode(dto.getNewPW()));
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }
    
    @DeleteMapping("")
    @ApiOperation(value = "회원 탈퇴", notes = "현재 로그인한 회원의 계정을 삭제한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = String.class)
    })
    public ResponseEntity<String> deleteUser(){
        int id = userService.getMyInfo().getUserId();
        userService.deleteUser(id);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @PutMapping("/auth/findpw")
    @ApiOperation(value = "비밀번호 찾기", notes = "회원 정보와 일치 여부를 확인한 후 비밀번호를 랜덤한 문자열로 변경한 후 메일을 전송한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = String.class)
    })
    public ResponseEntity<String> findPW(@RequestBody FindPasswordDto dto){
        String nickname = dto.getNickname();
        String username = dto.getUsername();
        try {
            if(!userService.checkSameUser(nickname, username)){
                throw new RuntimeException("이메일과 닉네임이 일치하지 않습니다.");
            }
            String newPW = mailService.sendSimpleMessage(username);
            userService.changePW(username, passwordEncoder.encode(newPW));
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        }catch(UserNotFoundException e){
            throw new UserNotFoundException();
        }catch(Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("FAIL", HttpStatus.NO_CONTENT);
    }

    @PostMapping("/auth/refresh")
    @ApiOperation(value = "Access Token 재발급", notes = "현재 access token과 refresh token을 통해 access token을 재발급한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = TokenDto.class)
    })
    public ResponseEntity<TokenDto> refresh(@RequestBody TokenRequestDto requestDto){
        return new ResponseEntity<>(userService.refresh(requestDto), HttpStatus.OK);
    }

    @PutMapping("/logout")
    @ApiOperation(value = "로그아웃", notes = "현재 로그인한 회원의 refresh token을 삭제한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = String.class)
    })
    public ResponseEntity<String> logout(){
        userService.logout();
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @GetMapping("/search/{keyword}")
    @ApiOperation(value = "회원 검색", notes = "회원의 닉네임을 통해 회원을 검색한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = UserResponseDto.class)
    })
    public ResponseEntity<UserResponseDto> search(@PathVariable String keyword){
        return new ResponseEntity<>(userService.search(keyword), HttpStatus.OK);
    }

    @GetMapping("/newbie")
    @ApiOperation(value = "튜토리얼 필요 여부 반환", notes = "회원이 튜토리얼 다시 보지 않기를 선택했다면 false, 선택하지 않았다면 true를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = Boolean.class)
    })
    public ResponseEntity<Boolean> checkNewbie(){
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/info")
    @ApiOperation(value = "유저 정보 반환", notes = "로그인한 회원의 계정 정보를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = UserResponseDto.class)
    })
    public ResponseEntity<UserResponseDto> getUserInfo(){
        return new ResponseEntity<>(userService.getMyInfo(), HttpStatus.OK);
    }

}
