package com.satyam.notification_service.model;

import lombok.Data;

@Data
public class NotificationMessage {
    private String responderId;
    private String staus;
    private String location;
    private String  email;

    @Override
    public String toString() {
        return "NotificationMessage{" +
                "responderId='" + responderId + '\'' +
                ", status='" + staus + '\'' +
                ", location='" + location + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

}
