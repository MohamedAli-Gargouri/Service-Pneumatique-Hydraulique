
import React from "react";
import { useState } from "react";
import ProductImg1 from "../../assets/images/products/Product1.png"
import ProductImg2 from "../../assets/images/products/product_2.png"
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
    ListItemSuffix,
    ListItem,
    List,
    Select,
    Option,
    IconButton
  } from "@material-tailwind/react";
   export default function Gallery(props) {
const [SelectedImgIndex,SetSelectedImgIndex]=useState(1)   
 const [ProduictImages,SetProductImages]=useState([ProductImg1,ProductImg2,ProductImg2,ProductImg1]) 
    return (
      <React.Fragment>
                <div className="w-full h-full Images container grid grid-cols-8 items-center justify-center">

                    <div className="w-full h-full UnselectedImages col-span-2">

                        <div className=" w-full h-full flex flex-col justify-start items-center flex-wrap">

                           {ProduictImages.map((imageurl,index)=>{
                            
                                return(
                                    <div onClick={()=>{SetSelectedImgIndex(index)}} className={`${index==SelectedImgIndex?"border-red-200":""} Unselected bg-gray-300 rounded-md img border shadow-lg mx-4 my-1  p-4 hover:scale-110 hover:border-red-200 transition duration-300 ease-in-out cursor-pointer`}>                            
                                        <img
                                className="h-full w-full rounded-sm object-cover object-center shadow-x"
                                src={imageurl}
                                />
                                </div>
    
                                )
                            
                           

                           })
                           }
                            

                        </div>

                    </div>
                    <div className="selectedImage col-span-6 ">
                    {ProduictImages.map((imageurl,index)=>{
                            if(index==SelectedImgIndex)
                            {
                                return(
                                    <div className="bg-gray-300 rounded-md Selected shadow-lg img border mx-4 my-1  p-4 hover:cursor-pointer">
                                <img
                                className="h-full w-full rounded-lg object-cover object-center shadow-x"
                                src={imageurl}
                                />
    
                                </div>
    
                                )
                            }
                           

                           })
                           }

                    </div>

                </div>

           

            

        
      </React.Fragment>
    );
  }