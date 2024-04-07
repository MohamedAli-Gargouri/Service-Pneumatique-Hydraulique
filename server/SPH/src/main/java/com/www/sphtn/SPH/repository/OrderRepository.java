package com.www.sphtn.SPH.repository;

import com.www.sphtn.SPH.model.Notification;
import com.www.sphtn.SPH.model.Order;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends MongoRepository<Order,String> {


}
