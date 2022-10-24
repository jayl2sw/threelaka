package com.ssafy.laka.dto.exception.guild;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class RequestNotFoundException extends CustomException {
    public RequestNotFoundException(){
        super(ErrorCode.REQUEST_NOT_FOUND);
    }
}
