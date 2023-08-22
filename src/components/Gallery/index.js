
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
   export default function Gallery(props) {
const [SelectedImgIndex,SetSelectedImgIndex]=useState(0) 
const [OpenDeleteDialog,SetOpenDeleteDialog]=useState(false)
 const [ProduictImages,SetProductImages]=useState(props.Images!=undefined?props.Images:[PlaceHolderImg]) 
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
                                className=" Imageshadow h-full w-full rounded-lg object-cover object-center shadow-x"
                                src={imageurl}
                                />
                                {props.Addable!=undefined &&props.Addable==true ?<IconButton className="mx-2 rounded-full" onClick={()=>{document.getElementById("ProductImgInput").click()}}>
                                    <i class="fa-solid fa-plus"></i>
                                    </IconButton>:null}
                                    {console.log(props.Deletable)}
                                   {props.Deletable!=undefined &&props.Deletable==true ?<IconButton className="mx-2 rounded-full" onClick={()=>{SetOpenDeleteDialog(!OpenDeleteDialog)}}>
                                   <i class="fa-solid fa-circle-xmark"></i>
                                    </IconButton>:null}
                                    

                                </div>
    
                                )
                            }
                           

                           })
                           }

                    </div>

                    <ConfirmDialog  Open={OpenDeleteDialog} Action={()=>{console.log("Deleting Image")}} HandleOpen={()=>{SetOpenDeleteDialog(!OpenDeleteDialog)}} Icon={'<i class="fa-solid fa-trash"></i>'} Title={"Delete Product Image"} Content="Are you sure you want to delete?" />
                </div>

           

            

        
      </React.Fragment>
    );
  }