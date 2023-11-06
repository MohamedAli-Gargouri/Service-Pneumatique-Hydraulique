package com.www.sphtn.SPH.repository;

import com.www.sphtn.SPH.model.SubCategory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface SubCategoryRepository extends MongoRepository<SubCategory,String> {
    @Query("{name:?0, category: ?1}")
    Optional<SubCategory> findByNameAndCategory(String name, String category);

}
