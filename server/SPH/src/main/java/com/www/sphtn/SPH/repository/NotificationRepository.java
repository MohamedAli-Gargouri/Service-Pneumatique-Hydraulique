package com.www.sphtn.SPH.repository;

import com.www.sphtn.SPH.model.Category;
import com.www.sphtn.SPH.model.Notification;
import com.www.sphtn.SPH.model.SubCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends MongoRepository<Notification,String> {
    @Query("{order: ?0}")
    Optional<List<Notification>> findByOrder(String orderId);
    @Query("{user: ?0}")
    Optional<List<Notification>> findByUser(String userId);
    @Query("{user: ?0}")
    Page<Notification> findByUser(String userId, Pageable pageable);
}
