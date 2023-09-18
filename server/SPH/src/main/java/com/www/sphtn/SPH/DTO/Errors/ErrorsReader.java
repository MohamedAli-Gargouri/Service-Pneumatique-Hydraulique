package com.www.sphtn.SPH.DTO.Errors;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;

public class ErrorsReader {
    public static HashMap<String, Error> GetErrors(ErrorType errorType) {
        String JSON_PATH = "src\\main\\java\\com\\www\\sphtn\\SPH\\DTO\\Errors\\";
        String JSON_FileName="";
        try
        {
            switch(errorType)
            {
                case AUTH_ERRORS:
                    JSON_FileName="AuthErrors.json";
                    break;
                case USER_ERRORS:
                    JSON_FileName="UserErrors.json";
                case PROD_ERRORS:
                    JSON_FileName="ProductErrors.json";
                    break;
            }
            ObjectMapper objectMapper = new ObjectMapper();
            File jsonFile = new File(JSON_PATH+JSON_FileName);
            // Read JSON file into a map of ErrorData objects
            return objectMapper.readValue(jsonFile, new TypeReference<HashMap<String, Error>>() {
            });
        }
        catch (IOException e)
        {
            System.out.println("---------WARNING --------"+e);
            return new HashMap<String,Error>();
        }

    }
}
