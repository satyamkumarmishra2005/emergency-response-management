package com.satyam.alert_service.kafka;

import com.satyam.alert_service.model.Alert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;


@Component
public class KafkaPublisher {

    private final KafkaTemplate<String, Alert> kafkaTemplate;

     // 👇 This tells Spring: "Inject a KafkaTemplate bean here when you create this class"
    @Autowired
    public KafkaPublisher(KafkaTemplate<String, Alert> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void publishAlert(Alert alert) {
        kafkaTemplate.send("alert-service", alert);  // "alert-service" is your topic
    }
}
