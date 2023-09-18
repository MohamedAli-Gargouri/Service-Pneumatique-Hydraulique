package com.www.sphtn.SPH.repository;

import com.www.sphtn.SPH.model.Product;
import com.www.sphtn.SPH.model.User;
import com.www.sphtn.SPH.model.dbFile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends MongoRepository<Product,String> {
    @Query("{productCode:?0}")
    Optional<Product> findByProductCode(Long productCode);
}
