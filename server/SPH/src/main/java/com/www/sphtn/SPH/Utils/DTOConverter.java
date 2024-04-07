package com.www.sphtn.SPH.Utils;

import com.www.sphtn.SPH.DTO.Order.OrderDTO;
import com.www.sphtn.SPH.DTO.Product.ProductDTO;
import com.www.sphtn.SPH.DTO.User.UserDTO;
import com.www.sphtn.SPH.DTO.User.UserWithImageDTO;
import com.www.sphtn.SPH.model.Order;
import com.www.sphtn.SPH.model.Product;
import com.www.sphtn.SPH.model.User;

import java.util.ArrayList;
import java.util.List;

public class DTOConverter {

    /**
     *  Converts a product Object to a ProductDTO
     * @param prd Product Object
     * @return ProductDTO Object
     */
    public static ProductDTO ToProductDTO(Product prd)
    {
        if(prd!=null)
        {
            return ProductDTO.builder()
                    .id(prd.getId())
                    .productBrand(prd.getProductBrand())
                    .productCode(prd.getProductCode())
                    .createDateTime(prd.getCreateDateTime())
                    .productBrand(prd.getProductBrand())
                    .productName(prd.getProductName())
                    .productPrice(prd.getProductPrice())
                    .stockQuantity(prd.getStockQuantity())
                    .storeQuantity(prd.getStoreQuantity())
                    .shortDescription(prd.getShortDescription())
                    .longDescription(prd.getLongDescription())
                    .additionalInformation(prd.getAdditionalInformation())
                    .shippingInformation(prd.getShippingInformation()).build();
        } else {
            return null;
        }




    }

    /**
     * Converts an Array of Products to an array of ProductsDTO
     * @param prds Array of Products
     * @return
     */
    public static List<ProductDTO> ToProductsDTO(List<Product> prds)
    {
        List<ProductDTO> productDTOS=new ArrayList<ProductDTO>();
        for(Product product : prds){
            productDTOS.add(DTOConverter.ToProductDTO(product));
    }
        return productDTOS;

    }

    /**
     *  Converts a user object to a UserWithImage DTO Object
     * @param usr User Object
     * @return UserWithImageDTO object
     */
    public static UserWithImageDTO ToUserWithImageDTO(User usr)
    {
        if(usr!=null)
        {
            return UserWithImageDTO.builder()
                    .id(usr.getId())
                    .internationalDialNumber(usr.getInternationalDialNumber())
                    .email(usr.getEmail())
                    .phoneNumber(usr.getPhoneNumber())
                    .userName(usr.getUsername())
                    .firstName(usr.getFirstName())
                    .lastName(usr.getLastName())
                    .profileImage(usr.getProfileImage())
                    .build();
        } else{
            return null;
        }


    }
    /**
     *  Converts a user object to a User DTO Object
     * @param usr User Object
     * @return UserDTO object
     */
    public static UserDTO ToUserDTO(User usr)
    {
        if(usr!=null)
        {
            return UserDTO.builder()
                    .id(usr.getId())
                    .internationalDialNumber(usr.getInternationalDialNumber())
                    .email(usr.getEmail())
                    .phoneNumber(usr.getPhoneNumber())
                    .userName(usr.getUsername())
                    .firstName(usr.getFirstName())
                    .lastName(usr.getLastName())
                    .build();
        } else{
            return null;
        }


    }

    /**
     *
     * @param order Order Object
     * @return orderDTO Object
     */
    public static OrderDTO ToOrderDTO(Order order)
    {
        if(order!=null)
        {
        return OrderDTO.builder()
                .id(order.getId())
                .cancelDateTime(order.getCancelDateTime())
                .cancelledBy(DTOConverter.ToUserDTO(order.getCancelledBy()))
                .orderProducts(DTOConverter.ToProductsDTO(order.getOrderProducts()))
                .orderQuantities(order.getOrderQuantities())
                .orderStatus(order.getOrderStatus())
                .paidBy(DTOConverter.ToUserDTO(order.getPaidBy()))
                .paidDateTime(order.getPaidDateTime())
                .pauseDateTime(order.getPauseDateTime())
                .createdBy(DTOConverter.ToUserWithImageDTO(order.getCreatedBy()))
                .readyBy(DTOConverter.ToUserDTO(order.getReadyBy()))
                .readyDateTime(order.getReadyDateTime())
                .resumeDateTime(order.getResumeDateTime())
                .resumedBy(DTOConverter.ToUserDTO(order.getResumedBy()))
                .pausedBy(DTOConverter.ToUserDTO(order.getPausedBy()))
                .createDateTime(order.getCreateDateTime())

                .build();}
        else{
            return null;
        }

    }

    /**
     *  Converts an array of orders to an array of Orders DTO
     * @param orders Array of Orders
     * @return Array of OrdersDto
     */
   public static List<OrderDTO> ToOrdersDTO(List<Order> orders)
    {
        List<OrderDTO> ordersDTOS=new ArrayList<OrderDTO>();
        for(Order order : orders){
            ordersDTOS.add(DTOConverter.ToOrderDTO(order));
        }
        return ordersDTOS;

    }
}
