package com.ssafy.laka.dto.exception.user;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class DuplicateFriendException extends CustomException {
    public DuplicateFriendException(){
        super(ErrorCode.DUPLICATE_FRIEND);
    }
}
