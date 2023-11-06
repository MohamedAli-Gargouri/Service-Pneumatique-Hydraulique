package com.www.sphtn.SPH.repository;

import com.www.sphtn.SPH.model.Notification;
import com.www.sphtn.SPH.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order,String> {

}
