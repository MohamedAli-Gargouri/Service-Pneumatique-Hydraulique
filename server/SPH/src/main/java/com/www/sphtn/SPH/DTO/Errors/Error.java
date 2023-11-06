package com.www.sphtn.SPH.DTO.Errors;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Data
@Builder
public class Error {

    private String errorCode;
    private String errorMessage;
    private String errorDetails;
    @JsonCreator
    public Error(@JsonProperty("errorCode") String errorCode,
                 @JsonProperty("errorDetails") String errorDetails,
                 @JsonProperty("errorMessage") String errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.errorDetails = errorDetails;
    }
}


