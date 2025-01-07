package com.BanAccLQ.BanAccLQ.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Cấu hình bảo mật: Cho phép tất cả các API không cần xác thực
        http
                .csrf(csrf -> csrf.disable())  // Tắt CSRF protection
                .authorizeHttpRequests(authz ->
                        authz.anyRequest().permitAll() // Cho phép tất cả các yêu cầu không cần xác thực
                );

        return http.build();
    }
}
