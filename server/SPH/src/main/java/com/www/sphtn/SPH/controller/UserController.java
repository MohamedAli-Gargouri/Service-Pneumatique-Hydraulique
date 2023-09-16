package com.www.sphtn.SPH.controller;

import com.www.sphtn.SPH.DTO.Errors.ErrorType;
import com.www.sphtn.SPH.DTO.Errors.ErrorsReader;
import com.www.sphtn.SPH.Exceptions.Users.UserExceptions;
import com.www.sphtn.SPH.model.User;
import com.www.sphtn.SPH.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping
    public List<User> getUsers()
    {
        return service.findAllUsers_PasswordHidden();
    }

    @GetMapping("/{userID}")
    public ResponseEntity<Object> getUser(@PathVariable String userID)
    {
        try
        {
            return ResponseEntity.ok().body(service.getUserById(userID));
        }
        catch(UserExceptions.UserNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.USER_ERRORS).get("USER_ERROR01"));
        }
        catch (Exception e)
        {
            return ResponseEntity.ok().body(ErrorsReader.GetErrors(ErrorType.USER_ERRORS).get("USER_ERROR00"));
        }


    }


    @PutMapping
    public User modifyUser(@RequestBody User user)
    {
        return service.updateUser(user);
    }

    @DeleteMapping("/{userID}")
    public String deleteUser (@PathVariable String userId)
    {
        return service.deleteUser(userId);
    }


}

