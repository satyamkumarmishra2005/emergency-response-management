package com.satyam.responder_service.repository;

import com.satyam.responder_service.model.Responder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResponderRepository extends JpaRepository<Responder , Long> {

    List<Responder> findByTypeAndStatusAndLocation(String type, String status , String location);


}
