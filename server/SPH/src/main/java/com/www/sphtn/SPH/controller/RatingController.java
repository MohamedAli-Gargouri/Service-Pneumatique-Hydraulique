package com.www.sphtn.SPH.controller;

import com.www.sphtn.SPH.DTO.Errors.ErrorType;
import com.www.sphtn.SPH.DTO.Errors.ErrorsReader;
import com.www.sphtn.SPH.DTO.Order.CreateOrderRequest;
import com.www.sphtn.SPH.DTO.Order.PutOrderRequest;
import com.www.sphtn.SPH.DTO.Rating.CreateRatingRequest;
import com.www.sphtn.SPH.Exceptions.Auth.AuthExceptions;
import com.www.sphtn.SPH.Exceptions.General.MissingParam;
import com.www.sphtn.SPH.Exceptions.Order.OrderExceptions;
import com.www.sphtn.SPH.Exceptions.Products.ProductExceptions;
import com.www.sphtn.SPH.Exceptions.Rating.RatingExceptions;
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
@RequestMapping("/api/v1/Rating")
@RequiredArgsConstructor
public class RatingController {
    @Autowired
     private RateRepository repository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private JwtService jwtService;
    @GetMapping("/all")
    public ResponseEntity<Page<Rating>>  getRatings(
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "0") int Page)
    {
        PageRequest pageable =  PageRequest.of(Page, size);
        return ResponseEntity.ok().body(repository.findAll((PageRequest) pageable));
    }

    @GetMapping
    public ResponseEntity<Object>  getOrder( @RequestParam String ratingId)
    {
        try {


            Optional<Rating> rating = repository.findById(ratingId);
            if (rating.isPresent()) {
                return ResponseEntity.ok().body(rating.get());
            } else {
                throw new OrderExceptions.OrderNotFound();
            }
        }
        catch(RatingExceptions.RatingNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.RATING_ERRORS).get("RATING_ERROR01"));
        }

    }
    @PostMapping
    public ResponseEntity<Object> createRating(@RequestHeader("Authorization") String authorizationHeader,@RequestBody CreateRatingRequest createRatingRequest)
    {
        try
        {
            //Getting the requester from the accessToken
            String accessToken = authorizationHeader.substring(7);
            User requester=userRepository.findByUsername(jwtService.extractUsername(accessToken)).get();

            //==============TESTING IF THE BODY MATCHES THE REQUEST FORMAT==============
            boolean OneAttributeIsNull = Stream.of(
                            createRatingRequest.getRateValue(),
                            createRatingRequest.getProductId()
                    )
                    .anyMatch(Objects::isNull);
            if(OneAttributeIsNull)
            {
                throw new MissingParam();
            }
            //Verify if the product rating is valid.
            if(productRepository.findById(createRatingRequest.getProductId()).isEmpty())
            {
                throw new ProductExceptions.WrongProductID();
            }
            //test if the rating value is a valid number between 0 and 5
            if(createRatingRequest.getRateValue()<0 || createRatingRequest.getRateValue()>5)
            {
              throw new RatingExceptions.RatingNotFound();
            }
            Product product=productRepository.findById(createRatingRequest.getProductId()).get();
            //case where the user didn't rate this product
            if(repository.findByProductUser(requester.getId(),product.getId()).isEmpty())
            {
                Rating newRating=Rating.builder()
                        .rateValue(createRatingRequest.getRateValue())
                        .product(product)
                        .user(requester)
                        .build();
                repository.save(newRating);
                return ResponseEntity.ok().body("Rating created, ID: "+newRating.getId() );
            }
            //Case where he already rated this product but changed the rating.
            else
            {
                Rating oldRating=repository.findByProductUser(requester.getId(),product.getId()).get();
                oldRating.setRateValue(createRatingRequest.getRateValue());
                repository.save(oldRating);
                return ResponseEntity.ok().body("Rating updated, ID: "+oldRating.getId() );
            }



        }

        catch(MissingParam e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.RATING_ERRORS).get("RATING_ERROR03"));
        }
        catch(ProductExceptions.WrongProductID e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.PROD_ERRORS).get("PRODUCT_ERROR02"));
        }
        catch(RatingExceptions.InvalidRatingValue e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.RATING_ERRORS).get("RATING_ERROR02"));
        }
        catch (Exception e)
        {
            System.out.println(e);
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.GLOBAL_ERRORS).get("GLOBAL_ERROR00"));
        }


    }


    @DeleteMapping
    public ResponseEntity<Object>  DeleteRating( @RequestParam String ratingId)
    {
        try {
            Optional<Rating> rating = repository.findById(ratingId);
            if (rating.isPresent()) {
                repository.deleteById(ratingId);
                return ResponseEntity.ok().body("Rating Deleted.");
            } else {
                throw new RatingExceptions.RatingNotFound();
            }
        }
        catch(RatingExceptions.RatingNotFound e)
        {
            return ResponseEntity.badRequest().body(ErrorsReader.GetErrors(ErrorType.RATING_ERRORS).get("RATING_ERROR01"));
        }

    }





}

