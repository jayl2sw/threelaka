package com.ssafy.laka.dto.exception.guild;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class GuildMasterException extends CustomException {
    public GuildMasterException(){
        super(ErrorCode.MASTER_CANNOT_QUIT);
    }
}
