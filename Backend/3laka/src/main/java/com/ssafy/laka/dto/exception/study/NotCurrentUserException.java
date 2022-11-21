package com.ssafy.laka.dto.exception.study;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class NotCurrentUserException extends CustomException {
    public NotCurrentUserException(){
        super(ErrorCode.NOT_CURRENT_USER);
    }
}