package com.www.sphtn.SPH.repository;

import com.www.sphtn.SPH.model.User;
import com.www.sphtn.SPH.model.dbFile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FileRepository extends MongoRepository<dbFile,String> {
    @Query("{name:?0}")
    Optional<List<dbFile>> findFileByName(String Name);
    @Query("{name:?0}")
    Optional<dbFile> getDefaultProfilePicture(String Name);
}
