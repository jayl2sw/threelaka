package com.ssafy.laka.dto.exception.user;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class DuplicateProposeException extends CustomException {
    public DuplicateProposeException(){
        super(ErrorCode.DUPLICATE_PROPOSE);
    }
}
