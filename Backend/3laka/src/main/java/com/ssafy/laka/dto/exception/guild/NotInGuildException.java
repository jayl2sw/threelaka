package com.ssafy.laka.dto.exception.guild;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class NotInGuildException extends CustomException {
    public NotInGuildException(){
        super(ErrorCode.NOT_IN_GUILD);

    }
}
