package com.www.sphtn.SPH.DTO.Auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class isTokenExpiredResponse {
    private boolean isTokenExpired;
    private Object Message;
}


