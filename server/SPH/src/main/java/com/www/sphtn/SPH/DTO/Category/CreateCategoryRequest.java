package com.www.sphtn.SPH.DTO.Category;

import com.www.sphtn.SPH.DTO.dbFile.dbFileRequest;
import com.www.sphtn.SPH.model.dbFile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateCategoryRequest {
    private String name;
    private dbFileRequest categoryImg_File;
}
