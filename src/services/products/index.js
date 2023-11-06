
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
