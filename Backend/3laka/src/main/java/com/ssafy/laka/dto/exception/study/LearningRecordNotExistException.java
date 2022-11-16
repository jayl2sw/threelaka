package com.ssafy.laka.dto.exception.study;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class LearningRecordNotExistException extends CustomException {
    public LearningRecordNotExistException(){
        super(ErrorCode.LEARNING_RECORD_NOT_EXIST);
    }

}