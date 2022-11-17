package com.ssafy.laka.dto.exception.study;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class ScriptNotFoundException extends CustomException {
    public ScriptNotFoundException(){
        super(ErrorCode.SCRIPT_NOT_FOUND);
    }

}
