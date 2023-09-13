package com.www.sphtn.SPH.service;

import com.www.sphtn.SPH.DTO.Auth.LoginRequest;
import com.www.sphtn.SPH.DTO.Auth.LoginResponse;
import com.www.sphtn.SPH.DTO.Auth.RegisterRequest;
import com.www.sphtn.SPH.DTO.Auth.RegisterResponse;
import com.www.sphtn.SPH.DTO.Errors.Error;
import com.www.sphtn.SPH.DTO.Errors.ErrorsReader;
import com.www.sphtn.SPH.Exceptions.Auth.RegisterExceptions;
import com.www.sphtn.SPH.model.Role;
import com.www.sphtn.SPH.model.User;
import com.www.sphtn.SPH.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository repository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public ResponseEntity<Object> register(RegisterRequest request)
    {
        try
        {
            if(repository.findByEmail(request.getEmail()).isPresent())
            {
                throw new RegisterExceptions.EmailUsedException();
            }
            if(repository.findByUsername(request.getUsername()).isPresent())
            {
                throw new RegisterExceptions.UserNameUsedException();
            }
            if(repository.findByPhoneNumber(request.getPhoneNumber(),request.getInternationalDialNumber()).isPresent())
            {
                throw new RegisterExceptions.PhoneUsedException();
            }
            var user= User.builder()
                    .userName(request.getUsername())
                    .firstName(request.getFirstname())
                    .lastName(request.getLastname())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.USER)
                    .createDateTime(new Date())
                    .isEnabled(true)
                    .isAccountNonLocked(true)
                    .phoneNumber(request.getPhoneNumber())
                    .internationalDialNumber(request.getInternationalDialNumber())
                    .build();
            repository.save(user);
            var jwtToken=jwtService.generateToken(user);
            return ResponseEntity.ok(RegisterResponse.builder().token(jwtToken).build());
        }
        catch(RegisterExceptions.EmailUsedException e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors().get("AUTH_ERROR04")
            );
        }
        catch(RegisterExceptions.UserNameUsedException e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors().get("AUTH_ERROR06")
            );
        }
        catch(RegisterExceptions.PhoneUsedException e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors().get("AUTH_ERROR05")
            );
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(e);
        }

    }
    public ResponseEntity<Object> authenticate(LoginRequest request){
        try
        {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword())
            );
            var user=repository.findByUsername(request.getUsername())
                    .orElseThrow();
            var jwtToken=jwtService.generateToken(user);
            return ResponseEntity.ok(LoginResponse.builder().token(jwtToken).build());
        }
        catch(BadCredentialsException e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors().get("AUTH_ERROR01")
            );
        }
        catch(LockedException e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors().get("AUTH_ERROR02")
            );
        }
        catch(DisabledException e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors().get("AUTH_ERROR03")
            );
        }

    }

}
