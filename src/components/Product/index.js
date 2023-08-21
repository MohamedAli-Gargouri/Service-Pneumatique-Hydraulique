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
import QuantityInput from "../../components/Input/Quantity"
import Breadcrump from "../../components/Breadcrump"
import {LightMode,DarkMode} from "../../redux/actions/LightActions"

  export default function Product() {
    const LightModeState=useSelector(state=>state.lightMode)
    return (
        <React.Fragment>

 <div class="h-full w-full mb-[1rem]  grid grid-cols-2 justify-center items-center ">

<div className="h-full w-full ImageGallery col-span-2 md:col-span-1">
    <Gallery Deletable={true} Addable={true}/>
</div>

<div className="mt-4 h-full gap-2 w-full Description col-span-2 md:col-span-1 flex flex-col items-center  justify-center">



    <Input defaultValue="MX-15648679" labelProps={{style:{color:LightModeState==LightMode().type?"black":"white"}}} label=" Product Name"   icon={<i class="fa-solid fa-info"></i>} />   

    <Input defaultValue="500TND" labelProps={{style:{color:LightModeState==LightMode().type?"black":"white"}}} label="Product Price"   icon={<i class="fa-solid fa-dollar-sign"></i>} /> 
    <Input defaultValue="25648497889" labelProps={{style:{color:LightModeState==LightMode().type?"black":"white"}}} label="Product Code"   icon={<i class="fa-solid fa-barcode"></i>} /> 

    <Textarea size="lg" label="Product Description"  defaultValue="Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing. Sed lectus."/>


    <hr className="m-1"/>

    <Select value="Compressor" label="Product Category">
  <Option value={1}>Max Dryer</Option>
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
      label: "Description",
      value: "Description",
      icon:<i class="fa-solid fa-circle-info mx-4"></i>,
      desc: 
      <div class="">
        <Typography variant="h6" className="font-bold m-4">
     Product Information
    </Typography>

    <Textarea size="lg" label="Product Description"  defaultValue="    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus.
Nunc nec porttitor turpis. In eu risus enim. In vitae mollis elit.
Vivamus finibus vel mauris ut vehicula.
Nullam a magna porttitor, dictum risus nec, faucibus sapien.
Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus."/>


  </div>      
    },
    {
      label: "Additional Information",
      value: "Additional Information",
      icon:<i class="fa-solid fa-info mx-4"></i>,
      desc:   <div class="">
         <Typography variant="h6" className="font-bold m-4">
         Information
    </Typography>
    <Textarea size="lg" label="Product Description"  defaultValue="    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus.
Nunc nec porttitor turpis. In eu risus enim. In vitae mollis elit.
Vivamus finibus vel mauris ut vehicula.
Nullam a magna porttitor, dictum risus nec, faucibus sapien.
Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus."/>

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

    <Textarea size="lg" label="Product Description"  defaultValue="    We deliver to over 100 countries around the world. For full details of the delivery options we offer, please view our Delivery information
We hope you’ll love every purchase, but if you ever need to return an item you can do so within a month of receipt. For full details of how to make a return, please view our"/>


        </div>,
    }
  ]
}
DefaultSelectValue={"Description"}
/>
</div>

<div className=" flex justify-center">
<Button className=" flex items-center gap-3">
<i class="fa-solid fa-floppy-disk"></i>
        Save Product Informations
      </Button>
</div>

</React.Fragment>


    );
  }