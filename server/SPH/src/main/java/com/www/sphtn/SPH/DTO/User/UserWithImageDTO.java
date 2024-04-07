package com.www.sphtn.SPH.DTO.User;

import com.www.sphtn.SPH.model.dbFile;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserWithImageDTO {
    private String id;
    private String userName;
    private String firstName;
    private String lastName;
    private Integer phoneNumber;
    private Integer internationalDialNumber;
    private String email;
    private dbFile profileImage;
}
