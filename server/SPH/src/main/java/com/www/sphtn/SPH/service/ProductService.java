package com.www.sphtn.SPH.service;

import com.www.sphtn.SPH.DTO.dbFile.dbFileRequest;
import com.www.sphtn.SPH.Exceptions.Products.ProductExceptions;
import com.www.sphtn.SPH.model.Category;
import com.www.sphtn.SPH.model.Product;
import com.www.sphtn.SPH.model.SubCategoryValue;
import com.www.sphtn.SPH.model.dbFile;
import com.www.sphtn.SPH.repository.FileRepository;
import com.www.sphtn.SPH.repository.ProductRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    @Autowired
    private final ProductRepository productRepository;
    @Autowired
    private final FileRepository fileRepository;

    public void createProduct(Long productCode,
                       String productBrand,
                       String productName,
                       Integer productPrice,
                       Integer storeQuantity,
                       Integer stockQuantity,
                       String shortDescription,
                       String longDescription,
                       String additionalInformation,
                       String shippingInformation,
                       List<dbFileRequest> productImages,
                       Category category,
                       List<SubCategoryValue> subCategoryValueList
                            )
        {
            ArrayList<dbFile> ListProductImg =new ArrayList<dbFile>();

            for(dbFileRequest file:productImages)
            {
                ListProductImg.add(dbFile.builder()
                        .name(file.getName())
                        .createDateTime(new Date())
                        .size(file.getSize())
                        .extension(file.getExtension())
                        .fileBinary(file.getFileBinary())
                        .build());
            }
            fileRepository.saveAll(ListProductImg);
               productRepository.save( Product.builder()
                        .productCode(productCode)
                        .productBrand(productBrand)
                        .productName(productName)
                        .productPrice(productPrice)
                        .storeQuantity(storeQuantity)
                        .stockQuantity(stockQuantity)
                        .shortDescription(shortDescription)
                        .longDescription(longDescription)
                        .additionalInformation(additionalInformation)
                        .shippingInformation(shippingInformation)
                        .createDateTime(new Date())
                        .productImages(ListProductImg)
                        .Category(category)
                        .subCategoryValues(subCategoryValueList)
                        .build());


        }

public void EditProduct(
          String ProdId,
          Long productCode,
          String productBrand,
          String productName,
          Integer productPrice,
          Integer storeQuantity,
          Integer stockQuantity,
          String shortDescription,
          String longDescription,
          String additionalInformation,
          String shippingInformation,
          List<dbFileRequest> productImages,
          Boolean clearImages,
          Category category,
          List<SubCategoryValue> subCategoryValueList
) throws ProductExceptions.WrongProductID
    {
        ArrayList<dbFile> ListProductImg =new ArrayList<dbFile>();
            for(dbFileRequest file:productImages)
            {
                ListProductImg.add(dbFile.builder()
                        .name(file.getName())
                        .createDateTime(new Date())
                        .size(file.getSize())
                        .extension(file.getExtension())
                        .fileBinary(file.getFileBinary())
                        .build());
            }
        if(!ListProductImg.isEmpty())
        {
            fileRepository.saveAll(ListProductImg);
        }
        Optional<Product> prod=productRepository.findById(ProdId);
        if(prod.isEmpty())
        {
            throw new ProductExceptions.WrongProductID();
        }

        //Case we are changing the products images and not deleting them
        if(!productImages.isEmpty()&&!clearImages)
        {

            prod.get().setProductCode(productCode);
            prod.get().setProductBrand(productBrand);
            prod.get().setProductName(productName);
            prod.get().setProductPrice(productPrice);
            prod.get().setStoreQuantity(storeQuantity);
            prod.get().setStockQuantity(stockQuantity);
            prod.get().setShortDescription(shortDescription);
            prod.get().setLongDescription(longDescription);
            prod.get().setAdditionalInformation(additionalInformation);
            prod.get().setShippingInformation(shippingInformation);
            prod.get().setProductImages(ListProductImg);
            prod.get().setCategory(category);
            prod.get().setSubCategoryValues(subCategoryValueList);
        }
        //case we are deleting the images
        if(clearImages)
        {
            prod.get().setProductCode(productCode);
            prod.get().setProductBrand(productBrand);
            prod.get().setProductName(productName);
            prod.get().setProductPrice(productPrice);
            prod.get().setStoreQuantity(storeQuantity);
            prod.get().setStockQuantity(stockQuantity);
            prod.get().setShortDescription(shortDescription);
            prod.get().setLongDescription(longDescription);
            prod.get().setAdditionalInformation(additionalInformation);
            prod.get().setShippingInformation(shippingInformation);
            prod.get().setProductImages(new ArrayList<>());
            prod.get().getProductImages().forEach(fileRepository::delete);
            prod.get().setCategory(category);
            prod.get().setSubCategoryValues(subCategoryValueList);

        }
        //case we're not changing the images
        if(productImages.isEmpty()&&!clearImages)
        {

            prod.get().setProductCode(productCode);
            prod.get().setProductBrand(productBrand);
            prod.get().setProductName(productName);
            prod.get().setProductPrice(productPrice);
            prod.get().setStoreQuantity(storeQuantity);
            prod.get().setStockQuantity(stockQuantity);
            prod.get().setShortDescription(shortDescription);
            prod.get().setLongDescription(longDescription);
            prod.get().setAdditionalInformation(additionalInformation);
            prod.get().setShippingInformation(shippingInformation);
            prod.get().setCategory(category);
            prod.get().setSubCategoryValues(subCategoryValueList);
        }
        productRepository.save(prod.get());


    }

    }

