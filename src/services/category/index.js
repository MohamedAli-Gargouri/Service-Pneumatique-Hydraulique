
import PropTypes from "prop-types"
import axios from 'axios';
const axiosInstance = axios.create({
    // Your Axios instance configuration here
    validateStatus: function (status) {
      return status !== 400; // Do not treat 400 as an error
    },
  });

const API_URL_CREATECATEGORY = process.env.REACT_APP_API_URL+'/api/v1/Category'; 
const API_URL_CREATESUBCATEGORY = process.env.REACT_APP_API_URL+'/api/v1/subCategory';
const API_URL_CREATESUBCATEGORYValue = process.env.REACT_APP_API_URL+'/api/v1/SubCategoryValue';

//function that make a request to create a  category
export const createCategory = async (name,fileName,fileExtension,fileSize,fileBinary,accessToken) => {

    const data={
        name:name,
        categoryImg_File:{
            name:fileName,
            extension:fileExtension,
            size:fileSize,
            fileBinary:fileBinary
        },     
    }
    try
    {
        const response =axiosInstance.post(`${API_URL_CREATECATEGORY}`, data,{
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

const API_URL_GETALLCATEGORIES = process.env.REACT_APP_API_URL+'/api/v1/Category/all';
//This function get all the categories
export const getCategories = async (size,page,getAll,accessToken) => {

    try
    {
        const data={
        }
        const response =axiosInstance.get(`${API_URL_GETALLCATEGORIES}?size=${size}&page=${page}&getAll=${getAll}`,{
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

const API_URL_GETALLSUBCATEGORIES = process.env.REACT_APP_API_URL+'/api/v1/subCategory/all';

export const getSubCategories = async (size,page,getAll,accessToken) => {

    try
    {
        const data={
        }
        const response =axiosInstance.get(`${API_URL_GETALLSUBCATEGORIES}?size=${size}&page=${page}&getAll=${getAll}`,{
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

const API_URL_GETSUBCATEGORIES_BY_SUBGROUPID = process.env.REACT_APP_API_URL+'/api/v1/SubCategoryValue/ByCategory';
export const getSubCategoryValuesByCategory = async (categoryId,accessToken) => {

    try
    {
        const data={
        }
        const response =axiosInstance.get(`${API_URL_GETSUBCATEGORIES_BY_SUBGROUPID}?CategoryId=${categoryId}`,{
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

const API_URL_EDITSUBCATEGORY = process.env.REACT_APP_API_URL+'/api/v1/subCategory';
export const PutSubCategory = async (SubCategoryId,SubCategoryName,CategoryId,accessToken) => {

    try
    {
        const data={
            id:SubCategoryId,
            name:SubCategoryName,
            categoryId:CategoryId
        }
        const response =axiosInstance.put(`${API_URL_EDITSUBCATEGORY}`,data,{
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


//This function modifies a Category
const API_URL_PUTCATEGORY = process.env.REACT_APP_API_URL+'/api/v1/Category';
export const PutCategory = async (CategoryId,CategoryName,IMG_Name,IMG_extension,IMG_Size,IMG_Binary,accessToken) => {

    try
    {
        const data={
            
                id:CategoryId,
                name:CategoryName,
                categoryImg_File:
                {
                    name:IMG_Name,
                    extension:IMG_extension,
                    size:IMG_Size,
                    fileBinary:IMG_Binary
                }
            
        }
        const response =axiosInstance.put(`${API_URL_PUTCATEGORY}`,data,{
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


//This function Delete a Category
const API_URL_DELETECATEGORY = process.env.REACT_APP_API_URL+'/api/v1/Category';
export const DELETECategory = async (CategoryId,accessToken) => {

    try
    {
        const response =axiosInstance.delete(`${API_URL_DELETECATEGORY}?categoryId=${CategoryId}`,{
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

//This function Delete a SubCategory
const API_URL_DELETESubCATEGORY = process.env.REACT_APP_API_URL+'/api/v1/subCategory';
export const DELETESubCategory = async (SubCategoryId,accessToken) => {

    try
    {
        const response =axiosInstance.delete(`${API_URL_DELETESubCATEGORY}?subCategoryId=${SubCategoryId}`,{
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

// Function to creates a sub-Category
export const createSubCategory = async (name,categoryId,accessToken) => {

    const data={
        name:name,
        categoryId:categoryId
        }
    const response = axiosInstance.post(`${API_URL_CREATESUBCATEGORY}`, data,{
        headers: {
            Authorization: `Bearer ${accessToken}`,
          },
    });
    return response;

};

//This function create a simple subcategoryValue
export const createSubCategoryValue = async (value,subCategoryId,accessToken) => {

    const data={
        subCategoryId:subCategoryId,
        value:value
        }
    const response = axiosInstance.post(`${API_URL_CREATESUBCATEGORYValue}`, data,{
        headers: {
            Authorization: `Bearer ${accessToken}`,
          },
    });
    return response;

};


createCategory.propTypes={
    name:PropTypes.string.isRequired,
    fileName:PropTypes.string.isRequired,
    fileExtension:PropTypes.string.isRequired,
    fileSize:PropTypes.number.isRequired,
    fileBinary:PropTypes.string.isRequired
}
createSubCategory.propTypes={
    name:PropTypes.string.isRequired,
    categoryId:PropTypes.string.isRequired
}
