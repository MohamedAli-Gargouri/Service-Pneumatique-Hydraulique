package com.www.sphtn.SPH.DTO.Product;


import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class ProductDTO {
    private String id;
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
    private Date createDateTime;

}
