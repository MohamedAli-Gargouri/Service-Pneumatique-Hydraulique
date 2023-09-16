package com.www.sphtn.SPH.repository;

import com.www.sphtn.SPH.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User,String> {

    @Query("{userName:?0}")
    Optional<User> findByUsername(String userName);
    @Query("{email:?0}")
    Optional<User> findByEmail(String email);
    @Query("{phoneNumber: ?0 , internationalDialNumber :?1}")
    Optional<User> findByPhoneNumber(int phoneNumber,int internationalDialNumber);
    @Query("{lastName:?0}")
    List<User> findByLastName(String lastName);
    @Query(value = "{}", fields = "{ 'password' : 0 }")
    List<User> findAllUsersExcludingPassword();

}
