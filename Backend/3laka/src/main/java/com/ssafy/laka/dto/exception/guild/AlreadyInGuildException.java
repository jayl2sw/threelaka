package com.ssafy.laka.dto.exception.guild;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class AlreadyInGuildException extends CustomException {
    public AlreadyInGuildException(){
        super(ErrorCode.ALREADY_IN_GUILD);

    }
}
