package com.www.sphtn.SPH.repository;

import com.www.sphtn.SPH.model.Rating;
import com.www.sphtn.SPH.model.SubCategory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface RateRepository extends MongoRepository<Rating,String> {
    @Query("{user:?0, product: ?1}")
    Optional<Rating> findByProductUser(String userId, String productId);
}
