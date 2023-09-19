package com.www.sphtn.SPH.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "SubCategoryValues")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubCategoryValue {
    @Id
    private String id;
    private String value;
    @DBRef
    private SubCategory subCategory;
}
