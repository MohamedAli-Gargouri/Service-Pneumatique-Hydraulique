package com.www.sphtn.SPH.DTO.Errors;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;

public class ErrorsReader {
    private static final String JSON_FILE_PATH = "src\\main\\java\\com\\www\\sphtn\\SPH\\DTO\\Errors\\Error.json";

    public static HashMap<String, Error> GetErrors() {
        try
        {
            //System.out.println(System.getProperty("user.dir"));
            ObjectMapper objectMapper = new ObjectMapper();
            File jsonFile = new File(JSON_FILE_PATH);
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
