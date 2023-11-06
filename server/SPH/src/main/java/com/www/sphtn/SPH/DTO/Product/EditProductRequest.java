package com.www.sphtn.SPH.DTO.Product;

import com.www.sphtn.SPH.DTO.dbFile.dbFileRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EditProductRequest {
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
    private List<dbFileRequest> productImages;
    private Boolean clearImages;
    private String categoryId;
    private List<String> subCategoryValueIds;
}
