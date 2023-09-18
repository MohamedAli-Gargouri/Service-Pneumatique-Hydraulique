package com.www.sphtn.SPH.controller;

import com.www.sphtn.SPH.DTO.Errors.Error;
import com.www.sphtn.SPH.DTO.Errors.ErrorType;
import com.www.sphtn.SPH.DTO.Errors.ErrorsReader;
import com.www.sphtn.SPH.DTO.User.ModifyUserRequest;
import com.www.sphtn.SPH.Exceptions.General.MissingParam;
import com.www.sphtn.SPH.Exceptions.Users.UserExceptions;
import com.www.sphtn.SPH.model.User;
import com.www.sphtn.SPH.repository.UserRepository;
import com.www.sphtn.SPH.service.UserService;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService service;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository repository;

    @GetMapping("/all")
    public ResponseEntity<Page<User>> getUsers(@RequestParam(defaultValue = "5") int size,
                                               @RequestParam(defaultValue = "0") int Page)
    {
        PageRequest pageable =  PageRequest.of(Page, size);
        return ResponseEntity.ok().body(repository.findAll(pageable));
    }

    @GetMapping
    public ResponseEntity<Object> getUser(@PathParam("userId") String userId)
    {
        try
        {
            if(userId==null)
            {
                throw new MissingParam();
            }

            return ResponseEntity.ok().body(service.getUserById(userId));
        }
        catch( MissingParam e)
        {
            Error MissingParmError= Error.builder()
                    .errorCode("PARAM_ERROR")
                    .errorMessage("Param 'userId' is missing. ")
                    .errorDetails("You need to include the userId param in your header, make sure its not null")
                    .build();
            return ResponseEntity.badRequest().body(MissingParmError);
        }
        catch(UserExceptions.UserNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.USER_ERRORS).get("USER_ERROR01"));
        }
        catch (Exception e)
        {
            System.out.println(e);
            return ResponseEntity.ok().body(ErrorsReader.GetErrors(ErrorType.USER_ERRORS).get("USER_ERROR00"));
        }


    }


    @PutMapping
    public ResponseEntity<Object> modifyUser(@RequestBody ModifyUserRequest request)
    {
        try
        {
            if(passwordEncoder.matches(request.getConfirm_Password(), service.getUserById(request.getId()).getPassword()))
            {
                return ResponseEntity.ok().body(service.updateUser(request));
            }
            else
            {
                throw new UserExceptions.WrongConfirmPassword();
            }
        }
        catch(UserExceptions.UserNotFound | UsernameNotFoundException e )
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.USER_ERRORS).get("USER_ERROR01"));
        }
          catch(UserExceptions.WrongConfirmPassword e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.USER_ERRORS).get("USER_ERROR02"));
        }
        catch(UserExceptions.EmailExists e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.USER_ERRORS).get("USER_ERROR03"));
        }
        catch(UserExceptions.PhoneNumberExists e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.USER_ERRORS).get("USER_ERROR04"));
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.USER_ERRORS).get("USER_ERROR00"));
        }

    }
    @DeleteMapping
    public ResponseEntity<Object> deleteUser (@PathParam("userId") String userId)
    {
        try
        {
            if(userId==null)
            {
                throw new MissingParam();
            }
            service.getUserById(userId);
            service.deleteUser(userId);
            return ResponseEntity.ok().body("User Deleted");
        }
        catch( MissingParam e)
        {
            Error MissingParmError= Error.builder()
                    .errorCode("PARAM_ERROR")
                    .errorMessage("Param 'userId' is missing. ")
                    .errorDetails("You need to include the userId param in your header, make sure its not null")
                    .build();
            return ResponseEntity.badRequest().body(MissingParmError);
        }
        catch(UserExceptions.UserNotFound | UsernameNotFoundException e )
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.USER_ERRORS).get("USER_ERROR01"));
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.USER_ERRORS).get("USER_ERROR00"));
        }

    }


}

