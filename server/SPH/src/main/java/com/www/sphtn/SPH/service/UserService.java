package com.www.sphtn.SPH.service;

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
    public User loadUserByEmail(String email) throws UsernameNotFoundException
    {
        return repository.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("UserEmail Not found"));
    }

    public User loadUserByUsername(String username) throws UsernameNotFoundException
    {
    return repository.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("Username Not found"));
    }
    public User findUserById(String id) throws UsernameNotFoundException
    {
        return repository.findById(id).orElseThrow(()->new UsernameNotFoundException("user id Not found"));
    }

    public User addUser( User user)
    {
        user.setId(UUID.randomUUID().toString().split("-")[0]);
        return repository.save(user);
    }
    public List<User> findAllUsers()
    {
             return repository.findAll();
    }
    public User getUserById(String userId)
    {
        return repository.findById(userId).get();
    }

    public List<User> getUserbyLastName(String lastName)
    {
        return repository.findByLastName(lastName);
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
