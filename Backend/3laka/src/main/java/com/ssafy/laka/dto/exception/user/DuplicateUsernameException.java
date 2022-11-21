package com.ssafy.laka.dto.exception.user;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class DuplicateUsernameException extends CustomException {
    public DuplicateUsernameException(){
        super(ErrorCode.DUPLICATE_USERNAME);
    }
}
