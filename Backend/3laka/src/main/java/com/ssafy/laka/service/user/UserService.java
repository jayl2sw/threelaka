package com.ssafy.laka.service.user;


import com.ssafy.laka.dto.jwt.TokenDto;
import com.ssafy.laka.dto.jwt.TokenRequestDto;
import com.ssafy.laka.dto.user.*;


public interface UserService {

    boolean checkEmail(String email);
    boolean checkUsername(String username);
    boolean checkNickName(String nickname);
    boolean checkPW(Long id, String nowPW);
    boolean checkSameUser(String email, String username);
    TokenDto doLogin(LoginRequestDto requestDto);
    UserResponseDto doSignUp(SignUpRequestDto requestDto);
    //UserResponseDto getUserInfo(Long id);
    //void updateUser(Long id, UpdateUserRequestDto requestDto);
    void deleteUser(Long id);
    void changePW(String email, String newPW);
    void changePW(Long id, String newPW);
    void setNickname(String nickname);
    UserResponseDto getMyInfo();

    UserResponseDto getUserInfo(Long userId);
    TokenDto refresh(TokenRequestDto requestDto);
    void logout();
    UserResponseDto search(String keyword);

}
