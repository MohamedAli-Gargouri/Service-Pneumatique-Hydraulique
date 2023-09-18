package com.www.sphtn.SPH.DTO.Product;

import com.www.sphtn.SPH.DTO.dbFile.dbFileRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateProductRequest {
    private Long productCode;
    private String productBrand;
    private String productName;
    private Integer productPrice;
    private Integer storeQuantity;
    private Integer stockQuantity;
    private String shortDescription;
    private String longDescription;
    private String additionalInformation;
    private String shippingInformation;
    private List<dbFileRequest> productImages;
}
