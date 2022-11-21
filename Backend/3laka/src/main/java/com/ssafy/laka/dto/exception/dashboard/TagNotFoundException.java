package com.ssafy.laka.dto.exception.dashboard;


import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class TagNotFoundException extends CustomException {
    public TagNotFoundException(){
        super(ErrorCode.TAG_NOT_EXIST);
    }
}
