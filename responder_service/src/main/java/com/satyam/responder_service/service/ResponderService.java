package com.satyam.responder_service.service;

import com.satyam.responder_service.kafka.Alert;
import com.satyam.responder_service.model.Responder;
import com.satyam.responder_service.repository.ResponderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResponderService {

    @Autowired
    private ResponderRepository responderRepository;

    public Responder assignResponder(Alert alert ){
        List<Responder> availableResponders = responderRepository.findByTypeAndStatusAndLocation(alert.getType(), "AVAILABLE" , alert.getLocation());
        if(!availableResponders.isEmpty()){
            Responder assigned = availableResponders.get(0);
            assigned.setStatus("ASSIGNED");
          Responder updated =  responderRepository.save(assigned);


            System.out.println("Assigned responder:" + assigned.getId() + "for location" + alert.getLocation());
            return updated;
        } else {
            System.out.println("No available responder for type " + alert.getType() + " at location " + alert.getLocation());
            return null ; // Fixed: Added missing return statement
        }

    }

    public List<Responder> getAllResponders(){
        return responderRepository.findAll();
    }

    public Responder getResponderById(Long id){
        return responderRepository.findById(id).orElseThrow(()-> new RuntimeException("Responder not found"));
    }

    public Responder addResponder(Responder responder){
        responder.setStatus("AVAILABLE");
        return responderRepository.save(responder);
    }

    public Responder updateResponder(Long id ,  String status){
        Responder responder = responderRepository.findById(id).orElseThrow(()-> new RuntimeException("Responder not found"));
        responder.setStatus(status);
        return responderRepository.save(responder);
    }

}
