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
    @Pattern(regexp = "(?=.*\\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,16}", message = "4자 이상, 16자 이하의 영문, 숫자 조합")
    private String newPW;
}
