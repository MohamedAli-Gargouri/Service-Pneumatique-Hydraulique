package com.www.sphtn.SPH.service;

import com.www.sphtn.SPH.DTO.Auth.*;
import com.www.sphtn.SPH.DTO.Errors.ErrorType;
import com.www.sphtn.SPH.DTO.Errors.ErrorsReader;
import com.www.sphtn.SPH.Exceptions.Auth.RegisterExceptions;
import com.www.sphtn.SPH.model.Role;
import com.www.sphtn.SPH.model.User;
import com.www.sphtn.SPH.model.dbFile;
import com.www.sphtn.SPH.repository.FileRepository;
import com.www.sphtn.SPH.repository.UserRepository;

import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AuthService {

    @Value("${spring.admin.defaultAdminUserName}")
    private String rootUsername;

    @Value("${spring.admin.defaultAdminFirstName}")
    private String rootFirstName;

    @Value("${spring.admin.defaultAdminLastName}")
    private String rootLastName;

    @Value("${spring.admin.defaultAdminPassword}")
    private String rootPassword;
    @Value("${spring.admin.defaultAdminEmail}")
    private String rootEmail;
    @Value("${spring.admin.defaultPhoneNumber}")
    private Integer rootPhoneNumber;
    @Value("${spring.admin.defaultAdminInternationalDialNumber}")
    private Integer rootInternationalDialNumber;

    private final BCryptPasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final FileRepository dbfileRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public ResponseEntity<Object> register(RegisterRequest request)
    {
        //Handling the application initialization.
        if(userRepository.findAll().isEmpty())
        {
            try
            {
                //Creating the default Image file
                Path defaultImgPath = Paths.get("src\\main\\resources\\static\\defaultProfilePicture.jpg");
                File file = new File(defaultImgPath.toUri()); // Adjust the path as needed
                if (!file.exists() || !file.isFile()) {
                    throw new IOException("File not found or is not a regular file.");
                }
                String fileName = file.getName();
                String fileExtension = fileName.substring(fileName.lastIndexOf('.'));
                long fileSize = file.length();
                byte[] fileBytes = Files.readAllBytes(file.toPath());

                dbFile DefaultProfileImageFile=dbFile.builder()
                        .name(fileName)
                        .deletedBy(null)
                        .deleteDateTime(null)
                        .isDeleted(false)
                        .createdBy(null)
                        .size(fileSize)
                        .fileBinary(fileBytes)
                        .extension(fileExtension)
                        .build();

                //Creating the Application Root User
                var SPHRoot= User.builder()
                        .userName(rootUsername)
                        .firstName(rootFirstName)
                        .lastName(rootLastName)
                        .email(rootEmail)
                        .password(passwordEncoder.encode(rootPassword))
                        .role(Role.ADMIN)
                        .createDateTime(new Date())
                        .isEnabled(true)
                        .isAccountNonLocked(true)
                        .phoneNumber(rootPhoneNumber)
                        .internationalDialNumber(rootInternationalDialNumber)
                        .profileImage(DefaultProfileImageFile)
                        .build();
                dbfileRepository.save(DefaultProfileImageFile);
                userRepository.save(SPHRoot);

            }
            catch (IOException e)
                {
                    System.out.println("------WARNING-----UNABLE TO LOAD DEFAULT PROFILE IMAGE");
                }

            
        }

        //Handling the registration
        try
        {
            if(userRepository.findByEmail(request.getEmail()).isPresent())
            {
                throw new RegisterExceptions.EmailUsedException();
            }
            if(userRepository.findByUsername(request.getUsername()).isPresent())
            {
                throw new RegisterExceptions.UserNameUsedException();
            }
            if(userRepository.findByPhoneNumber(request.getPhoneNumber(),request.getInternationalDialNumber()).isPresent())
            {
                throw new RegisterExceptions.PhoneUsedException();
            }
             dbFile defaultfile=dbfileRepository.getDefaultProfilePicture("defaultProfilePicture.jpg").get();
            if(dbfileRepository.getDefaultProfilePicture("defaultProfilePicture.jpg").isEmpty())
            {
                    throw new Exception("Error, DefaultProfilePicture is not found ");
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
                    .profileImage(dbfileRepository.getDefaultProfilePicture("defaultProfilePicture.jpg").get())
                    .build();
            userRepository.save(user);
            var jwtToken=jwtService.generateToken(user,false);
            return ResponseEntity.ok(RegisterResponse.builder().token(jwtToken).build());
        }
        catch(RegisterExceptions.EmailUsedException e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.AUTH_ERRORS).get("AUTH_ERROR04")
            );
        }
        catch(RegisterExceptions.UserNameUsedException e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.AUTH_ERRORS).get("AUTH_ERROR06")
            );
        }
        catch(RegisterExceptions.PhoneUsedException e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.AUTH_ERRORS).get("AUTH_ERROR05")
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
            var user=userRepository.findByUsername(request.getUsername())
                    .orElseThrow();
            System.out.println(request.getIsRememberMe());
            var jwtToken=jwtService.generateToken(user,request.getIsRememberMe());
            return ResponseEntity.ok(LoginResponse.builder().token(jwtToken).build());
        }
        catch(BadCredentialsException e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.AUTH_ERRORS).get("AUTH_ERROR01")
            );
        }
        catch(LockedException e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.AUTH_ERRORS).get("AUTH_ERROR02")
            );
        }
        catch(DisabledException e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.AUTH_ERRORS).get("AUTH_ERROR03")
            );
        }

    }

    public ResponseEntity<Object> VerifyAccessToken(VerifyAccessTokenRequest request){
        try
        {
            return  ResponseEntity.ok().body(VerifyAccessTokenResponse.builder()
                            .isTokenValid(jwtService.isTokenExpired(request.getToken()))
                            .build());
        }
        catch(UnsupportedJwtException e)
        {
            return ResponseEntity.badRequest().body(
                    VerifyAccessTokenResponse.builder()
                            .isTokenValid(false)
                            .Message(ErrorsReader.GetErrors(ErrorType.AUTH_ERRORS).get("AUTH_ERROR011")).build()
            );
        }
        catch(SignatureException e)
        {
            return ResponseEntity.badRequest().body(
                    VerifyAccessTokenResponse.builder()
                            .isTokenValid(false)
                            .Message(ErrorsReader.GetErrors(ErrorType.AUTH_ERRORS).get("AUTH_ERROR09")).build()
            );
        }
        catch(MalformedJwtException e)
        {
            return ResponseEntity.badRequest().body(
                    VerifyAccessTokenResponse.builder()
                            .isTokenValid(false)
                            .Message(ErrorsReader.GetErrors(ErrorType.AUTH_ERRORS).get("AUTH_ERROR012")).build()
            );
        }

    }

}
