package com.ssafy.laka.dto.jwt;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "TokenDto", description = "JWT 토큰 양식")
public class TokenDto {
    private String grantType;
    private String accessToken;
    private String refreshToken;
    private long accessTokenExpiresIn;
}
