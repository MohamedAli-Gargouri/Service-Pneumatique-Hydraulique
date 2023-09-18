package com.www.sphtn.SPH.controller;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler {

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    private static class ControllerError
    {
        private final String errorCode="CONTROLLER_ERROR";
        private String errorMessage;
        private String errorDetails;

    }
    @ExceptionHandler(MissingPathVariableException.class)
    public ResponseEntity<ControllerError> handleMissingPathVariable(MissingPathVariableException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ControllerError.builder()
                .errorMessage("Missing variable")
                .errorDetails("Path variable '" + ex.getVariableName() + "' is missing.")
                .build());
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ControllerError> HandleMethodNotSupported(HttpRequestMethodNotSupportedException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ControllerError.builder()
                .errorMessage("Wrong Path")
                .errorDetails(ex.getMessage())
                .build());
    }
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ControllerError> HandleMessageNotReadableException(HttpMessageNotReadableException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ControllerError.builder()
                .errorMessage("Request Body malformed.")
                .errorDetails("Wrong body format, please check the required JSON Object for this request, NOTE if you have a binary field, it must be encoded to base64!")
                .build());
    }

}



