package com.ssafy.laka.dto.exception.alert;

import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class AlertNotFoundException extends CustomException {
    public AlertNotFoundException(){super(ErrorCode.AlERT_NOT_FOUND);};
}
