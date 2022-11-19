package com.ssafy.laka.dto.exception.study;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class NotInWordbookException extends CustomException {
    public NotInWordbookException(){
        super(ErrorCode.NOT_IN_WORDBOOK);
    }

}