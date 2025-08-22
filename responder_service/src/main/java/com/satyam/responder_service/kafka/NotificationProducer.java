//package com.satyam.responder_service.kafka;
//
//
//import org.springframework.kafka.core.KafkaTemplate;
//import org.springframework.stereotype.Service;
//
//@Service
//public class NotificationProducer {
//
//
//    private final KafkaTemplate<String, NotificationMessage> kafkaTemplate;
//
//    public NotificationProducer(KafkaTemplate<String, NotificationMessage> kafkaTemplate) {
//        this.kafkaTemplate = kafkaTemplate;
//    }
//
//    public void sendNotification(NotificationMessage notification) {
//        kafkaTemplate.send("notification-topic", notification);
//    }
//}
