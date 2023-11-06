package com.www.sphtn.SPH.service;

import com.www.sphtn.SPH.DTO.User.ModifyUserRequest;
import com.www.sphtn.SPH.Exceptions.Users.UserExceptions;
import com.www.sphtn.SPH.model.User;
import com.www.sphtn.SPH.model.dbFile;
import com.www.sphtn.SPH.repository.FileRepository;
import com.www.sphtn.SPH.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private  PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository repository;
    @Autowired
    private FileRepository fileRepository;
    //*===================THIS METHOD IS USED BY SPRING SECURITY, DO NOT TOUCH*==================//
    public User loadUserByUsername(String username) throws UsernameNotFoundException
    {
    return repository.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("Username Not found"));
    }


    public User getUserById(String userId) throws UserExceptions.UserNotFound {

        if (repository.findById(userId).isPresent()) {
            return repository.findById(userId).get();
        }
        else {
           throw new UserExceptions.UserNotFound();
        }
    }


    public User updateUser(ModifyUserRequest request) throws UserExceptions.EmailExists,UserExceptions.PhoneNumberExists,UserExceptions.UserNotFound
    {
        //Test if Email is used
        if(repository.findByEmail(request.getEmail()).isPresent())
        {
            if(!repository.findByEmail(request.getEmail()).get().getId().equals(request.getId()))
            {throw new UserExceptions.EmailExists();}
        }
        if(repository.findByPhoneNumber(request.getPhoneNumber(), request.getInternationalDialNumber()).isPresent())
        {
            if(!repository.findByPhoneNumber(request.getPhoneNumber(), request.getInternationalDialNumber()).get().getId().equals(request.getId()))
            {throw new UserExceptions.PhoneNumberExists();}
        }
        User existingUser = repository.findById(request.getId()).get();
        existingUser.setFirstName(request.getFirstName());
        existingUser.setLastName(request.getLastName());
        existingUser.setPhoneNumber(request.getPhoneNumber());

        //Verifying if the img is sent to be updated.
        if (!request.getProfileImg().getName().isEmpty() && request.getProfileImg().getExtension().isEmpty() && request.getProfileImg().getFileBinary() != null) {
            //Updating the img if the conditions are met
            dbFile new_File = dbFile.builder()
                    .name(request.getProfileImg().getName())
                    .size(request.getProfileImg().getSize())
                    .fileBinary(request.getProfileImg().getFileBinary())
                    .extension(request.getProfileImg().getExtension())
                    .build();

            fileRepository.save(new_File);
            existingUser.setProfileImage(new_File);
        }
        existingUser.setEmail(request.getEmail());
        existingUser.setPhoneNumber(request.getPhoneNumber());
        existingUser.setInternationalDialNumber(request.getInternationalDialNumber());
        existingUser.setPassword(passwordEncoder.encode(request.getPassword()));
        return repository.save(existingUser);
    }
    public void deleteUser(String userId)
    {

        repository.deleteById(userId);
    }
}
