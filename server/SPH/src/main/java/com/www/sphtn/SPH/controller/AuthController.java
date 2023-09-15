package com.www.sphtn.SPH.controller;


import com.www.sphtn.SPH.DTO.Auth.*;
import com.www.sphtn.SPH.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody RegisterRequest request)
    {
        return authService.register(request);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest request)
    {
              System.out.println(request);
        return authService.authenticate(request);
    }
    @PostMapping("/VerifyAccessToken")
    public ResponseEntity<Object> VerifyAccessToken(@RequestBody VerifyAccessTokenRequest request)
    {
        return authService.VerifyAccessToken(request);
    }
}
