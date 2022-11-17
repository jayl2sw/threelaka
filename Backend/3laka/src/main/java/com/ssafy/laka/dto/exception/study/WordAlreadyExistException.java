package com.ssafy.laka.dto.exception.study;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class WordAlreadyExistException extends CustomException {
    public WordAlreadyExistException(){
        super(ErrorCode.ALREADY_IN_WORDBOOK);
    }

}
