package com.ssafy.laka.dto.exception.guild;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class LeftMemberExistException extends CustomException{
    public LeftMemberExistException(){
        super(ErrorCode.LEFT_MEMBER_EXISTS);

    }
}
