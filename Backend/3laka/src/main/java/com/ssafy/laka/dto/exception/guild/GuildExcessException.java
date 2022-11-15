package com.ssafy.laka.dto.exception.guild;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class GuildExcessException extends CustomException {
    public GuildExcessException(){
        super(ErrorCode.OVER_TWENTY_MEMBERS);

    }
}
