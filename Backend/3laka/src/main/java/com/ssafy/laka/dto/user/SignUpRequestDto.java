package com.ssafy.laka.dto.user;

import com.ssafy.laka.domain.enums.Gender;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.*;

@Data
@Builder
@AllArgsConstructor
@ApiModel(value = "SignUpRequestDto", description = "회원가입 요청 Dto")
public class SignUpRequestDto {
    @NotBlank(message="이메일은 필수값입니다.")
    @Email(message = "이메일 형식이 맞지 않습니다.")
    private String username;
    @NotBlank(message="비밀번호는 필수값입니다.")
    @Pattern(regexp = "(?=.*\\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,16}", message = "4자 이상, 16자 이하의 영문, 숫자 조합")
    private String password;
    @NotBlank(message="닉네임은 필수값입니다.")
    @Pattern(regexp = "([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}", message = "한글 or 영문자 or 숫자의 조합으로 1~10자리")
    private String nickname;
    @Min(1)
    @Max(100)
    private int age;
    private Gender gender;
}
