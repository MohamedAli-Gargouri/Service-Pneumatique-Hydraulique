package com.www.sphtn.SPH.DTO.Errors;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ErrorConfig {

    @Bean
    public Error customError() {
        // Initialize your Error bean here as needed
        return Error.builder()
                .errorCode("CUSTOM_CODE")
                .errorMessage("Custom Error Message")
                .errorDetails("Custom Details")
                .build();
    }
}
