package com.ssafy.laka.dto.exception.user;


import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class DuplicateNicknameException extends CustomException {
    public DuplicateNicknameException(){
        super(ErrorCode.DUPLICATE_NICKNAME);
    }
}
