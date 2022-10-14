package com.ssafy.laka.dto.exception.user;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class ExceededMoneyException extends CustomException {
    public ExceededMoneyException(){
        super(ErrorCode.EXCEEDED_MONEY);
    }
}
