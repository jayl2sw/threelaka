package com.ssafy.laka.dto.user;

import com.ssafy.laka.domain.enums.Gender;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@Builder
@AllArgsConstructor
@ApiModel(value = "SignUpRequestDto", description = "회원가입 요청 Dto")
public class SignUpRequestDto {
    @NotBlank(message="아이디는 필수값입니다.")
//    @Pattern(regexp = "(?=[a-zA-Z0-9]).{5,20}", message = "영문자 or 숫자의 조합으로 5~20자리")
    private String username;
    @NotBlank(message="비밀번호는 필수값입니다.")
//    @Pattern(regexp = "(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}", message = "영문자 and 숫자 and 특수문자의 조합으로 8~25자리")
    private String password;
    @NotBlank(message="닉네임은 필수값입니다.")
//    @Pattern(regexp = "(?=[가-힣a-zA-Z0-9]).{1,4}", message = "한글 or 영문자 or 숫자의 조합으로 1~4자리")
    private String nickname;
    @NotBlank(message="이메일은 필수값입니다.")
    @Email(message = "이메일 형식이 맞지 않습니다.")
    private String email;

    private int age;
    private Gender gender;
}
