package com.satyam.User_Service.controller;

import com.satyam.User_Service.dto.RegisterRequest;
import com.satyam.User_Service.model.User;
import com.satyam.User_Service.service.KeycloakUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final KeycloakUserService registrationService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        registrationService.registerUser(request);
        return ResponseEntity.ok("User registered successfully!");
    }
     @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers(){
       List<User> users = registrationService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}