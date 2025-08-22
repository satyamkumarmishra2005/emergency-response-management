package com.satyam.alert_service.repository;

import com.satyam.alert_service.model.Alert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlertRepository extends JpaRepository<Alert , Long> {

}
