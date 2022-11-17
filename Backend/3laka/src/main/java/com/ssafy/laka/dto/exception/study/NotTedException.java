package com.ssafy.laka.dto.exception.study;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class NotTedException extends CustomException {
    public NotTedException(){
        super(ErrorCode.NOT_TED_VIDEO);
    }

}