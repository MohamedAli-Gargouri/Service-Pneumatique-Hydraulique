package com.www.sphtn.SPH.controller;

import com.www.sphtn.SPH.DTO.Errors.ErrorType;
import com.www.sphtn.SPH.DTO.Errors.ErrorsReader;
import com.www.sphtn.SPH.Exceptions.Notification.NotificationExceptions;
import com.www.sphtn.SPH.Exceptions.Users.UserExceptions;
import com.www.sphtn.SPH.model.Notification;
import com.www.sphtn.SPH.repository.NotificationRepository;
import com.www.sphtn.SPH.repository.ProductRepository;
import com.www.sphtn.SPH.repository.UserRepository;
import com.www.sphtn.SPH.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/Notification")
@RequiredArgsConstructor
public class NotificationController {

    @Autowired
     private NotificationRepository repository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private JwtService jwtService;
    @GetMapping("/all")
    public ResponseEntity<Object>  getAllNotifications(
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "0") int Page,
            @RequestParam(defaultValue = "false") boolean getAll)
    {
        if(getAll)
        {
            return ResponseEntity.ok().body(repository.findAll());
        }
        else
        {
            PageRequest pageable =  PageRequest.of(Page, size);
            return ResponseEntity.ok().body(repository.findAll((PageRequest) pageable));
        }

    }

    @GetMapping
    public ResponseEntity<Object>  getNotification( @RequestParam String notificationId)
    {
        try {
            Optional<Notification> notification = repository.findById(notificationId);
            if (notification.isPresent()) {
                return ResponseEntity.ok().body(notification.get());
            } else {
                throw new NotificationExceptions.NotificationNotFound();
            }
        }
        catch(NotificationExceptions.NotificationNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.NOTIFICATION_ERRORS).get("NOTIFICATION_ERROR01"));
        }

    }

    @GetMapping("/user")
    public ResponseEntity<Object>  getUserNotifications( @RequestParam String userId,
                                                         @RequestParam(defaultValue = "5") int size,
                                                         @RequestParam(defaultValue = "0") int Page)
    {
        try {
            if(userRepository.findById(userId).isEmpty())
            {
                throw new UserExceptions.UserNotFound();
            }
            PageRequest pageable =  PageRequest.of(Page, size);
            return ResponseEntity.ok().body(repository.findByUser(userId,pageable));
        }
        catch(UserExceptions.UserNotFound e)
        {
            System.out.println(ErrorsReader.GetErrors(ErrorType.USER_ERRORS));
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.USER_ERRORS).get("USER_ERROR01"));
        }

    }

    @DeleteMapping
    public ResponseEntity<Object>  DeleteNotification( @RequestParam String notificationId)
    {
        try {
            Optional<Notification> notification = repository.findById(notificationId);
            if (notification.isPresent()) {
                repository.deleteById(notificationId);
                return ResponseEntity.ok().body("Notification Deleted.");
            } else {
                throw new NotificationExceptions.NotificationNotFound();
            }
        }
        catch(NotificationExceptions.NotificationNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.NOTIFICATION_ERRORS).get("NOTIFICATION_ERROR01"));
        }

    }





}

