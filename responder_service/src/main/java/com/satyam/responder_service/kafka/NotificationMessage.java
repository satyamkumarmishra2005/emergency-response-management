package com.satyam.responder_service.kafka;

import lombok.Data;

@Data

public class NotificationMessage {
    private String responderId;
    private String status; // Note: you have a typo here - should be "status"
    private String location;
    private String email;

    // Default constructor required for Jackson
    public NotificationMessage() {}

    // Getters and setters
    public String getResponderId() { return responderId; }
    public void setResponderId(String responderId) { this.responderId = responderId; }

    public String getStaus() { return status; }
    public void setStaus(String staus) { this.status = staus; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    @Override
    public String toString() {
        return "NotificationMessage{" +
                "responderId='" + responderId + '\'' +
                ", status='" + status + '\'' +
                ", location='" + location + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
