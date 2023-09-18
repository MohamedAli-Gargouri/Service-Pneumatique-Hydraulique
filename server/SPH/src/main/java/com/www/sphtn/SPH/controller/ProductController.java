package com.www.sphtn.SPH.controller;

import com.www.sphtn.SPH.DTO.Errors.Error;
import com.www.sphtn.SPH.DTO.Errors.ErrorType;
import com.www.sphtn.SPH.DTO.Errors.ErrorsReader;
import com.www.sphtn.SPH.DTO.Product.CreateProductRequest;
import com.www.sphtn.SPH.DTO.Product.EditProductRequest;
import com.www.sphtn.SPH.DTO.User.ModifyUserRequest;
import com.www.sphtn.SPH.DTO.dbFile.dbFileRequest;
import com.www.sphtn.SPH.Exceptions.General.MissingParam;
import com.www.sphtn.SPH.Exceptions.Products.ProductExceptions;
import com.www.sphtn.SPH.Exceptions.Users.UserExceptions;
import com.www.sphtn.SPH.model.Product;
import com.www.sphtn.SPH.model.User;
import com.www.sphtn.SPH.repository.FileRepository;
import com.www.sphtn.SPH.repository.ProductRepository;
import com.www.sphtn.SPH.service.ProductService;
import com.www.sphtn.SPH.service.UserService;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/product")
@RequiredArgsConstructor
public class ProductController {

    @Autowired
    private ProductService service;
    @Autowired
    private ProductRepository repository;
    @Autowired
    private FileRepository fileRepository;
    @GetMapping("/all")
    public ResponseEntity<Page<Product>>  GetProducts(
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "0") int Page)
    {
        PageRequest pageable =  PageRequest.of(Page, size);
        return ResponseEntity.ok().body(repository.findAll((PageRequest) pageable));
    }

    @GetMapping
    public ResponseEntity<Object>  GetProducts( @RequestParam String productId)
    {
        try {


            Optional<Product> product = repository.findById(productId);
            if (product.isPresent()) {
                return ResponseEntity.ok().body(product.get());
            } else {
                throw new ProductExceptions.WrongProductID();
            }
        }
        catch(ProductExceptions.WrongProductID e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.PROD_ERRORS).get("PRODUCT_ERROR02"));
        }

    }
    @PostMapping
    public ResponseEntity<Object> createProduct(@RequestBody CreateProductRequest createProductRequest)
    {
        try
        {

            if(repository.findByProductCode(createProductRequest.getProductCode()).isPresent())
            {
                throw new ProductExceptions.ProductCodeExist();
            }
            service.createProduct(
                    createProductRequest.getProductCode(),
                    createProductRequest.getProductBrand(),
                    createProductRequest.getProductName(),
                    createProductRequest.getProductPrice(),
                    createProductRequest.getStoreQuantity(),
                    createProductRequest.getStockQuantity(),
                    createProductRequest.getShortDescription(),
                    createProductRequest.getLongDescription(),
                    createProductRequest.getAdditionalInformation(),
                    createProductRequest.getShippingInformation(),
                    createProductRequest.getProductImages()
            );
            return ResponseEntity.ok().body("Product Created");
        }

        catch(ProductExceptions.ProductCodeExist e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.PROD_ERRORS).get("PRODUCT_ERROR01"));
        }
        catch (Exception e)
        {
            System.out.println(e);
            return ResponseEntity.ok().body(ErrorsReader.GetErrors(ErrorType.USER_ERRORS).get("USER_ERROR00"));
        }


    }

    @PutMapping
    public ResponseEntity<Object> EditProduct(@RequestBody EditProductRequest editProductRequest)
    {
        try
        {
           Optional<Product> prodById=repository.findById(editProductRequest.getId());
           Optional<Product> prodByProdCode=repository.findByProductCode(editProductRequest.getProductCode());
            if(prodById.isEmpty())
            {
                throw new ProductExceptions.WrongProductID();
            }
            if(prodByProdCode.isPresent() && !prodByProdCode.get().getId().equals(editProductRequest.getId()))
            {
                throw new ProductExceptions.ProductCodeExist();
            }
            service.EditProduct(
                    editProductRequest.getId(),
                    editProductRequest.getProductCode(),
                    editProductRequest.getProductBrand(),
                    editProductRequest.getProductName(),
                    editProductRequest.getProductPrice(),
                    editProductRequest.getStoreQuantity(),
                    editProductRequest.getStockQuantity(),
                    editProductRequest.getShortDescription(),
                    editProductRequest.getLongDescription(),
                    editProductRequest.getAdditionalInformation(),
                    editProductRequest.getShippingInformation(),
                    editProductRequest.getProductImages(),
                    editProductRequest.getClearImages()
            );
            return ResponseEntity.ok().body("Product saved");
        }

        catch(ProductExceptions.ProductCodeExist e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.PROD_ERRORS).get("PRODUCT_ERROR01"));
        }
        catch(ProductExceptions.WrongProductID e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.PROD_ERRORS).get("PRODUCT_ERROR02"));
        }
        catch (Exception e)
        {
            System.out.println(e);
            return ResponseEntity.ok().body(ErrorsReader.GetErrors(ErrorType.USER_ERRORS).get("USER_ERROR00"));
        }


    }

    @DeleteMapping
    public ResponseEntity<Object>  DeleteProduct( @RequestParam String productId)
    {
        try {
            Optional<Product> product = repository.findById(productId);
            if (product.isPresent()) {
                //Deleting Product Images
                product.get().getProductImages().forEach(dbFile ->
                {
                    fileRepository.delete(dbFile);
                });
                //Deleting the Product
                repository.deleteById(productId);
                return ResponseEntity.ok().body("Product Deleted.");
            } else {
                throw new ProductExceptions.WrongProductID();
            }
        }
        catch(ProductExceptions.WrongProductID e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.PROD_ERRORS).get("PRODUCT_ERROR02"));
        }

    }





}

