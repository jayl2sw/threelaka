package com.ssafy.laka.dto.exception.dashboard;


import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class StudyNotFoundException extends CustomException {
    public StudyNotFoundException(){
        super(ErrorCode.STUDY_NOT_EXIST);
    }
}
