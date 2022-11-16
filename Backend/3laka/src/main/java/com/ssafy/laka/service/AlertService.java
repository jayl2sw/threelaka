package com.ssafy.laka.service;

import com.ssafy.laka.domain.Alert;
import com.ssafy.laka.dto.alert.AlertResponseDto;

import java.util.List;

public interface AlertService {
    List<AlertResponseDto> getAlerts();
}
