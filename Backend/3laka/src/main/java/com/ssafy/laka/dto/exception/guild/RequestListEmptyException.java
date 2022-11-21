package com.ssafy.laka.dto.exception.guild;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class RequestListEmptyException extends CustomException {
    public RequestListEmptyException(){
        super(ErrorCode.REQUEST_LIST_EMPTY);
    }
}
