package com.www.sphtn.SPH.service;

import com.www.sphtn.SPH.Exceptions.Users.UserExceptions;
import com.www.sphtn.SPH.model.User;
import com.www.sphtn.SPH.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository repository;
    //*===================THIS METHOD IS USED BY SPRING SECURITY, DO NOT TOUCH*==================//
    public User loadUserByUsername(String username) throws UsernameNotFoundException
    {
    return repository.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("Username Not found"));
    }


    public List<User> findAllUsers_PasswordHidden()
    {
             return repository.findAllUsersExcludingPassword();
    }



    public User getUserById(String userId) throws UserExceptions.UserNotFound {

        if (repository.findById(userId).isPresent()) {
            return repository.findById(userId).get();
        }
        else {
           throw new UserExceptions.UserNotFound();
        }
    }


    public User updateUser(User updatedUser)
    {
       User existingUser= repository.findById(updatedUser.getId()).get();
       existingUser.setFirstName(updatedUser.getFirstName());
       existingUser.setLastName(updatedUser.getLastName());
       existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
       return repository.save(existingUser);
    }
    public String deleteUser(String userId)
    {
       repository.deleteById(userId);
       return userId+"User deleted";
    }
}
