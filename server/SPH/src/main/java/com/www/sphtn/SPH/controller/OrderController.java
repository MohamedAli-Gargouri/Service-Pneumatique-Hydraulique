package com.www.sphtn.SPH.controller;

import com.www.sphtn.SPH.DTO.Errors.ErrorType;
import com.www.sphtn.SPH.DTO.Errors.ErrorsReader;
import com.www.sphtn.SPH.DTO.Order.CreateOrderRequest;
import com.www.sphtn.SPH.DTO.Order.PutOrderRequest;

import com.www.sphtn.SPH.Exceptions.Auth.AuthExceptions;
import com.www.sphtn.SPH.Exceptions.General.MissingParam;
import com.www.sphtn.SPH.Exceptions.Order.OrderExceptions;
import com.www.sphtn.SPH.Exceptions.Products.ProductExceptions;
import com.www.sphtn.SPH.model.*;
import com.www.sphtn.SPH.repository.*;
import com.www.sphtn.SPH.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/v1/Order")
@RequiredArgsConstructor
public class OrderController {
    @Value("${spring.admin.defaultAdminUserName}")
    private String rootUsername;
    @Autowired
     private OrderRepository repository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private JwtService jwtService;
    @GetMapping("/all")
    public ResponseEntity<Object>  getOrders(
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "0") int Page,
            @RequestParam(defaultValue = "false") boolean getAll)
    {
        if(getAll)
        {
            return ResponseEntity.ok().body(repository.findAll());
        }
        else
        {
            PageRequest pageable =  PageRequest.of(Page, size);
            return ResponseEntity.ok().body(repository.findAll((PageRequest) pageable));
        }

    }

    @GetMapping
    public ResponseEntity<Object>  getOrder( @RequestParam String orderId)
    {
        try {


            Optional<Order> order = repository.findById(orderId);
            if (order.isPresent()) {
                return ResponseEntity.ok().body(order.get());
            } else {
                throw new OrderExceptions.OrderNotFound();
            }
        }
        catch(OrderExceptions.OrderNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.ORDER_ERRORS).get("ORDER_ERROR01"));
        }

    }
    @PostMapping
    public ResponseEntity<Object> createOrder(@RequestHeader("Authorization") String authorizationHeader,@RequestBody CreateOrderRequest createOrderRequest)
    {
        try
        {
            //Getting the requester from the accessToken
            String accessToken = authorizationHeader.substring(7);
            User requester=userRepository.findByUsername(jwtService.extractUsername(accessToken)).get();


            User SYSTEM_USER =userRepository.findByUsername(rootUsername).get();
            boolean quantityInStore=true;
            //==============TESTING IF THE BODY MATCHES THE REQUEST FORMAT==============
            boolean OneAttributeIsNull = Stream.of(
                            createOrderRequest.getProductQuantities(),
                            createOrderRequest.getProductsIds()

                    )
                    .anyMatch(Objects::isNull);
            if(OneAttributeIsNull)
            {
                throw new MissingParam();
            }

            List<String> products=createOrderRequest.getProductsIds();
            List<Integer> quantities=createOrderRequest.getProductQuantities();
            //Verifying Products ids valid
            products.forEach(productId->
            {
                //Testing if one of the provided productIds is not within our DB
                if(productRepository.findById(productId).isEmpty())
                {
                    throw new ProductExceptions.WrongProductID();
                }


            });
            //verifying quantities
            for(int i=0;i<products.size();i++)
            {
                Product product=productRepository.findById(products.get(i)).get();
                //Case where the requested Quantity is invalid <1
                if(quantities.get(i)<=0)
                {
                    throw new OrderExceptions.InvalidOrderQuantity();
                }
                //Case where the requested Quantity is more than the stock
                if(product.getStockQuantity()+product.getStoreQuantity()<quantities.get(i))
                {
                    throw new ProductExceptions.LimitedProductQuantity();
                }
                //case where the requested Quantity bigger than the store
                if(product.getStoreQuantity()<quantities.get(i))
                {
                    quantityInStore=false;
                }
            }
            //Creating a list of Products Objects//
            ArrayList<Product> orderProducts=new ArrayList<Product>();
            products.forEach(productId->
            {
                orderProducts.add(productRepository.findById(productId).get());
            });

            if(quantityInStore)
            {
                //Case where the Product quantity is available in the store
                Order newOrder= Order.builder()
                        .orderProducts(orderProducts)
                        .orderQuantities(quantities)
                        .orderStatus(Status.PENDING)
                        .createdBy(requester)
                        .build();
                repository.save(newOrder);
                return ResponseEntity.ok().body("Order Created, ID: "+newOrder.getId() );
            }
            else
            {
                //Case where the Product quantity is not available in the store
                Order newOrder= Order.builder()
                        .orderProducts(orderProducts)
                        .orderQuantities(quantities)
                        .orderStatus(Status.PAUSED)
                        .pausedBy(SYSTEM_USER)
                        .pauseDateTime(new Date())
                        .createdBy(requester)
                        .build();
                repository.save(newOrder);

                //Creating a paused notification for the order submitted
                Notification pausedNotification=Notification.builder()
                        .order(newOrder)
                        .previousStatus(Status.PENDING)
                        .newStatus(Status.PAUSED)
                        .user(requester)
                        .build();
                notificationRepository.save(pausedNotification);
                return ResponseEntity.ok().body("Order Created, ID: "+newOrder.getId()+"PAUSED NOTIFICATION created, ID:"+pausedNotification.getId() );
            }

        }

        catch(MissingParam e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.ORDER_ERRORS).get("ORDER_ERROR03"));
        }
        catch(OrderExceptions.InvalidOrderQuantity e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.ORDER_ERRORS).get("ORDER_ERROR02"));
        }
        catch(ProductExceptions.LimitedProductQuantity e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.PROD_ERRORS).get("PRODUCT_ERROR04"));
        }
        catch(ProductExceptions.WrongProductID e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.PROD_ERRORS).get("PRODUCT_ERROR02"));
        }
        catch (Exception e)
        {
            System.out.println(e);
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.GLOBAL_ERRORS).get("GLOBAL_ERROR00"));
        }


    }

    @PutMapping("/pause")
    public ResponseEntity<Object> PauseOrder(@RequestHeader("Authorization") String authorizationHeader,@RequestBody PutOrderRequest putOrderRequest)
    {

        try
        {            //Getting the requester from the accessToken
            String accessToken = authorizationHeader.substring(7);
            User requester=userRepository.findByUsername(jwtService.extractUsername(accessToken)).get();

            //==============TESTING IF THE BODY MATCHES THE REQUEST FORMAT==============
            boolean OneAttributeIsNull = Stream.of(
                            putOrderRequest.getOrderId()

                    )
                    .anyMatch(Objects::isNull);
            if(OneAttributeIsNull)
            {
                throw new MissingParam();
            }
            //Verify if Order Id is valid
            if(repository.findById(putOrderRequest.getOrderId()).isEmpty())
            {
                throw new OrderExceptions.OrderNotFound();
            }
            Order order=repository.findById(putOrderRequest.getOrderId()).get();

            //Verify if the user has the Auth to pause the order.
            if(requester.getRole().equals(Role.USER))
            {
                  throw new AuthExceptions.MissingPermissionsException();
            }
            //Verify if the Order is already Paused.
            if(order.getOrderStatus()==Status.PAUSED)
            {
                throw new OrderExceptions.AlreadyPaused();
            }
                Notification pauseNotification=Notification.builder()
                .newStatus(Status.PAUSED)
                .previousStatus(order.getOrderStatus())
                .order(order)
                .user(order.getCreatedBy())
                .build();

                order.setPausedBy(requester);
                order.setOrderStatus(Status.PAUSED);
                order.setPauseDateTime(new Date());
                repository.save(order);
                notificationRepository.save(pauseNotification);
                return ResponseEntity.ok().body("Order paused, ID: "+order.getId() );


        }

        catch(MissingParam e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.ORDER_ERRORS).get("ORDER_ERROR04"));
        }
        catch(OrderExceptions.AlreadyPaused e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.ORDER_ERRORS).get("ORDER_ERROR05"));
        }
        catch(AuthExceptions.MissingPermissionsException e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.AUTH_ERRORS).get("AUTH_ERROR013"));
        }
        catch(OrderExceptions.OrderNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.ORDER_ERRORS).get("ORDER_ERROR01"));
        }
        catch (Exception e)
        {
            System.out.println(e);
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.GLOBAL_ERRORS).get("GLOBAL_ERROR00"));
        }


    }

    @PutMapping("/cancel")
    public ResponseEntity<Object> CancelOrder(@RequestHeader("Authorization") String authorizationHeader,@RequestBody PutOrderRequest putOrderRequest)
    {

        try
        {            //Getting the requester from the accessToken
            String accessToken = authorizationHeader.substring(7);
            User requester=userRepository.findByUsername(jwtService.extractUsername(accessToken)).get();

            //==============TESTING IF THE BODY MATCHES THE REQUEST FORMAT==============
            boolean OneAttributeIsNull = Stream.of(
                            putOrderRequest.getOrderId()

                    )
                    .anyMatch(Objects::isNull);
            if(OneAttributeIsNull)
            {
                throw new MissingParam();
            }
            //Verify if Order Id is valid
            if(repository.findById(putOrderRequest.getOrderId()).isEmpty())
            {
                throw new OrderExceptions.OrderNotFound();
            }
            Order order=repository.findById(putOrderRequest.getOrderId()).get();

            //Verify if the user has the Auth to cancel the order.
            if(!order.getCreatedBy().getId().equals(requester.getId()) && requester.getRole().equals(Role.USER))
            {
                throw new AuthExceptions.MissingPermissionsException();
            }
            //Verify if the Order is already Cancelled.
            if(order.getOrderStatus()==Status.CANCELLED)
            {
                throw new OrderExceptions.AlreadyCancelled();
            }
            Notification pauseNotification=Notification.builder()
                    .newStatus(Status.CANCELLED)
                    .previousStatus(order.getOrderStatus())
                    .order(order)
                    .user(order.getCreatedBy())
                    .build();

            order.setCancelledBy(requester);
            order.setOrderStatus(Status.CANCELLED);
            order.setCancelDateTime(new Date());
            repository.save(order);
            notificationRepository.save(pauseNotification);
            return ResponseEntity.ok().body("Order Cancelled, ID: "+order.getId() );


        }

        catch(MissingParam e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.ORDER_ERRORS).get("ORDER_ERROR04"));
        }
        catch(OrderExceptions.AlreadyCancelled e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.ORDER_ERRORS).get("ORDER_ERROR06"));
        }
        catch(AuthExceptions.MissingPermissionsException e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.AUTH_ERRORS).get("AUTH_ERROR013"));
        }
        catch(OrderExceptions.OrderNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.ORDER_ERRORS).get("ORDER_ERROR01"));
        }
        catch (Exception e)
        {
            System.out.println(e);
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.GLOBAL_ERRORS).get("GLOBAL_ERROR00"));
        }


    }
    @PutMapping("/resume")
    public ResponseEntity<Object> resumeOrder(@RequestHeader("Authorization") String authorizationHeader,@RequestBody PutOrderRequest putOrderRequest)
    {

        try
        {            //Getting the requester from the accessToken
            String accessToken = authorizationHeader.substring(7);
            User requester=userRepository.findByUsername(jwtService.extractUsername(accessToken)).get();

            //==============TESTING IF THE BODY MATCHES THE REQUEST FORMAT==============
            boolean OneAttributeIsNull = Stream.of(
                            putOrderRequest.getOrderId()

                    )
                    .anyMatch(Objects::isNull);
            if(OneAttributeIsNull)
            {
                throw new MissingParam();
            }
            //Verify if Order Id is valid
            if(repository.findById(putOrderRequest.getOrderId()).isEmpty())
            {
                throw new OrderExceptions.OrderNotFound();
            }
            Order order=repository.findById(putOrderRequest.getOrderId()).get();

            //Verify if the user has the Auth to cancel the order.
            if( requester.getRole().equals(Role.USER))
            {
                throw new AuthExceptions.MissingPermissionsException();
            }
            //Verify if the Order is already resumed.
            if(order.getOrderStatus()==Status.PENDING)
            {
                throw new OrderExceptions.AlreadyResumed();
            }
            Notification pauseNotification=Notification.builder()
                    .newStatus(Status.PENDING)
                    .previousStatus(order.getOrderStatus())
                    .order(order)
                    .user(order.getCreatedBy())
                    .build();

            order.setResumedBy(requester);
            order.setOrderStatus(Status.PENDING);
            order.setResumeDateTime(new Date());
            repository.save(order);
            notificationRepository.save(pauseNotification);
            return ResponseEntity.ok().body("Order resumed, ID: "+order.getId() );


        }

        catch(MissingParam e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.ORDER_ERRORS).get("ORDER_ERROR04"));
        }
        catch(AuthExceptions.MissingPermissionsException e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.AUTH_ERRORS).get("AUTH_ERROR013"));
        }
        catch(OrderExceptions.AlreadyResumed e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.ORDER_ERRORS).get("ORDER_ERROR07"));
        }
        catch(OrderExceptions.OrderNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.ORDER_ERRORS).get("ORDER_ERROR01"));
        }
        catch (Exception e)
        {
            System.out.println(e);
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.GLOBAL_ERRORS).get("GLOBAL_ERROR00"));
        }


    }

    @PutMapping("/markPaid")
    public ResponseEntity<Object> markOrderPaid(@RequestHeader("Authorization") String authorizationHeader,@RequestBody PutOrderRequest putOrderRequest)
    {

        try
        {            //Getting the requester from the accessToken
            String accessToken = authorizationHeader.substring(7);
            User requester=userRepository.findByUsername(jwtService.extractUsername(accessToken)).get();

            //==============TESTING IF THE BODY MATCHES THE REQUEST FORMAT==============
            boolean OneAttributeIsNull = Stream.of(
                            putOrderRequest.getOrderId()

                    )
                    .anyMatch(Objects::isNull);
            if(OneAttributeIsNull)
            {
                throw new MissingParam();
            }
            //Verify if Order Id is valid
            if(repository.findById(putOrderRequest.getOrderId()).isEmpty())
            {
                throw new OrderExceptions.OrderNotFound();
            }
            Order order=repository.findById(putOrderRequest.getOrderId()).get();

            //Verify if the user has the Auth to cancel the order.
            if( requester.getRole().equals(Role.USER))
            {
                throw new AuthExceptions.MissingPermissionsException();
            }
            //Verify if the Order is already resumed.
            if(order.getOrderStatus()==Status.PAID)
            {
                throw new OrderExceptions.AlreadyPaid();
            }
            Notification pauseNotification=Notification.builder()
                    .newStatus(Status.PAID)
                    .previousStatus(order.getOrderStatus())
                    .order(order)
                    .user(order.getCreatedBy())
                    .build();

            order.setPaidBy(requester);
            order.setOrderStatus(Status.PAID);
            order.setPaidDateTime(new Date());
            repository.save(order);
            notificationRepository.save(pauseNotification);
            return ResponseEntity.ok().body("Order paid, ID: "+order.getId() );


        }

        catch(MissingParam e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.ORDER_ERRORS).get("ORDER_ERROR04"));
        }
        catch(AuthExceptions.MissingPermissionsException e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.AUTH_ERRORS).get("AUTH_ERROR013"));
        }
        catch(OrderExceptions.AlreadyPaid e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.ORDER_ERRORS).get("ORDER_ERROR08"));
        }
        catch(OrderExceptions.OrderNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.ORDER_ERRORS).get("ORDER_ERROR01"));
        }
        catch (Exception e)
        {
            System.out.println(e);
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.GLOBAL_ERRORS).get("GLOBAL_ERROR00"));
        }


    }

    @PutMapping("/setReady")
    public ResponseEntity<Object> setOrderReady(@RequestHeader("Authorization") String authorizationHeader,@RequestBody PutOrderRequest putOrderRequest)
    {

        try
        {            //Getting the requester from the accessToken
            String accessToken = authorizationHeader.substring(7);
            User requester=userRepository.findByUsername(jwtService.extractUsername(accessToken)).get();

            //==============TESTING IF THE BODY MATCHES THE REQUEST FORMAT==============
            boolean OneAttributeIsNull = Stream.of(
                            putOrderRequest.getOrderId()

                    )
                    .anyMatch(Objects::isNull);
            if(OneAttributeIsNull)
            {
                throw new MissingParam();
            }
            //Verify if Order Id is valid
            if(repository.findById(putOrderRequest.getOrderId()).isEmpty())
            {
                throw new OrderExceptions.OrderNotFound();
            }
            Order order=repository.findById(putOrderRequest.getOrderId()).get();

            //Verify if the user has the Auth to cancel the order.
            if( requester.getRole().equals(Role.USER))
            {
                throw new AuthExceptions.MissingPermissionsException();
            }
            //Verify if the Order is already resumed.
            if(order.getOrderStatus()==Status.READY)
            {
                throw new OrderExceptions.AlreadyReady();
            }
            Notification pauseNotification=Notification.builder()
                    .newStatus(Status.READY)
                    .previousStatus(order.getOrderStatus())
                    .order(order)
                    .user(order.getCreatedBy())
                    .build();

            order.setReadyBy(requester);
            order.setOrderStatus(Status.READY);
            order.setReadyDateTime(new Date());
            repository.save(order);
            notificationRepository.save(pauseNotification);
            return ResponseEntity.ok().body("Order is marked ready, ID: "+order.getId() );


        }

        catch(MissingParam e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.ORDER_ERRORS).get("ORDER_ERROR04"));
        }
        catch(AuthExceptions.MissingPermissionsException e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.AUTH_ERRORS).get("AUTH_ERROR013"));
        }
        catch(OrderExceptions.AlreadyReady e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.ORDER_ERRORS).get("ORDER_ERROR09"));
        }
        catch(OrderExceptions.OrderNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.ORDER_ERRORS).get("ORDER_ERROR01"));
        }
        catch (Exception e)
        {
            System.out.println(e);
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.GLOBAL_ERRORS).get("GLOBAL_ERROR00"));
        }


    }
    @PutMapping("/setDelivered")
    public ResponseEntity<Object> setOrderDelivered(@RequestHeader("Authorization") String authorizationHeader,@RequestBody PutOrderRequest putOrderRequest)
    {

        try
        {            //Getting the requester from the accessToken
            String accessToken = authorizationHeader.substring(7);
            User requester=userRepository.findByUsername(jwtService.extractUsername(accessToken)).get();
            User SYSTEM_USER =userRepository.findByUsername(rootUsername).get();
            //==============TESTING IF THE BODY MATCHES THE REQUEST FORMAT==============
            boolean OneAttributeIsNull = Stream.of(
                            putOrderRequest.getOrderId()

                    )
                    .anyMatch(Objects::isNull);
            if(OneAttributeIsNull)
            {
                throw new MissingParam();
            }
            //Verify if Order Id is valid
            if(repository.findById(putOrderRequest.getOrderId()).isEmpty())
            {
                throw new OrderExceptions.OrderNotFound();
            }
            Order order=repository.findById(putOrderRequest.getOrderId()).get();

            //Verify if the user has the Auth to cancel the order.
            if( requester.getRole().equals(Role.USER))
            {
                throw new AuthExceptions.MissingPermissionsException();
            }
            //Verify if the Order is already resumed.
            if(order.getOrderStatus()==Status.DELIVERED)
            {
                throw new OrderExceptions.AlreadyDelivered();
            }
            Notification pauseNotification=Notification.builder()
                    .newStatus(Status.DELIVERED)
                    .previousStatus(order.getOrderStatus())
                    .order(order)
                    .user(order.getCreatedBy())
                    .build();

            order.setReadyBy(requester);
            order.setOrderStatus(Status.DELIVERED);
            order.setReadyDateTime(new Date());

            List<Integer> quantities=order.getOrderQuantities();
            List<Product> products=order.getOrderProducts();
            for(int i=0;i<products.size();i++)
            {
                //case where the store has more or equal to the order quantity
                if(products.get(i).getStoreQuantity()>quantities.get(i))
                {
                    products.get(i).setStoreQuantity(products.get(i).getStoreQuantity()-quantities.get(i));
                }
                //case where the store has less than the order quantity
                if(products.get(i).getStoreQuantity()<quantities.get(i))
                {
                    products.get(i).setStockQuantity(products.get(i).getStockQuantity()-quantities.get(i)+products.get(i).getStoreQuantity());
                    products.get(i).setStoreQuantity(0);
                }
                //case where the store quantity is equal
                if(products.get(i).getStoreQuantity().equals(quantities.get(i)))
                {
                    products.get(i).setStoreQuantity(0);
                }
                //saving new store and stock values
                productRepository.save(products.get(i));
            }

            //Updating other orders status based on the remaining stock, cancelling the ones that need more than what we have

            List<Order> allOrders=repository.findAll();

            allOrders.forEach(other_order->
            {

                List<Product> other_products=other_order.getOrderProducts();
                List<Integer> other_quantities=other_order.getOrderQuantities();
                //verifying quantities
                for(int i=0;i<other_products.size();i++)
                {
                    Product product=other_products.get(i);

                    //Case where the requested Quantity is more than the stock
                    if(product.getStockQuantity()+product.getStoreQuantity()<other_quantities.get(i))
                    {
                        //cancelling order
                        Notification cancelNotification=Notification.builder()
                                .newStatus(Status.CANCELLED)
                                .previousStatus(other_order.getOrderStatus())
                                .order(other_order)
                                .user(other_order.getCreatedBy())
                                .build();

                        other_order.setCancelledBy(SYSTEM_USER);
                        other_order.setOrderStatus(Status.CANCELLED);
                        other_order.setCancelDateTime(new Date());
                        repository.save(other_order);
                        notificationRepository.save(cancelNotification);
                    }
                    //case where the requested Quantity bigger than the store
                    else if(product.getStoreQuantity()<other_quantities.get(i))
                    {
                        //setting order Paused
                        Notification cancelNotification=Notification.builder()
                                .newStatus(Status.PAUSED)
                                .previousStatus(other_order.getOrderStatus())
                                .order(other_order)
                                .user(other_order.getCreatedBy())
                                .build();

                        other_order.setPausedBy(SYSTEM_USER);
                        other_order.setOrderStatus(Status.PAUSED);
                        other_order.setPauseDateTime(new Date());
                        repository.save(other_order);
                        notificationRepository.save(cancelNotification);
                    }
                }
            });

            repository.save(order);
            notificationRepository.save(pauseNotification);
            return ResponseEntity.ok().body("Order is marked Delivered, ID: "+order.getId() );


        }

        catch(MissingParam e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.ORDER_ERRORS).get("ORDER_ERROR04"));
        }
        catch(AuthExceptions.MissingPermissionsException e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.AUTH_ERRORS).get("AUTH_ERROR013"));
        }
        catch(OrderExceptions.AlreadyDelivered e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.ORDER_ERRORS).get("ORDER_ERROR010"));
        }
        catch(OrderExceptions.OrderNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.ORDER_ERRORS).get("ORDER_ERROR01"));
        }
        catch (Exception e)
        {
            System.out.println(e);
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.GLOBAL_ERRORS).get("GLOBAL_ERROR00"));
        }


    }
    @DeleteMapping
    public ResponseEntity<Object>  DeleteOrder( @RequestParam String orderId)
    {
        try {
            Optional<Order> order = repository.findById(orderId);
            if (order.isPresent()) {
                repository.deleteById(orderId);
                notificationRepository.findByOrder(orderId).get().forEach(
                        notification ->
                        {
                            notificationRepository.delete(notification);
                        }
                );
                return ResponseEntity.ok().body("order Deleted.");
            } else {
                throw new ProductExceptions.WrongProductID();
            }
        }
        catch(OrderExceptions.OrderNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.ORDER_ERRORS).get("ORDER_ERROR01"));
        }

    }





}

