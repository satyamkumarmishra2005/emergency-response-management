package com.satyam.User_Service.service;

import com.satyam.User_Service.dto.RegisterRequest;
import com.satyam.User_Service.model.User;
import com.satyam.User_Service.model.UserRole;
import com.satyam.User_Service.repository.UserRepository;
import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class KeycloakUserService {

    @Value("${keycloak.server.realm}")
    private String realm;

    @Autowired
    private Keycloak keycloak;

    @Autowired
    private UserRepository userRepository;


   public void registerUser(RegisterRequest request){
       // 1, Create user in Keycloak
       UserRepresentation user = new UserRepresentation();
       String username = request.getName().toLowerCase().replaceAll("\\s+", "_");
       user.setUsername(username);
       // user.setUsername(request.getName());
      // user.setUsername(request.getEmail()); // or sanitize the name
       user.setEmail(request.getEmail());
       user.setEnabled(true);

       CredentialRepresentation credential = new CredentialRepresentation();
       credential.setTemporary(false);
       credential.setType(CredentialRepresentation.PASSWORD);
       credential.setValue(request.getPassword());
       user.setCredentials(List.of(credential));
       // Use the role provided in the request
       List<String> roleNames = List.of(request.getRole().name());
       user.setRealmRoles(roleNames); // assigns role to the user in Keycloak


       Response response = keycloak.realm(realm).users().create(user);
       if(response.getStatus()!= 201){
           throw  new RuntimeException("Keycloak Server returned HTTP status "+response.getStatus());

       }

       String keycloakId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");

       // Now assign client role
       String clientId = keycloak.realm(realm)
               .clients()
               .findByClientId("user-service-client")
               .get(0)
               .getId();

// Map your enum role to string — like ROLE_CITIZEN
     //  String roleToAssign = "ROLE_" + request.getRole().name();  // e.g. ROLE_CITIZEN
       String roleToAssign = request.getRole().name();  // Remove ROLE_ prefix if not in Keycloak


// Fetch the role from Keycloak
       RoleRepresentation clientRole = keycloak.realm(realm)
               .clients()
               .get(clientId)
               .roles()
               .get(roleToAssign)
               .toRepresentation();

// Assign it to the user
       keycloak.realm(realm)
               .users()
               .get(keycloakId)
               .roles()
               .clientLevel(clientId)
               .add(List.of(clientRole));
       // 2. Save metadata in DB
       User userEntity = new User();
       userEntity.setKeycloakId(keycloakId);
       userEntity.setEmail(request.getEmail());
       userEntity.setName(request.getName());
       userEntity.setRole(request.getRole());
       userEntity.setPhoneNumber(request.getPhoneNumber());
       userEntity.setLocation(request.getLocation());
       userEntity.setSpecialization(request.getSpecialization());

       userRepository.save(userEntity);

   }


    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users;
    }
}

