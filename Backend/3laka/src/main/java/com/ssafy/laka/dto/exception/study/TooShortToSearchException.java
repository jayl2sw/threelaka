package com.ssafy.laka.dto.exception.study;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class TooShortToSearchException extends CustomException {
    public TooShortToSearchException(){
        super(ErrorCode.TOO_SHORT_TO_SEARCH);
    }

}