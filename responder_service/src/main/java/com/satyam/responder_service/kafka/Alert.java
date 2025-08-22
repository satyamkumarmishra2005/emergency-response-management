package com.satyam.responder_service.kafka;

import lombok.Data;

@Data
public class Alert {
    private String location;
    private String description;

    private String type;

}
