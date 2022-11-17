package com.ssafy.laka.dto.exception.user;


import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class DuplicateEmailException extends CustomException {
    public DuplicateEmailException(){
        super(ErrorCode.DUPLICATE_EMAIL);
    }
}
