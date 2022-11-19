package com.ssafy.laka.dto.exception.guild;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class DuplicateGuildNameException extends CustomException {
    public DuplicateGuildNameException(){
        super(ErrorCode.SAME_GUILDNAME_EXISTS);
    }
}

