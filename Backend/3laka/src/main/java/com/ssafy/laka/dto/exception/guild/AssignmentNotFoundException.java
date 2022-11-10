package com.ssafy.laka.dto.exception.guild;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class AssignmentNotFoundException extends CustomException {
    public AssignmentNotFoundException(){
        super(ErrorCode.ASSIGNMENT_NOT_FOUND);

    }
}
