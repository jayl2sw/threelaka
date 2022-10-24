package com.ssafy.laka.dto.exception.guild;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class NotMasterException extends CustomException {
    public NotMasterException(){
        super(ErrorCode.NOT_GUILD_MASTER);
    }
}
