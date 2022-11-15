package com.ssafy.laka.service;


import com.ssafy.laka.dto.jwt.TokenDto;
import com.ssafy.laka.dto.jwt.TokenRequestDto;
import com.ssafy.laka.dto.user.*;


public interface UserService {

    boolean checkUsername(String username);
    boolean checkNickName(String nickname);
    boolean checkPW(int id, String nowPW);
    boolean checkSameUser(String nickname, String username);
    TokenDto doLogin(LoginRequestDto requestDto);
    void doSignUp(SignUpRequestDto requestDto);
//    void updateUser(int id, UpdateUserRequestDto requestDto);
    void deleteUser(int id);
    void changePW(String username, String newPW);
    void changePW(int id, String newPW);
    void setNickname(String nickname);
    UserResponseDto getMyInfo();

    UserResponseDto getUserInfo(int userId);
    TokenDto refresh(TokenRequestDto requestDto);
    void logout();
    UserResponseDto search(String keyword);

}
