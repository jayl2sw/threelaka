package com.ssafy.laka.dto.exception.study;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class NotLikedVideoException extends CustomException {
    public NotLikedVideoException(){
        super(ErrorCode.NOT_LIKED_VIDEO);
    }

}