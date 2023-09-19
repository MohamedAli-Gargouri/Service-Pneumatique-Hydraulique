package com.www.sphtn.SPH.controller;

import com.www.sphtn.SPH.DTO.Category.CreateSubCategoryRequest;
import com.www.sphtn.SPH.DTO.Category.EditSubCategoryRequest;
import com.www.sphtn.SPH.DTO.Errors.ErrorType;
import com.www.sphtn.SPH.DTO.Errors.ErrorsReader;
import com.www.sphtn.SPH.Exceptions.Category.CategoryExceptions;
import com.www.sphtn.SPH.Exceptions.General.MissingParam;
import com.www.sphtn.SPH.model.SubCategory;
import com.www.sphtn.SPH.repository.CategoryRepository;
import com.www.sphtn.SPH.repository.ProductRepository;
import com.www.sphtn.SPH.repository.SubCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/v1/subCategory")
@RequiredArgsConstructor
public class SubCategoryController {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private SubCategoryRepository repository;
    @Autowired
    private CategoryRepository categoryrepository;
    @GetMapping("/all")
    public ResponseEntity<Page<SubCategory>>  getSubCategories(
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "0") int Page)
    {
        PageRequest pageable =  PageRequest.of(Page, size);
        return ResponseEntity.ok().body(repository.findAll(pageable));
    }

    @GetMapping
    public ResponseEntity<Object>  GetSubCategory( @RequestParam String subCategoryId)
    {
        try {
            Optional<SubCategory> subcategory = repository.findById(subCategoryId);
            if (subcategory.isPresent()) {
                return ResponseEntity.ok().body(subcategory.get());
            }
            else {
                throw new CategoryExceptions.SubCategoryNotFound();
            }
        }
        catch(CategoryExceptions.SubCategoryNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR05"));
        }
        catch(Exception e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR00"));
        }

    }
    @PostMapping
    public ResponseEntity<Object> createSubCategory(@RequestBody CreateSubCategoryRequest request)
    {
        try
        {
            //==============TESTING IF THE BODY MATCHES THE REQUEST FORMAT==============
            boolean OneAttributeIsNull = Stream.of(
                            request.getName(),
                            request.getCategoryId()
                    )
                    .anyMatch(Objects::isNull);
            if(OneAttributeIsNull)
            {
                throw new MissingParam();
            }
            var result=repository.findByNameAndCategory(request.getName(),request.getCategoryId());
            if(repository.findByNameAndCategory(request.getName(),request.getCategoryId()).isPresent())
            {
                throw new CategoryExceptions.SubCategoryNameExist();
            }
            if(categoryrepository.findById(request.getCategoryId()).isEmpty())
            {
                throw new CategoryExceptions.CategoryNotFound();
            }
            SubCategory newSubCategory= SubCategory
                    .builder()
                    .name(request.getName())
                    .createDateTime(new Date())
                    .category(categoryrepository.findById(request.getCategoryId()).get())
                    .build();

            repository.save(newSubCategory);
            return ResponseEntity.ok().body("sub-Category created, ID:"+newSubCategory.getId());
        }
        catch(CategoryExceptions.CategoryNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR01"));
        }
        catch(CategoryExceptions.SubCategoryNameExist e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR06"));
        }
        catch(MissingParam e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR07"));
        }
        catch (Exception e)
        {
            System.out.println(e);
            return ResponseEntity.ok().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR00"));
        }


    }

    @PutMapping
    public ResponseEntity<Object> EditSubCategory(@RequestBody EditSubCategoryRequest request)
    {
        try
        {
            //==============TESTING IF THE BODY MATCHES THE REQUEST FORMAT==============

            boolean OneAttributeIsNull = Stream.of(
                            request.getId(),
                            request.getName(),
                            request.getCategoryId()
                    )
                    .anyMatch(Objects::isNull);
            if(OneAttributeIsNull)
            {
                throw new MissingParam();
            }


            Optional<SubCategory> subcategoryById=repository.findById(request.getId());
            Optional<SubCategory> subcategoryByName=repository.findByNameAndCategory(request.getName(),request.getCategoryId());
            if(subcategoryById.isEmpty())
            {
                throw new CategoryExceptions.SubCategoryNotFound();
            }
            if(categoryrepository.findById(request.getCategoryId()).isEmpty())
            {
                throw new CategoryExceptions.CategoryNotFound();
            }
            if(subcategoryByName.isPresent() && !subcategoryByName.get().getId().equals(request.getId()))
            {
                throw new CategoryExceptions.SubCategoryNameExist();
            }

            subcategoryById.get().setName(request.getName());
            //If the img for the category exists, change the img
            if(!subcategoryById.get().getCategory().getId().equals(request.getCategoryId()))
            {
                subcategoryById.get().setCategory(categoryrepository.findById(request.getCategoryId()).get());
            }
            repository.save(subcategoryById.get());
            return ResponseEntity.ok().body("sub-Category saved");
        }
        catch(MissingParam e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR08"));
        }
        catch(CategoryExceptions.CategoryNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR01"));
        }
        catch(CategoryExceptions.SubCategoryNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR05"));
        }
        catch(CategoryExceptions.SubCategoryNameExist e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR06"));
        }
        catch (Exception e)
        {
            System.out.println(e);
            return ResponseEntity.ok().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR00"));
        }


    }

    @DeleteMapping
    public ResponseEntity<Object>  deleteSubCategory( @RequestParam String subCategoryId)
    {
        try {

            Optional<SubCategory> subcategory = repository.findById(subCategoryId);
            if (subcategory.isPresent()) {
                //Deleting the subCategory
                repository.deleteById(subCategoryId);
                return ResponseEntity.ok().body("sub-Category Deleted.");
            } else {
                throw new CategoryExceptions.SubCategoryNotFound();
            }
        }
        catch(CategoryExceptions.SubCategoryNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR05"));
        }
        catch(Exception e)
        {
            System.out.println(e);
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR00"));
        }

    }





}

