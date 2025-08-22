//package com.satyam.responder_service.kafka;
//
//import com.satyam.responder_service.service.ResponderService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.stereotype.Component;
//
//@Component
//public class AlertConsumer {
//@Autowired
//    ResponderService responderService;
//    @Autowired
//    private PublishNotification publishNotification;
//
//    @KafkaListener(topics = "alert-service" , groupId = "responder-group", containerFactory = "kafkaListenerContainerFactory" )
//    public void consumeAlert(Alert alert){
//       System.out.println("Received alert from Kafka:" + alert);
//       // Automatically assign a responder
//        publishNotification.updateResponder(1L, "Dispatched");
//  responderService.assignResponder(alert );
//    }
//
//}


package com.satyam.responder_service.kafka;

import com.satyam.responder_service.model.Responder;
import com.satyam.responder_service.service.ResponderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class AlertConsumer {

    @Autowired
    private ResponderService responderService;

    @Autowired
    private PublishNotification publishNotification;

    @KafkaListener(topics = "alert-service", groupId = "responder-group", containerFactory = "kafkaListenerContainerFactory")
    public void consumeAlert(Alert alert) {
        System.out.println("Received alert from Kafka:" + alert);

        // Assign a responder first
        Responder assignedResponder = responderService.assignResponder(alert);

        // Only send notification if a responder was successfully assigned
        if (assignedResponder != null) {
            // Use actual database values from the assigned responder
          //  publishNotification.updateResponder(assignedResponder.getId(), assignedResponder.getStatus());
            publishNotification.sendResponderAssignedNotification(assignedResponder);
            System.out.println("Successfully assigned and notified responder: " + assignedResponder.getId());
        } else {
            // Send no responder notification when no responder is available
            publishNotification.sendNoResponderNotification(alert);
            System.out.println("No responder available for alert at location: " + alert.getLocation());
        }
    }
}