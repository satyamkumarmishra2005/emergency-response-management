package com.satyam.User_Service.dto;

import com.satyam.User_Service.model.UserRole;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    @Email
    @Column(unique = true, nullable = false)
    private String email;

    private String password;
    @Enumerated(EnumType.STRING)
    private UserRole role;
    private String specialization;
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Invalid phone number")
    private String phoneNumber;
    private String location;

}
