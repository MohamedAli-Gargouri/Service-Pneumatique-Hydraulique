import PropTypes from "prop-types"

import axios from 'axios';
const axiosInstance = axios.create({
    // Your Axios instance configuration here
    validateStatus: function (status) {
      return status !== 400; // Do not treat 400 as an error
    },
  });

 
  const API_URL_POST_PRODUCT = process.env.REACT_APP_API_URL+'/api/v1/product';

//function that make a request to create a  category
export const post_Product = async (
productCode,
productBrand,
productName,
productPrice,
storeQuantity,
stockQuantity,
shortDescription,
longDescription,
additionalInformation,
shippingInformation,
productImages,
categoryId,
subCategoryValueIds,
accessToken
) => {

    const data={
        productCode:productCode,
        productBrand:productBrand,
        productName:productName,
        productPrice:productPrice,
        storeQuantity:storeQuantity,
        stockQuantity:stockQuantity,
        shortDescription:shortDescription,
        longDescription:longDescription,
        additionalInformation:additionalInformation,
        shippingInformation:shippingInformation,
        productImages:productImages,
        categoryId:categoryId,
        subCategoryValueIds:subCategoryValueIds    
    }
    try
    {
        const response =axiosInstance.post(`${API_URL_POST_PRODUCT}`, data,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
              },
        });
        return response;
    }
    catch (e)
    {
        //Handle Error Code//
    }
    

};

const API_URL_GETALLPRODUCTS = process.env.REACT_APP_API_URL+'/api/v1/product/all';
//This function get all the categories
export const getProducts = async (size,page,getAll,filterLowStock,filterHighStock,accessToken) => {

    try
    {
        const data={
        }
        const response =axiosInstance.get(`${API_URL_GETALLPRODUCTS}?size=${size}&Page=${page}&getAll=${getAll}&filterLowStock=${filterLowStock}&filterHighStock=${filterHighStock}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
              },
        });
        return response;
    }
    catch (e)
    {
        //Handle Error Code//
    }
    

};
getProducts.propTypes={
    size:PropTypes.number.isRequired,
    page:PropTypes.number.isRequired,
    getAll:PropTypes.bool.isRequired,
    filterLowStock:PropTypes.bool.isRequired,
    filterHighStock:PropTypes.bool.isRequired,
    accessToken:PropTypes.string.isRequired
}



