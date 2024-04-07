package com.www.sphtn.SPH.DTO.Order;
import com.www.sphtn.SPH.DTO.Product.ProductDTO;
import com.www.sphtn.SPH.DTO.User.UserDTO;
import com.www.sphtn.SPH.DTO.User.UserWithImageDTO;
import com.www.sphtn.SPH.model.Status;
import com.www.sphtn.SPH.model.User;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import java.util.Date;
import java.util.List;
@Data
@Builder
public class OrderDTO {
    @Id
    private String id;
    private Status orderStatus;
    private Date createDateTime;
    private Date cancelDateTime;
    private Date resumeDateTime;
    private Date paidDateTime;
    private Date pauseDateTime;
    private Date readyDateTime;
    private UserWithImageDTO createdBy;
    private UserDTO resumedBy;
    private UserDTO cancelledBy;
    private UserDTO pausedBy;
    private UserDTO paidBy;
    private UserDTO readyBy;
    private List<ProductDTO> orderProducts;
    private List<Integer> orderQuantities;

}
