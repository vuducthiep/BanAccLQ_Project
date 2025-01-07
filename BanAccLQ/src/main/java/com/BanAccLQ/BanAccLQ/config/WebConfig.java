package com.BanAccLQ.BanAccLQ.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Cấu hình để cho phép tất cả các endpoint
                .allowedOrigins("http://localhost:5173") // Cho phép yêu cầu từ cổng frontend (React)
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Các phương thức HTTP được phép
                .allowedHeaders("*") // Cho phép tất cả các header
                .allowCredentials(true); // Cho phép cookie nếu cần
    }
}
