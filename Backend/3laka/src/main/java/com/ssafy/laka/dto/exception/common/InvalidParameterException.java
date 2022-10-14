package com.ssafy.laka.dto.exception.common;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;
import lombok.Getter;
import org.springframework.validation.Errors;

@Getter
public class InvalidParameterException extends CustomException {
    private final Errors errors;

    public InvalidParameterException(Errors errors){
        super(ErrorCode.INVALID_PARAMETER);
        this.errors = errors;
    }
}
