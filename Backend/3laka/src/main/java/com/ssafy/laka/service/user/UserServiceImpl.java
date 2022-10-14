package com.ssafy.laka.service.user;

import com.ssafy.laka.domain.*;
import com.ssafy.laka.domain.enums.Role;
import com.ssafy.laka.dto.exception.user.*;
import com.ssafy.laka.dto.jwt.TokenDto;
import com.ssafy.laka.dto.jwt.TokenRequestDto;
import com.ssafy.laka.dto.user.*;
import com.ssafy.laka.jwt.TokenProvider;
import com.ssafy.laka.repository.*;
import com.ssafy.laka.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService{
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public boolean checkEmail(String email) {
        // 이미 있으면 true, 없으면 false
        Optional<User> entity = userRepository.findByEmail(email);

        return entity.isPresent();
    }

    @Override
    public boolean checkUsername(String username){
        Optional<User> entity = userRepository.findByUsername(username);

        return entity.isPresent();
    }

    @Override
    public boolean checkNickName(String nickname) {
        // 이미 있으면 true, 없으면 false
        Optional<User> entity = userRepository.findByNickname(nickname);

        return entity.isPresent();
    }

    @Override
    public boolean checkPW(Long id, String nowPW){
        String username = userRepository.findById(id).orElseThrow(UserNotFoundException::new).getUsername();

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(username, nowPW);

        Authentication authentication = authenticationManagerBuilder.getObject()
                .authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return true;
    }

    @Override
    public boolean checkSameUser(String email, String username){
        Long emailId = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new).getUserId();
        Long nameId = userRepository.findByUsername(username).orElseThrow(UserNotFoundException::new).getUserId();

        return emailId == nameId;
    }

    @Override
    public TokenDto doLogin(LoginRequestDto requestDto) {
        // Login id/pw로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(requestDto.getUsername(), requestDto.getPassword());

        // 검증 과정
        // CustomUserDetailsService의 loadByUserName 실행
        Authentication authentication = authenticationManagerBuilder.getObject()
                .authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 인증 정보를 기반으로 JWT 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // Refresh Token 저장
        Optional<User> entity = userRepository.findByUsername(authentication.getName());

        if(entity.isPresent()){
            entity.get().saveToken(tokenDto.getRefreshToken());
            userRepository.save(entity.get());
        }

        // 토큰 발급
        return tokenDto;
    }

    @Override
    public UserResponseDto doSignUp(SignUpRequestDto requestDto) {

        if(userRepository.findByUsername(requestDto.getUsername()).orElse(null)!=null){
            throw new DuplicateUsernameException();
        }

        if(userRepository.findByEmail(requestDto.getEmail()).orElse(null)!=null){
            throw new DuplicateEmailException();
        }

        User user = User.builder()
                .username(requestDto.getUsername())
                .email(requestDto.getEmail())
                .nickname(requestDto.getNickname())
                .password(passwordEncoder.encode(requestDto.getPassword()))
                .role(Role.ROLE_USER)
                .build();

        return UserResponseDto.from(user);
    }


    @Override
    public UserResponseDto getMyInfo(){
        return UserResponseDto.from(SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new));
    }


    @Override
    public UserResponseDto getUserInfo(Long userId) {
        return UserResponseDto.from(userRepository.findById(userId).orElseThrow(UserNotFoundException::new));
    }

//  현재 사용처 없음
//    @Override
//    public UserResponseDto getUserInfo(Long id){
//        return UserResponseDto.from(userRepository.findById(id).orElseThrow(UserNotFoundException::new));
//    }

//    @Override
//    public void updateUser(Long id, UpdateUserRequestDto requestDto){
//        Optional<User> entity = userRepository.findById(id);
//
//        if(entity.isPresent()){
//            if(requestDto.getPassword().equals("")){
//                entity.get().update(requestDto);
//                userRepository.save(entity.get());
//                return;
//            }
//
//            entity.get().update(requestDto, passwordEncoder);
//            userRepository.save(entity.get());
//            return;
//        }
//
//        throw new UserNotFoundException();
//    }

    @Override
    public void deleteUser(Long id){
        Optional<User> entity = userRepository.findById(id);

        if(entity.isPresent()){
            userRepository.delete(entity.get());
            return;
        }

        throw new UserNotFoundException();
    }

    @Override
    public void changePW(String email, String newPW) {
        Optional<User> entity = userRepository.findByEmail(email);

        if(entity.isPresent()){
            entity.get().changePW(newPW);
            return;
        }

        throw new UserNotFoundException();
    }

    @Override
    public void changePW(Long id, String newPW){
        Optional<User> entity = userRepository.findById(id);

        if(entity.isPresent()){
            entity.get().changePW(newPW);
            return;
        }

        throw new UserNotFoundException();
    }

    @Override
    public void setNickname(String nickname){
        if(checkNickName(nickname)) throw new DuplicateNicknameException();

        User me = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        me.setNickname(nickname);
        userRepository.save(me);
    }

    @Override
    public TokenDto refresh(TokenRequestDto requestDto){
        // Refresh Token 검증
        if(!tokenProvider.validateToken(requestDto.getRefreshToken())){
            throw new RuntimeException("Refresh Token이 유효하지 않습니다.");
        }

        // Access Token에서 Id(username) 가져오기
        Authentication authentication = tokenProvider.getAuthentication(requestDto.getAccessToken());

        // 가져온 ID로 Refresh Token 가져오기
        User entity = userRepository.findByUsername(authentication.getName())
                .orElseThrow(()->new RuntimeException("로그아웃된 사용자입니다."));

        String refreshToken = entity.getToken();

        // 일치 검사
        if(!refreshToken.equals(requestDto.getRefreshToken())){
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        // 새 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // DB 정보 업데이트
        entity.saveToken(tokenDto.getRefreshToken());
        userRepository.save(entity);

        // 토큰 발급
        return tokenDto;
    }

    @Override
    public void logout(){
        Optional<User> entity = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername);

        if(entity.isPresent()){
            entity.get().saveToken("");
            userRepository.save(entity.get());
            return;
        }

        throw new RuntimeException("로그아웃에 실패했습니다.");
    }

    @Override
    public UserResponseDto search(String keyword) {
        User user = userRepository.findByNickname(keyword).orElseThrow(UserNotFoundException::new);

        return UserResponseDto.from(user);
    }
}
