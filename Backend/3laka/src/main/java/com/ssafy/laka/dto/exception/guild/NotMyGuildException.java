package com.ssafy.laka.dto.exception.guild;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class NotMyGuildException extends CustomException {
    public NotMyGuildException(){
        super(ErrorCode.NOT_MY_GUILD);

    }
}
