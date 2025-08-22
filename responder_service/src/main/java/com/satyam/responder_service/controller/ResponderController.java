package com.satyam.responder_service.controller;

import com.satyam.responder_service.kafka.Alert;
import com.satyam.responder_service.model.Responder;
import com.satyam.responder_service.model.StatusUpdateDTO;
import com.satyam.responder_service.service.ResponderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/responder/api")

public class ResponderController {

    @Autowired
    ResponderService responderService;

    @GetMapping("/all")
    public ResponseEntity<List<Responder>> getAllResponder(){
        return new ResponseEntity<>(responderService.getAllResponders(), HttpStatus.OK);
    }

    @GetMapping("/responder/{id}")
    public ResponseEntity<Responder> getResponder(@PathVariable Long id){
        return new ResponseEntity<>(responderService.getResponderById(id),HttpStatus.OK);

    }

    @PostMapping("/add")
    public ResponseEntity<Responder> addResponder(@RequestBody Responder responder){
        return new ResponseEntity<>(responderService.addResponder(responder),HttpStatus.CREATED);
    }

    @PostMapping("/assign")
    public ResponseEntity<Responder> assignResponder(@RequestBody Alert alert){
        responderService.assignResponder(alert);
        return new ResponseEntity<>(HttpStatus.OK );
    }

    @PatchMapping("/update/{id}") // use patch for partial update
    public ResponseEntity<Responder> updateResponder(@PathVariable Long id  , @RequestBody StatusUpdateDTO request ){
        return new ResponseEntity<>(responderService.updateResponder(id, request.getStatus()), HttpStatus.ACCEPTED);
    }



}
