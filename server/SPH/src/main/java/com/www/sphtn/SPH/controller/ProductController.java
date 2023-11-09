package com.www.sphtn.SPH.controller;

import com.www.sphtn.SPH.DTO.Errors.ErrorType;
import com.www.sphtn.SPH.DTO.Errors.ErrorsReader;
import com.www.sphtn.SPH.DTO.Product.CreateProductRequest;
import com.www.sphtn.SPH.DTO.Product.EditProductRequest;
import com.www.sphtn.SPH.Exceptions.Category.CategoryExceptions;
import com.www.sphtn.SPH.Exceptions.General.MissingParam;
import com.www.sphtn.SPH.Exceptions.Products.ProductExceptions;
import com.www.sphtn.SPH.model.*;
import com.www.sphtn.SPH.repository.*;
import com.www.sphtn.SPH.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/v1/product")
@RequiredArgsConstructor
public class ProductController {

    @Value("${spring.listing.highStockThreshold}")
    private String highStockThreshold;

    @Value("${spring.listing.lowStockThreshold}")
    private String lowStockThreshold;

    @Value("${spring.listing.pageSize}")
    private String pageSize;
    @Value("${spring.admin.defaultAdminUserName}")
    private String rootUsername;
    @Autowired
    private SubCategoryValueRepository subCategoryValueRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductService service;
    @Autowired
    private ProductRepository repository;
    @Autowired
    private FileRepository fileRepository;
    @GetMapping("/all")
    public ResponseEntity<Object>  GetProducts(
            @RequestParam(required = false) Integer size,
            @RequestParam(defaultValue = "0") int Page,
            @RequestParam(defaultValue = "false") boolean getAll,
            @RequestParam(defaultValue = "false") boolean filterLowStock,
            @RequestParam(defaultValue = "false") boolean filterHighStock
    )
    {
        int pageSize = size!=null ? size : Integer.parseInt(this.pageSize);
        PageRequest pageable =  PageRequest.of(Page, pageSize);
        if(getAll)
        {
            return ResponseEntity.ok().body(repository.findAll());
        }
        if(filterLowStock)
        {

            return ResponseEntity.ok().body(repository.findByStoreQuantityPlusStockQuantityLessThan(Integer.parseInt(lowStockThreshold),pageable));
        }
        if(filterHighStock)
        {
            return ResponseEntity.ok().body(repository.findByStoreQuantityPlusStockQuantityGreaterThan(Integer.parseInt(highStockThreshold),pageable));
        }
        else
        {
            return ResponseEntity.ok().body(repository.findAll(pageable));
        }
    }

    @GetMapping
    public ResponseEntity<Object>  GetProduct( @RequestParam String productId)
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
        catch (Exception e)
        {
            System.out.println(e);
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.GLOBAL_ERRORS).get("GLOBAL_ERROR00"));
        }

    }
    @PostMapping
    public ResponseEntity<Object> createProduct(@RequestBody CreateProductRequest createProductRequest)
    {
        try
        {
            //==============TESTING IF THE BODY MATCHES THE REQUEST FORMAT==============
            if(createProductRequest.getProductImages()==null)
            {
                throw new MissingParam();
            }
            boolean OneAttributeIsNull = Stream.of(
                            createProductRequest.getProductCode(),
                            createProductRequest.getProductBrand(),
                            createProductRequest.getProductPrice(),
                            createProductRequest.getSubCategoryValueIds(),
                            createProductRequest.getCategoryId(),
                            createProductRequest.getAdditionalInformation(),
                            createProductRequest.getLongDescription(),
                            createProductRequest.getShippingInformation(),
                            createProductRequest.getShortDescription(),
                            createProductRequest.getProductName(),
                            createProductRequest.getShortDescription(),
                            createProductRequest.getStockQuantity(),
                            createProductRequest.getStoreQuantity()
                    )
                    .anyMatch(Objects::isNull);
            if(OneAttributeIsNull)
            {
                throw new MissingParam();
            }

            if(categoryRepository.findById(createProductRequest.getCategoryId()).isEmpty())
            {
                throw new CategoryExceptions.CategoryNotFound();
            }
            createProductRequest.getSubCategoryValueIds().forEach(subCategoryValueId->
            {
                //Testing if one of the provided SubCategoryValues is not within our DB
                if(subCategoryValueRepository.findById(subCategoryValueId).isEmpty())
                {
                    throw new CategoryExceptions.SubCategoryValueNotFound();
                }
                //Testing if one of the SubCategoryValues is not within the Product Category
                if(!subCategoryValueRepository.findById(subCategoryValueId).get().getSubCategory().getCategory().getId().equals(createProductRequest.getCategoryId()))
                {
                    throw new ProductExceptions.WrongProductCategory_CategoryValues();
                }
            });

            if(repository.findByProductCode(createProductRequest.getProductCode()).isPresent())
            {
                throw new ProductExceptions.ProductCodeExist();
            }

            Category productCategory=categoryRepository.findById(createProductRequest.getCategoryId()).get();

            ArrayList<SubCategoryValue> ProductSubCategoryValues=new ArrayList<SubCategoryValue>();

            createProductRequest.getSubCategoryValueIds().forEach(subCategoryId->
            {
                ProductSubCategoryValues.add(subCategoryValueRepository.findById(subCategoryId).get());
            });

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
                    createProductRequest.getProductImages(),
                    productCategory,
                    ProductSubCategoryValues

            );
            return ResponseEntity.ok().body("Product Created");
        }

        catch(MissingParam e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR03"));
        }
        catch(ProductExceptions.WrongProductCategory_CategoryValues e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.PROD_ERRORS).get("PRODUCT_ERROR03"));
        }
        catch(CategoryExceptions.CategoryNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR01"));
        }
        catch(CategoryExceptions.SubCategoryValueNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR09"));
        }
        catch(ProductExceptions.ProductCodeExist e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.PROD_ERRORS).get("PRODUCT_ERROR01"));
        }
        catch (Exception e)
        {
            System.out.println(e);
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.GLOBAL_ERRORS).get("GLOBAL_ERROR00"));
        }


    }

    @PutMapping
    public ResponseEntity<Object> EditProduct(@RequestBody EditProductRequest editProductRequest)
    {
        try
        {
            if(categoryRepository.findById(editProductRequest.getCategoryId()).isEmpty())
            {
                throw new CategoryExceptions.CategoryNotFound();
            }

            editProductRequest.getSubCategoryValueIds().forEach(subCategoryValueId->
            {
                //Testing if one of the provided SubCategoryValues is not within our DB
                if(subCategoryValueRepository.findById(subCategoryValueId).isEmpty())
                {
                    throw new CategoryExceptions.SubCategoryValueNotFound();
                }
                //Testing if one of the SubCategoryValues is not within the Product Category
                if(!subCategoryValueRepository.findById(subCategoryValueId).get().getSubCategory().getCategory().getId().equals(editProductRequest.getCategoryId()))
                {
                    throw new ProductExceptions.WrongProductCategory_CategoryValues();
                }
            });

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

            Category productCategory=categoryRepository.findById(editProductRequest.getCategoryId()).get();

            ArrayList<SubCategoryValue> ProductSubCategoryValues=new ArrayList<SubCategoryValue>();

            editProductRequest.getSubCategoryValueIds().forEach(subCategoryId->
            {
                ProductSubCategoryValues.add(subCategoryValueRepository.findById(subCategoryId).get());
            });
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
                    editProductRequest.getClearImages(),
                    productCategory,
                    ProductSubCategoryValues
            );
            List<Order> orders=orderRepository.findAll();

            orders.forEach( order ->
            {
                User rootUser=userRepository.findByUsername(rootUsername).get();
                //Verify if there is any orders paused by the system.
                if(order.getOrderStatus()==Status.PAUSED && order.getPausedBy().equals(rootUser))
                {
                    AtomicReference<Boolean> isResumeAble= new AtomicReference<>(true);
                    AtomicInteger index= new AtomicInteger();
                    order.getOrderProducts().forEach(product ->
                    {
                        if(product.getStoreQuantity()<order.getOrderQuantities().get(index.get()))
                        {
                            isResumeAble.set(false);
                        }
                        index.getAndIncrement();
                    });
                    if(isResumeAble.get())
                    {
                        //if the products quantity is enough to satisfy the order, the system switches the order to pending
                        order.setOrderStatus(Status.PENDING);
                        order.setResumeDateTime(new Date());
                        order.setResumedBy(rootUser);
                        orderRepository.save(order);
                    }
                }

            });
            return ResponseEntity.ok().body("Product saved");
        }
        catch(CategoryExceptions.CategoryNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR01"));
        }
        catch(ProductExceptions.WrongProductCategory_CategoryValues e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.PROD_ERRORS).get("PRODUCT_ERROR03"));
        }
        catch(CategoryExceptions.SubCategoryValueNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.CATEGORY_ERRORS).get("CATEGORY_ERROR09"));
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
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.GLOBAL_ERRORS).get("GLOBAL_ERROR00"));
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
        catch (Exception e)
        {
            System.out.println(e);
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.GLOBAL_ERRORS).get("GLOBAL_ERROR00"));
        }

    }





}
