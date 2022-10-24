package com.ssafy.laka.dto.user;

import io.swagger.annotations.ApiModel;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@ApiModel(value = "ChangePasswordDto", description = "비밀번호 변경 Dto")
public class ChangePasswordDto {
    private String nowPW;
    @NotBlank(message="비밀번호는 필수값입니다.")
    @Pattern(regexp = "(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}", message = "영문자 and 숫자 and 특수문자의 조합으로 8~25자리")
    private String newPW;
}
