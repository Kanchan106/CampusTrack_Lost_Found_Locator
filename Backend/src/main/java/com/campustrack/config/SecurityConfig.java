package com.campustrack.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // ✅ disable CSRF
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/items/report").permitAll() // ✅ allow POST to /report
                        .requestMatchers("/api/items").permitAll()        // ✅ allow GET to /items
                        .anyRequest().permitAll()                         // ✅ allow everything else for now
                );
        return http.build();
    }
}
