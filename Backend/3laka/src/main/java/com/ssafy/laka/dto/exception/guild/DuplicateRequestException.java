package com.ssafy.laka.dto.exception.guild;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class DuplicateRequestException extends CustomException {
    public DuplicateRequestException(){
        super(ErrorCode.SAME_REQUEST_EXISTS);
    }
}

