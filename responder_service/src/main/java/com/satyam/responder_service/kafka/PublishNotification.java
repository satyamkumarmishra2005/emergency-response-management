//package com.satyam.responder_service.kafka;
//
//import com.satyam.responder_service.model.Responder;
//import com.satyam.responder_service.repository.ResponderRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.kafka.core.KafkaTemplate;
//import org.springframework.stereotype.Component;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@Service
//public class PublishNotification {
//    @Autowired
//    private KafkaTemplate<String, NotificationMessage> kafkaTemplate;
//
//    @Autowired
//    private ResponderRepository responderRepository;
//
//    public Responder updateResponder(Long id, String status) {
////        Responder responder = responderRepository.findById(id)
////                .orElseThrow(() -> new RuntimeException("Responder not found"));
////
////        responder.setStatus(status);
////        Responder updated = responderRepository.save(responder);
//
//        // Hardcoded values as requested
//        String hardcodedResponderId = "RESP_001";
//        String hardcodedStatus = "DISPATCHED";
//
//        // If you want to use actual database values, uncomment below:
//         Optional<Responder> responderOpt = responderRepository.findById(id);
//         if (responderOpt.isPresent()) {
//             Responder responder = responderOpt.get();
//             responder.setStatus(status);
//             Responder updated = responderRepository.save(responder);
//             hardcodedResponderId = updated.getId().toString();
//             hardcodedStatus = updated.getStatus();
//         }
//
//        NotificationMessage notification = new NotificationMessage();
//       // notification.setResponderName(updated.getName());
//        notification.setResponderId(updated.getId().toString());
//        notification.setStatus(updated.getStatus());
//        notification.setLocation(updated.getLocation());
//        notification.setEmail("satyamkumarmishra2005@gmail.com");
//
//        kafkaTemplate.send("notification-topic", notification);
//
//        return updated;
//    }
//
//}


package com.satyam.responder_service.kafka;

import com.satyam.responder_service.model.Responder;
import com.satyam.responder_service.repository.ResponderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PublishNotification {
    @Autowired
    private KafkaTemplate<String, NotificationMessage> kafkaTemplate;

    @Autowired
    private ResponderRepository responderRepository;

//    public Responder updateResponder(Long id, String status) {
//        Optional<Responder> responderOpt = responderRepository.findById(id);
//
//        if (responderOpt.isPresent()) {
//            Responder responder = responderOpt.get();
//            responder.setStatus(status);
//            Responder updated = responderRepository.save(responder);
//
//            // Create notification with database values and hardcoded email
//            NotificationMessage notification = new NotificationMessage();
//            notification.setResponderId(updated.getId().toString()); // From DB
//            notification.setStaus(updated.getStatus()); // From DB (note: keeping your typo)
//            notification.setLocation(updated.getLocation()); // From DB
//            notification.setEmail("satyamkumarmishra2005@gmail.com"); // Hardcoded
//
//            kafkaTemplate.send("notification-topic", notification);
//            System.out.println("Sent notification with DB values: " + notification);
//
//            return updated;
//        } else {
//            // Handle case where responder is not found
//            System.err.println("Responder with ID " + id + " not found");
//
//            // Send fallback notification
//            NotificationMessage notification = new NotificationMessage();
//            notification.setResponderId("NOT_FOUND");
//            notification.setStaus("RESPONDER_NOT_FOUND");
//            notification.setLocation("UNKNOWN");
//            notification.setEmail("satyamkumarmishra2005@gmail.com");
//
//            kafkaTemplate.send("notification-topic", notification);
//
//            return null;
//        }
//    }

    public void sendNoResponderNotification(Alert alert) {
        NotificationMessage notificationMessage = new NotificationMessage();
        notificationMessage.setResponderId("NO_RESPONDER");
        notificationMessage.setStaus("NO_RESPONDER_AVAILABLE");
        notificationMessage.setLocation(alert.getLocation()); // From alert, not hardcoded
        notificationMessage.setEmail("satyamkumarmishra2005@gmail.com"); // Hardcoded

        kafkaTemplate.send("notification-topic", notificationMessage);
        System.out.println("Sent no responder notification: " + notificationMessage);
    }

    // Method to send notification for already assigned responder
    public void sendResponderAssignedNotification(Responder responder) {
        NotificationMessage notification = new NotificationMessage();
        notification.setResponderId(responder.getId().toString());
        notification.setStaus(responder.getStatus()); // Already "DISPATCHED" from assignment
        notification.setLocation(responder.getLocation());
        notification.setEmail("satyamkumarmishra2005@gmail.com"); // Hardcoded email

        kafkaTemplate.send("notification-topic", notification);
        System.out.println("Sent notification for assigned responder: " + notification);
    }


}
