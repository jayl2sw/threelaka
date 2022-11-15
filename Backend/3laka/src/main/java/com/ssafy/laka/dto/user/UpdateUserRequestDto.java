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
@ApiModel(value = "UpdateUserRequestDto", description = "회원정보 수정 요청 Dto")
public class UpdateUserRequestDto {
    @NotBlank(message="닉네임은 필수값입니다.")
    @Pattern(regexp = "([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}", message = "한글 or 영문자 or 숫자의 조합으로 1~10자리")
    private String nickname;
    @Min(1)
    @Max(100)
    private int age;
    private Gender gender;
}
