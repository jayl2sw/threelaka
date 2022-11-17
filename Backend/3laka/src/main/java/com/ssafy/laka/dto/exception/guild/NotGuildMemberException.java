package com.ssafy.laka.dto.exception.guild;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class NotGuildMemberException extends CustomException {
    public NotGuildMemberException(){
        super(ErrorCode.NOT_GUILD_MEMBER);

    }
}
