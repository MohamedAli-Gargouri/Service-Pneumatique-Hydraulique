package com.www.sphtn.SPH.DTO.User;

import com.www.sphtn.SPH.DTO.dbFile.dbFileRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class ModifyUserRequest {

    private String id;
    private String firstName;
    private String lastName;
    private Integer phoneNumber;
    private Integer internationalDialNumber;
    private String email;
    private String password;
    private String confirm_Password;
    private dbFileRequest profileImg;
}
