package com.satyam.alert_service.service;

import com.satyam.alert_service.kafka.KafkaPublisher;
import com.satyam.alert_service.model.Alert;
import com.satyam.alert_service.repository.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AlertService {

    @Autowired
    AlertRepository alertRepository;

    private final KafkaPublisher kafkaPublisher;


   // KafkaPublisher kafkaPublisher;

    @Autowired
    public AlertService(KafkaPublisher kafkaPublisher){
        this.kafkaPublisher = kafkaPublisher;
    }

    public Alert sendAlert(Alert alert){
        alert.setTimestamp(LocalDateTime.now());
     Alert savedalert =  alertRepository.save(alert);
     kafkaPublisher.publishAlert(savedalert);

     return savedalert;

    }

}
