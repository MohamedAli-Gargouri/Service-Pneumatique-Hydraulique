package com.www.sphtn.SPH.DTO.Auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VerifyAccessTokenResponse {
    private boolean isTokenValid;
    private Object Message;
}


