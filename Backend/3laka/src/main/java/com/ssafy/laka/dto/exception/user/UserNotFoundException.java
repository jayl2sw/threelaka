package com.ssafy.laka.dto.exception.user;


import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class UserNotFoundException extends CustomException {
    public UserNotFoundException(){
        super(ErrorCode.USER_NOT_FOUND);
    }
}
