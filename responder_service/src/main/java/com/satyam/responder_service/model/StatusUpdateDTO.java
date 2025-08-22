package com.satyam.responder_service.model;

import lombok.Data;

@Data
public class StatusUpdateDTO {
    private String status;

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
}
