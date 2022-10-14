package com.ssafy.laka.dto.exception.user;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class TooManyFriendsException extends CustomException {
    public TooManyFriendsException(){
        super(ErrorCode.TOO_MANY_FRIENDS);
    }
}
