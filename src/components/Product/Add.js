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
    IconButton,
    Rating,
    Textarea
  } from "@material-tailwind/react";
  import React from "react";
 import Navbar from "../../components/NavBar"
 import Pagination from "../../components/Pagination";
 import TranslatedText from "../../utils/Translation";
 import {TranslateString} from "../../utils/Translation";
 import CustomTab from "../../components/Tab"
 import { useSelector } from "react-redux/es/hooks/useSelector";
import Footer from "../../components/footer"
import Gallery from "../../components/Gallery"

import ProductImg1 from "../../assets/images/products/product_1.png"
import ProductImg2 from "../../assets/images/products/product_2.png"
import {LightMode,DarkMode} from "../../redux/actions/LightActions"

  export default function Product() {
    const LightModeState=useSelector(state=>state.lightMode)
    return (
        <React.Fragment>

 <div class="h-full w-full mb-[1rem]  grid grid-cols-2 justify-center items-center ">

<div className="h-full w-full ImageGallery col-span-2 md:col-span-1">
    <Gallery Deletable={false} Addable={true} />
</div>

<div  className="mt-4 h-full gap-2 w-full Description col-span-2 md:col-span-1 flex flex-col items-center  justify-center">


    <Input   id="ProductImgInput" type="file" variant="static"  className="hidden"    />
    <Input   labelProps={{style:{color:LightModeState==LightMode().type?"black":"white"}}} label=" Product Name"   icon={<i class="fa-solid fa-info"></i>} />   

    <Input   labelProps={{style:{color:LightModeState==LightMode().type?"black":"white"}}} label="Product Price"   icon={<i class="fa-solid fa-dollar-sign"></i>} /> 
    <Input   labelProps={{style:{color:LightModeState==LightMode().type?"black":"white"}}} label="Product Code"   icon={<i class="fa-solid fa-barcode"></i>} />

    <Input  labelProps={{style:{color:LightModeState==LightMode().type?"black":"white"}}} label="Store Quantity"   icon={<i class="fa-solid fa-store"></i>} />
    <Input   labelProps={{style:{color:LightModeState==LightMode().type?"black":"white"}}} label="Stock Quanitty"   icon={<i class="fa-solid fa-warehouse"></i>} />
    <Textarea  labelProps={{style:{color:LightModeState==LightMode().type?"black":"white"}}}  size="lg"   label="Short Description"  defaultValue=""/>


    <hr className="m-1"/>


<Select  label="Product Category">
  <Option  value={1}>Max Dryer</Option>
  <Option value={2}>Tube</Option>
  <Option value={3}>Another Option</Option>
  <Option value={4}>Compressor</Option>
</Select>

   
</div>
</div>
<div className="w-full">
<CustomTab 
data={
  [
    {
      label: "Long Description",
      value: "Long Description",
      icon:<i class="fa-solid fa-circle-info mx-4"></i>,
      desc: 
      <div class="">
        <Typography variant="h6" className="font-bold m-4">
     Long Description
    </Typography>

    <Textarea size="lg" label="Product Description"  defaultValue=""/>


  </div>      
    },
    {
      label: "Additional Information",
      value: "Additional Information",
      icon:<i class="fa-solid fa-info mx-4"></i>,
      desc:   <div class="">
         <Typography variant="h6" className="font-bold m-4">
         Additional Information
    </Typography>
    <Textarea size="lg" label="Product Description"  defaultValue=""/>

        </div>,
    },
    {
      label: "Shipping & returns",
      value: "Shipping & returns",
      icon:<i class="fa-solid fa-truck-fast mx-4"></i>,
      desc:   <div class="">
         <Typography variant="h5" className=" font-bold m-4">
         Delivery & returns
    </Typography>

    <Textarea size="lg" label="Product Description"  defaultValue=""/>


        </div>,
    }
  ]
}
DefaultSelectValue={"Long Description"}
/>
</div>

<div className=" flex justify-center">
<Button className=" flex items-center gap-3">
<i class="fa-solid fa-plus"></i>
        Create Product 
      </Button>
</div>

</React.Fragment>


    );
  }