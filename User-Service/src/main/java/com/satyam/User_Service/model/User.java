package com.satyam.User_Service.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String keycloakId;

    private String name;

    private String email;

    private String phoneNumber;

    private String address;

    private String location;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    private Boolean isAvailable;

    private String specialization;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;


}
