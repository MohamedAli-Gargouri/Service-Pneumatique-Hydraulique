package com.www.sphtn.SPH;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories
@SpringBootApplication
public class SphApplication {

    public static void main(String[] args) {
        SpringApplication.run(SphApplication.class, args);
    }

}
