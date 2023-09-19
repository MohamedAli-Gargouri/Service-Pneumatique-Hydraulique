package com.www.sphtn.SPH.controller;

import com.www.sphtn.SPH.DTO.Category.CreateSubCategoryRequest;
import com.www.sphtn.SPH.DTO.Category.CreateSubCategoryValueRequest;
import com.www.sphtn.SPH.DTO.Category.EditSubCategoryRequest;
import com.www.sphtn.SPH.DTO.Category.EditSubCategoryValueRequest;
import com.www.sphtn.SPH.DTO.Errors.ErrorType;
import com.www.sphtn.SPH.DTO.Errors.ErrorsReader;
import com.www.sphtn.SPH.Exceptions.Category.CategoryExceptions;
import com.www.sphtn.SPH.Exceptions.General.MissingParam;
import com.www.sphtn.SPH.model.SubCategory;
import com.www.sphtn.SPH.model.SubCategoryValue;
import com.www.sphtn.SPH.repository.CategoryRepository;
import com.www.sphtn.SPH.repository.ProductRepository;
import com.www.sphtn.SPH.repository.SubCategoryRepository;
import com.www.sphtn.SPH.repository.SubCategoryValueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/v1/SubCategoryValue")
@RequiredArgsConstructor
public class SubCategoryValueController {

    @Autowired
    private SubCategoryValueRepository repository;
    @Autowired
    private SubCategoryRepository subCategoryRepository;


    @GetMapping("/all")
    public ResponseEntity<Page<SubCategoryValue>>  getSubCategoriesValues(
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "0") int Page)
    {
        PageRequest pageable =  PageRequest.of(Page, size);
        return ResponseEntity.ok().body(repository.findAll(pageable));
    }

    @GetMapping
    public ResponseEntity<Object>  GetSubCategoryValue( @RequestParam String subCategoryValueId)
    {
        try {
            Optional<SubCategoryValue> subcategoryValue = repository.findById(subCategoryValueId);
            if (subcategoryValue.isPresent()) {
                return ResponseEntity.ok().body(subcategoryValue.get());
            }
            else {
                throw new CategoryExceptions.SubCategoryValueNotFound();
            }
        }
        catch(CategoryExceptions.SubCategoryValueNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR09"));
        }
        catch(Exception e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR00"));
        }

    }
    @PostMapping
    public ResponseEntity<Object> createSubCategoryValue(@RequestBody CreateSubCategoryValueRequest request)
    {
        try
        {
            //==============TESTING IF THE BODY MATCHES THE REQUEST FORMAT==============
            boolean OneAttributeIsNull = Stream.of(
                            request.getValue(),
                            request.getSubCategoryId()
                    )
                    .anyMatch(Objects::isNull);
            if(OneAttributeIsNull)
            {
                throw new MissingParam();
            }
            var result=repository.findByNameAndSubCategory(request.getValue(),request.getSubCategoryId());
            if(repository.findByNameAndSubCategory(request.getValue(),request.getSubCategoryId()).isPresent())
            {
                throw new CategoryExceptions.SubCategoryValue_ValueExists();
            }
            if(subCategoryRepository.findById(request.getSubCategoryId()).isEmpty())
            {
                throw new CategoryExceptions.SubCategoryNotFound();
            }
            SubCategoryValue newSubCategoryValue= SubCategoryValue
                    .builder()
                    .value(request.getValue())
                    .subCategory(subCategoryRepository.findById(request.getSubCategoryId()).get())
                    .build();

            repository.save(newSubCategoryValue);
            return ResponseEntity.ok().body("sub-CategoryValue created, ID:"+newSubCategoryValue.getId());
        }
        catch(CategoryExceptions.SubCategoryNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR05"));
        }
        catch(CategoryExceptions.SubCategoryValue_ValueExists e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR010"));
        }
        catch(MissingParam e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR011"));
        }
        catch (Exception e)
        {
            System.out.println(e);
            return ResponseEntity.ok().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR00"));
        }


    }

    @PutMapping
    public ResponseEntity<Object> EditSubCategory(@RequestBody EditSubCategoryValueRequest request)
    {
        try
        {
            //==============TESTING IF THE BODY MATCHES THE REQUEST FORMAT==============

            boolean OneAttributeIsNull = Stream.of(
                            request.getId(),
                            request.getValue(),
                            request.getSubCategoryId()
                    )
                    .anyMatch(Objects::isNull);
            if(OneAttributeIsNull)
            {
                throw new MissingParam();
            }


            Optional<SubCategoryValue> subcategoryValueById=repository.findById(request.getId());
            Optional<SubCategory> subcategoryValueByName=repository.findByNameAndSubCategory(request.getValue(),request.getSubCategoryId());
            if(subcategoryValueById.isEmpty())
            {
                throw new CategoryExceptions.SubCategoryValueNotFound();
            }
            if(subCategoryRepository.findById(request.getSubCategoryId()).isEmpty())
            {
                throw new CategoryExceptions.SubCategoryNotFound();
            }
            if(subcategoryValueByName.isPresent() && !subcategoryValueByName.get().getId().equals(request.getId()))
            {
                throw new CategoryExceptions.SubCategoryValue_ValueExists();
            }

            subcategoryValueById.get().setValue(request.getValue());

            if(!subcategoryValueById.get().getSubCategory().getId().equals(request.getSubCategoryId()))
            {
                subcategoryValueById.get().setSubCategory(subCategoryRepository.findById(request.getSubCategoryId()).get());
            }
            repository.save(subcategoryValueById.get());
            return ResponseEntity.ok().body("sub-CategoryValue saved");
        }
        catch(MissingParam e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR012"));
        }
        catch(CategoryExceptions.SubCategoryNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR05"));
        }
        catch(CategoryExceptions.SubCategoryValueNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR09"));
        }
        catch(CategoryExceptions.SubCategoryValue_ValueExists e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR010"));
        }
        catch (Exception e)
        {
            System.out.println(e);
            return ResponseEntity.ok().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR00"));
        }


    }

    @DeleteMapping
    public ResponseEntity<Object>  deleteSubCategory( @RequestParam String subCategoryValueId)
    {
        try {

            Optional<SubCategoryValue> subcategoryValue = repository.findById(subCategoryValueId);
            if (subcategoryValue.isPresent()) {
                //Deleting the subCategory
                repository.deleteById(subCategoryValueId);
                return ResponseEntity.ok().body("sub-CategoryValue Deleted.");
            } else {
                throw new CategoryExceptions.SubCategoryValueNotFound();
            }
        }
        catch(CategoryExceptions.SubCategoryValueNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR09"));
        }
        catch(Exception e)
        {
            System.out.println(e);
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR00"));
        }

    }





}

