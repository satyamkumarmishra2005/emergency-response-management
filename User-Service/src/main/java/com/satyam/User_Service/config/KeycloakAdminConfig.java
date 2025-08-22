package com.satyam.User_Service.config;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KeycloakAdminConfig {
    @Value("${keycloak.admin.username}")
    private String adminUsername;

    @Value("${keycloak.admin.password}")
    private String adminPassword;
    @Value("${keycloak.server.url}")
    private String serverUrl;

    @Value("${keycloak.server.realm}")
    private String realm;

    @Value("${keycloak.client.secret}")
    private String clientSecret;

    @Bean
    public Keycloak keycloak(){
        return KeycloakBuilder.builder()
                .serverUrl(serverUrl)
                .realm(realm)
                .username(adminUsername)
                .password(adminPassword)
                .clientId("user-service-client")
                .clientSecret(clientSecret)
                .grantType("client_credentials")
                .build();
    }
}
