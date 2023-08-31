
import React from "react";
import { useState } from "react";

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
  import ConfirmDialog from "../Dialog/Confirm"
  import PlaceHolderImg from "../../assets/images/Placeholderimg.png"

  import {toast } from 'react-toastify';
  
   export default function Gallery({AddedImages,Images,Addable,Deletable}) {
const [SelectedImgIndex,SetSelectedImgIndex]=useState(0) 
const [OpenDeleteDialog,SetOpenDeleteDialog]=useState(false)
const [ProductImages,SetProductImages]=useState(Images!=undefined?Images:[PlaceHolderImg]) 
const PlaceholderURL="https://via.placeholder.com/300x200.png?text=Placeholder+Image"
  
const handleImageUpload = (e) => {
    if(ProductImages.length<3)
    {
        const file = e.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          SetProductImages(ProductImages.length==1&&ProductImages[0]==PlaceholderURL?[imageUrl]:[...ProductImages,imageUrl])
          SetSelectedImgIndex(ProductImages.length==1&&ProductImages[0]==PlaceholderURL?0:ProductImages.length)
          AddedImages.current=[...AddedImages.current,imageUrl]
          
        }
    }else
    {
        toast.info('You cannot add more than three images.', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: toast.SLIDE, // This enables the slide animation
              
            });
    }
 
};

const handleDelete = (e) => {
    SetProductImages(ProductImages.length==1?[PlaceholderURL]:ProductImages.filter((a,index)=>index!=SelectedImgIndex))
    SetSelectedImgIndex(0)
  };
    return (
      <React.Fragment>
                <div className="w-full h-full grid grid-cols-8 items-center justify-center">
                          {/*==================Here is the unselected Pictures=================== */}
                    <div className=" order-2 md:order-1 col-span-8 md:block w-full h-full UnselectedImages md:col-span-2 ">

                        <div className="flex w-full h-full flex-row md:flex-col justify-center md:justify-center items-center flex-wrap">

                           {ProductImages.map((imageurl,index)=>{
                            
                                return(
                                    <div onClick={()=>{SetSelectedImgIndex(index)}} className={` w-20  h-16 md:w-28 md:h-24 ${index==SelectedImgIndex?"border border-red-400":""} Unselected bg-gray-300 rounded-md img  shadow-lg mx-1  my-1 hover:scale-110 hover:border-red-200 transition duration-300 ease-in-out cursor-pointer`}>                            
                                        <img
                                className="rounded-sm w-full h-full  shadow-x"
                                src={imageurl}
                                />
                                </div>
    
                                )
                            
                           

                           })
                           }
                            

                        </div>

                    </div>

                    {/*==================Here is the selected Picture=================== */}
                    <div className="order-1 selectedImage col-span-8 md:col-span-6 w-full h-full ">
                    {ProductImages.map((imageurl,index)=>{
                            if(index==SelectedImgIndex)
                            {
                                return(
                                <div className="relative h-52  bg-gray-300 rounded-md Selected shadow-lg img  mx-1  my-1 md:mr-2 md:h-96  hover:cursor-pointer">
                                <img
                                className=" Imageshadow w-full h-full  rounded-md  bg-cover  shadow-x"
                                src={imageurl}
                                />

                                <Input   id="ProductImgInput" type="file" variant="static" accept="image/*" onChange={handleImageUpload}  className="hidden"    />
                                <div className="absolute p-2 w-full bottom-[0%] flex flex-row justify-around items-center flex-wrap"> 
                                {Addable!=undefined &&Addable==true ?<IconButton className="mx-2 rounded-full" onClick={()=>{document.getElementById("ProductImgInput").click()}}>
                                    <i class="fa-solid fa-plus"></i>
                                    </IconButton>:null}
                                   {Deletable!=undefined &&Deletable==true ?<IconButton className="mx-2 rounded-full" onClick={()=>{SetOpenDeleteDialog(!OpenDeleteDialog)}}>
                                   <i class="fa-solid fa-circle-xmark"></i>
                                    </IconButton>:null}


                                </div>

                                </div>
    
                                )
                            }
                           

                           })
                           }

                    </div>

                    <ConfirmDialog  Open={OpenDeleteDialog} Action={()=>{handleDelete()}} HandleOpen={()=>{SetOpenDeleteDialog(!OpenDeleteDialog)}} Icon={'<i class="fa-solid fa-trash h-5 w-5 mx-1"></i>'} Title={"Delete Product Image"} Content="Are you sure you want to delete this product's image ?" />
                </div>

           

            

        
      </React.Fragment>
    );
  }