package com.www.sphtn.SPH.configuration;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;
import org.springframework.http.HttpStatus;
import java.io.IOException;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        // You can customize the response message based on your requirements.
        String errorMessage = "Access denied: " + accessDeniedException.getMessage();
        response.setStatus(HttpStatus.FORBIDDEN.value());
        response.getWriter().write(errorMessage);
    }
}
