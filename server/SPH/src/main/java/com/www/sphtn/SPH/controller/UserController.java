package com.www.sphtn.SPH.controller;

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

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody User user)
    {
        return service.addUser(user);
    }

    @GetMapping
    public List<User> getUsers()
    {
        return service.findAllUsers();
    }

    @GetMapping("/hellworld")
    public ResponseEntity Hellworld()
    {
        return ResponseEntity.ok().body("Hello world");
    }
    @GetMapping("/{userID}")
    public User getUser(@PathVariable String userID)
    {
        return service.getUserById(userID);
    }

    @GetMapping("/firstName/{firstName}")
    public List<User> findUserByFirstName(@PathVariable String LastName)
    {
        return service.getUserbyLastName(LastName);

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

