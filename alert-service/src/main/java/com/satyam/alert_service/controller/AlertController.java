package com.satyam.alert_service.controller;

import com.satyam.alert_service.model.Alert;
import com.satyam.alert_service.service.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AlertController {

    @Autowired
    AlertService alertService;

    @PostMapping("/alerts")

    public ResponseEntity<Alert> createAlert(@RequestBody Alert alert){
        return ResponseEntity.ok(alertService.sendAlert(alert));
    }

}
