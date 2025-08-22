package com.satyam.alert_service.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Alert {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private String location;
private String description;

private String type;

private LocalDateTime timestamp;
}
