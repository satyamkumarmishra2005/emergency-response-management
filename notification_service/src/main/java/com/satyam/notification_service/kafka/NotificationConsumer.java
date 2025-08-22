package com.satyam.notification_service.kafka;

import com.satyam.notification_service.model.NotificationMessage;
import com.satyam.notification_service.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class NotificationConsumer {

    @Autowired
    private EmailService emailService;

    @KafkaListener(topics = "notification-topic", groupId = "notification-group")
    public void consumeNotification(NotificationMessage message) {
        System.out.println("Received notification from Kafka: " + message);
        String subject = "Responder Status Update";
        String body = String.format(
                "Responder %s has been %s for location %s.",
                message.getResponderId(),
                message.getStaus(),
                message.getLocation()
        );

        emailService.sendEmail(message.getEmail(), subject, body);
    }
}
