package com.satyam.User_Service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/users/register").permitAll() // ✅ Allow register endpoint
                 .requestMatchers("/api/users/all").hasRole("ADMIN")
               //    .requestMatchers("/api/users/all").hasAuthority("ADMIN")

                    .anyRequest().authenticated() // other endpoints require auth
            )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter()))
                );

//                .oauth2ResourceServer(oauth2 -> oauth2
//                        .jwt(jwt -> {}) // ✅ New style: provide empty config block if no customizations
//                );

        return http.build();
    }

//    private JwtAuthenticationConverter jwtAuthenticationConverter() {
//        JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
//       // grantedAuthoritiesConverter.setAuthorityPrefix("");
//        grantedAuthoritiesConverter.setAuthorityPrefix("");
//
//        grantedAuthoritiesConverter.setAuthoritiesClaimName("resource_access.user-service-client.roles");
//
//        JwtAuthenticationConverter jwtConverter = new JwtAuthenticationConverter();
//        jwtConverter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);
//        System.out.println(jwtConverter);
//        return jwtConverter;
//    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter converter = new JwtGrantedAuthoritiesConverter();
        converter.setAuthoritiesClaimName("resource_access");
        converter.setAuthorityPrefix("ROLE_");

        JwtAuthenticationConverter jwtConverter = new JwtAuthenticationConverter();
        jwtConverter.setJwtGrantedAuthoritiesConverter(jwt -> {
            Collection<GrantedAuthority> authorities = new ArrayList<>();

            Map<String, Object> resourceAccess = jwt.getClaim("resource_access");
            if (resourceAccess != null) {
                Map<String, Object> clientAccess = (Map<String, Object>) resourceAccess.get("user-service-client");
                if (clientAccess != null && clientAccess.containsKey("roles")) {
                    List<String> roles = (List<String>) clientAccess.get("roles");
                    roles.forEach(role -> authorities.add(new SimpleGrantedAuthority("ROLE_" + role)));
                }
            }

            return authorities;
        });

        return jwtConverter;
    }

}

