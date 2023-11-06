package com.www.sphtn.SPH.controller;

import com.www.sphtn.SPH.DTO.Category.CreateCategoryRequest;
import com.www.sphtn.SPH.DTO.Category.EditCategoryRequest;
import com.www.sphtn.SPH.DTO.Errors.ErrorType;
import com.www.sphtn.SPH.DTO.Errors.ErrorsReader;
import com.www.sphtn.SPH.DTO.Product.CreateProductRequest;
import com.www.sphtn.SPH.DTO.Product.EditProductRequest;
import com.www.sphtn.SPH.Exceptions.Category.CategoryExceptions;
import com.www.sphtn.SPH.Exceptions.General.MissingParam;
import com.www.sphtn.SPH.Exceptions.Products.ProductExceptions;
import com.www.sphtn.SPH.model.Category;
import com.www.sphtn.SPH.model.Product;
import com.www.sphtn.SPH.model.SubCategory;
import com.www.sphtn.SPH.model.dbFile;
import com.www.sphtn.SPH.repository.CategoryRepository;
import com.www.sphtn.SPH.repository.FileRepository;
import com.www.sphtn.SPH.repository.ProductRepository;
import com.www.sphtn.SPH.repository.SubCategoryRepository;
import com.www.sphtn.SPH.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/v1/Category")
@RequiredArgsConstructor
public class CategoryController {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository repository;

    @Autowired
    private SubCategoryRepository subCategoryRepository;
    @Autowired
    private FileRepository fileRepository;
    @GetMapping("/all")
    public ResponseEntity<Object>  GetCategories(
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "0") int Page,
            @RequestParam(defaultValue = "false") boolean getAll)

    {
        if(getAll)
        {
            List<Category> AllCategories = repository.findAll();
            return ResponseEntity.ok().body(AllCategories);
        }
        else
        {
            PageRequest pageable =  PageRequest.of(Page, size);
            return ResponseEntity.ok().body(repository.findAll(pageable));
        }

    }

    @GetMapping
    public ResponseEntity<Object>  GetCategory( @RequestParam String categoryId)
    {
        try {


            Optional<Category> category = repository.findById(categoryId);
            if (category.isPresent()) {
                return ResponseEntity.ok().body(category.get());
            } else {
                throw new CategoryExceptions.CategoryNotFound();
            }
        }
        catch(CategoryExceptions.CategoryNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR01"));
        }
        catch (Exception e)
        {
            System.out.println(e);
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.GLOBAL_ERRORS).get("GLOBAL_ERROR00"));
        }

    }
    @PostMapping
    public ResponseEntity<Object> createCategory(@RequestBody CreateCategoryRequest request)
    {
        try
        {
            //==============TESTING IF THE BODY MATCHES THE REQUEST FORMAT==============
            if(request.getCategoryImg_File()==null)
            {
                throw new MissingParam();
            }
            boolean OneAttributeIsNull = Stream.of(
                            request.getName(),
                            request.getCategoryImg_File().getExtension(),
                            request.getCategoryImg_File().getFileBinary(),
                            request.getCategoryImg_File().getName(),
                            request.getCategoryImg_File().getSize()
                    )
                    .anyMatch(Objects::isNull);
            if(OneAttributeIsNull)
            {
                throw new MissingParam();
            }

            if(repository.findByName(request.getName()).isPresent())
            {
                throw new CategoryExceptions.CategoryNameExist();
            }
             dbFile CategoryImg= dbFile.builder()
                     .size(request.getCategoryImg_File().getSize())
                     .extension(request.getCategoryImg_File().getExtension())
                     .name(request.getCategoryImg_File().getName())
                     .createDateTime(new Date())
                     .fileBinary(request.getCategoryImg_File().getFileBinary())
                     .build();
            fileRepository.save(CategoryImg);
            Category newCategory=Category.builder()
                    .name(request.getName())
                    .createDateTime(new Date())
                    .categoryImg_File(CategoryImg)
                    .build();

            repository.save(newCategory);
            return ResponseEntity.ok().body("Category created, ID:"+newCategory.getId());
        }

        catch(CategoryExceptions.CategoryNameExist e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR02"));
        }
        catch(MissingParam e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR03"));
        }
        catch (Exception e)
        {
            System.out.println(e);
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.GLOBAL_ERRORS).get("GLOBAL_ERROR00"));
        }


    }

    @PutMapping
    public ResponseEntity<Object> EditCategory(@RequestBody EditCategoryRequest request)
    {
        try
        {
            //==============TESTING IF THE BODY MATCHES THE REQUEST FORMAT==============
            if(request.getCategoryImg_File()==null)
            {
                throw new MissingParam();
            }
            boolean OneAttributeIsNull = Stream.of(
                            request.getId(),
                            request.getName()
                    )
                    .anyMatch(Objects::isNull);
            if(OneAttributeIsNull)
            {
                throw new MissingParam();
            }


            Optional<Category> categoryById=repository.findById(request.getId());
           Optional<Category> categoryByName=repository.findByName(request.getName());
            if(categoryById.isEmpty())
            {
                throw new CategoryExceptions.CategoryNotFound();
            }
            if(categoryByName.isPresent() && !categoryByName.get().getId().equals(request.getId()))
            {
                throw new CategoryExceptions.CategoryNameExist();
            }
            boolean ChangeCategoryImg= request.getCategoryImg_File().getFileBinary() != null && !request.getCategoryImg_File().getName().isEmpty() && request.getCategoryImg_File().getSize() != 0 && !request.getCategoryImg_File().getExtension().isEmpty();

            categoryById.get().setName(request.getName());
            //If the img for the category exists, change the img
            if(ChangeCategoryImg)
            {
                dbFile newCategoryImg= dbFile.builder()
                        .createDateTime(new Date())
                        .name(request.getCategoryImg_File().getName())
                        .extension(request.getCategoryImg_File().getExtension())
                        .size(request.getCategoryImg_File().getSize())
                        .fileBinary(request.getCategoryImg_File().getFileBinary())
                        .build();
                fileRepository.save(newCategoryImg);
                categoryById.get().setCategoryImg_File(newCategoryImg);
            }
            repository.save(categoryById.get());
            return ResponseEntity.ok().body("Category saved");
        }
        catch(MissingParam e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR04"));
        }
        catch(CategoryExceptions.CategoryNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR01"));
        }
        catch(CategoryExceptions.CategoryNameExist e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR02"));
        }
        catch (Exception e)
        {
            System.out.println(e);
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.GLOBAL_ERRORS).get("GLOBAL_ERROR00"));
        }


    }

    @DeleteMapping
    public ResponseEntity<Object>  deleteCategory( @RequestParam String categoryId)
    {
        try {
            Optional<Category> category = repository.findById(categoryId);
            if (category.isPresent()) {
                //Deleting Category Image
                fileRepository.delete(category.get().getCategoryImg_File());

                //Deleting the category's sub categories
                List<SubCategory> subCategories=subCategoryRepository.findAll();
                subCategories.forEach(subCategory ->
                {
                    //If the subcategory's parent is the one we're deleting, delete the sub category
                    if(subCategory.getCategory().getId().equals(categoryId))
                    {
                        subCategoryRepository.deleteById(subCategory.getId());
                    }
                });

                //Deleting the Category
                repository.deleteById(categoryId);

                return ResponseEntity.ok().body("Category Deleted.");
            } else {
                throw new CategoryExceptions.CategoryNotFound();
            }
        }
        catch(CategoryExceptions.CategoryNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR01"));
        }
        catch (Exception e)
        {
            System.out.println(e);
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.GLOBAL_ERRORS).get("GLOBAL_ERROR00"));
        }

    }





}

