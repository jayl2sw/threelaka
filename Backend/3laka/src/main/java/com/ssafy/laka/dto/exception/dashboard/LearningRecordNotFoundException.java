package com.ssafy.laka.dto.exception.dashboard;


import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class LearningRecordNotFoundException extends CustomException {
    public LearningRecordNotFoundException(){
        super(ErrorCode.LEARNING_RECORD_NOT_FOUND);
    }
}
