package com.ssafy.laka.dto.exception.study;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class NotInDictionaryException extends CustomException {
    public NotInDictionaryException(){
        super(ErrorCode.NOT_IN_DICTIONARY);
    }

}