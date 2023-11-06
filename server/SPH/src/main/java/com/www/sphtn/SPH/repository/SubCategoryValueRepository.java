package com.www.sphtn.SPH.repository;

import com.www.sphtn.SPH.model.Category;
import com.www.sphtn.SPH.model.SubCategory;
import com.www.sphtn.SPH.model.SubCategoryValue;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SubCategoryValueRepository extends MongoRepository<SubCategoryValue,String> {
    @Query("{value:?0, subCategory: ?1}")
    Optional<SubCategory> findByNameAndSubCategory(String value, String subCategory);
    //Optional<List<SubCategoryValue>> findBySubCategory_Category(Category Category);

    @Query("{ 'subCategory.category':?0 }")
    List<SubCategoryValue> findByCategory(String categoryId);
}
