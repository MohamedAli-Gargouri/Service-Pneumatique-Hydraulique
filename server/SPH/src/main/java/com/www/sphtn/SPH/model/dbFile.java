package com.www.sphtn.SPH.model;

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

@Document(collection = "Files")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class dbFile {
    @Id
    private String id;
    private String name;
    private String extension;
    private byte[] fileBinary;
    private long size;
    private Date createDateTime;
}
