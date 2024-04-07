package com.www.sphtn.SPH.repository;

import com.www.sphtn.SPH.model.Product;
import com.www.sphtn.SPH.model.User;
import com.www.sphtn.SPH.model.dbFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends MongoRepository<Product,String> {
    @Query("{productCode:?0}")
    Optional<Product> findByProductCode(Long productCode);
    @Query("{'$expr': {'$lt': [{'$add': ['$storeQuantity', '$stockQuantity']}, ?0]}}")
    Page<Product> findByStoreQuantityPlusStockQuantityLessThan(int threshold, PageRequest pageable);

    @Query("{'$expr': {'$gt': [{'$add': ['$storeQuantity', '$stockQuantity']}, ?0]}}")
    Page<Product> findByStoreQuantityPlusStockQuantityGreaterThan(int threshold, PageRequest pageable);

    @Query("{$text: {$search: ?0}}")
    Page<Product> findAllBy(TextCriteria textCriteria, PageRequest pageable);

}
