package com.ssafy.laka.dto.exception.guild;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class GuildNotFoundException extends CustomException {
    public GuildNotFoundException(){
        super(ErrorCode.GUILD_NOT_FOUND);
    }
}
