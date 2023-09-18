package com.www.sphtn.SPH.DTO.dbFile;

import com.www.sphtn.SPH.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.Date;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class dbFileRequest {
    private String name;
    private String extension;
    private byte[] fileBinary;
    private long size;
}
