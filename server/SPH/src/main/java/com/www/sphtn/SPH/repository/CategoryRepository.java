package com.www.sphtn.SPH.repository;

import com.www.sphtn.SPH.model.Category;
import com.www.sphtn.SPH.model.Product;
import com.www.sphtn.SPH.model.dbFile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends MongoRepository<Category,String> {
    @Query("{name:?0}")
    Optional<Category> findByName(String Name);
}
