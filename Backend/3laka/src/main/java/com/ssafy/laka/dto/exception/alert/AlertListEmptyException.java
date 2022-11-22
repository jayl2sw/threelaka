package com.ssafy.laka.dto.exception.alert;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class AlertListEmptyException extends CustomException {
    public AlertListEmptyException(){super(ErrorCode.AlERT_LIST_EMPTY);};
}
