package com.ssafy.laka.service;

import com.ssafy.laka.domain.Alert;
import com.ssafy.laka.domain.User;
import com.ssafy.laka.domain.enums.AlertState;
import com.ssafy.laka.dto.alert.AlertResponseDto;
import com.ssafy.laka.dto.exception.alert.AlertListEmptyException;
import com.ssafy.laka.dto.exception.alert.AlertNotFoundException;
import com.ssafy.laka.dto.exception.user.UserNotFoundException;
import com.ssafy.laka.repository.AlertRepository;
import com.ssafy.laka.repository.UserRepository;
import com.ssafy.laka.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AlertServiceImpl implements AlertService{

    private final AlertRepository alertRepository;
    private final UserRepository userRepository;

    @Override
    public List<AlertResponseDto> getAlerts() {
        User me = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        List<AlertResponseDto> list = alertRepository.findAlerts(me)
                .stream().map(s->AlertResponseDto.from(s)).collect(Collectors.toList());

        if (list.size() < 1) {
            throw new AlertListEmptyException();}
        return list;
    }

    @Override
    public void checkAlert(int alertId) {
        Alert alert = alertRepository.findById(alertId).orElseThrow(AlertNotFoundException::new);
        alert.UpdateState(alert);
    }

    @Override
    public void checkAllAlerts() {
        User me = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        List<Alert> alerts = alertRepository.findAlerts(me);

        for (int i = 0; i < alerts.size(); i++){
            alerts.get(i).UpdateState(alerts.get(i));
        }
    }
}
