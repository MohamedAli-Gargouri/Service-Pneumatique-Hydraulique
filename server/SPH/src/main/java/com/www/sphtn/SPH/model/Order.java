package com.www.sphtn.SPH.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "Orders")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    @Id
    private String id;
    private Status orderStatus;
    private Date createDateTime;
    private Date cancelDateTime;
    private Date resumeDateTime;
    private Date paidDateTime;
    private Date pauseDateTime;
    private Date readyDateTime;
    @DBRef
    private User createdBy;
    @DBRef
    private User resumedBy;
    @DBRef
    private User cancelledBy;
    @DBRef
    private User pausedBy;
    @DBRef
    private User paidBy;
    @DBRef
    private User readyBy;
    @DBRef
    private List<Product> orderProducts;

    private List<Integer> orderQuantities;

}
