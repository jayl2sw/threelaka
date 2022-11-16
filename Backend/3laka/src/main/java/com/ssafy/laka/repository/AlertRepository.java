package com.ssafy.laka.repository;

import com.ssafy.laka.domain.Alert;
import com.ssafy.laka.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AlertRepository extends JpaRepository<Alert, Integer> {
    @Query(value = "select a from Alert a where a.user = :user and a.alertState <> 'checked'")
    List<Alert> findAlerts(User user);
}
