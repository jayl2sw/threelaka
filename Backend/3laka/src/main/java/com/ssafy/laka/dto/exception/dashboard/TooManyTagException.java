package com.ssafy.laka.dto.exception.dashboard;


import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class TooManyTagException extends CustomException {
    public TooManyTagException(){
        super(ErrorCode.TOO_MANY_TAGS);
    }
}
