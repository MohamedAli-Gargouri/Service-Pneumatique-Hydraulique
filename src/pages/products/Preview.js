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
    Rating
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
  export default function Products() {
    const LightModeState=useSelector(state=>state.lightMode)
    return (
        <React.Fragment>
            <Navbar/>
            <div className=" w-full pt-[20vh] md:pt-[15vh] ">
    <Breadcrump List={false} Parent={{PageUrl:"/Products",PageName:"Shop"}} Child={{PageUrl:"/ProductDetails",PageName:"Product"}} />
    </div>
 <div class="h-full w-full mb-[1rem]  grid grid-cols-2 justify-center items-center ">

<div className="h-full w-full ImageGallery col-span-2 md:col-span-1">
    <Gallery/>
</div>

<div className="h-full w-full Description col-span-2 md:col-span-1 flex flex-col items-center md:items-start  justify-center">

    <div className="Product Title">
    <Typography variant="h6" className="font-extralight">
    MX-15648679
    </Typography>   
    </div>
    <div className="Product Reviews">
        <Rating/>
    </div>

    <div className="Product Price">
    <Typography variant="h6" color="green" className="font-extralight">
     1500TND
    </Typography> 
    </div>

    <div className="Product Description ">
    <Typography variant="p"  className="font-extralight m-4 md:m-0">
    Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing. Sed lectus.
    </Typography>
    </div>

    <div className="Product Quantity ">
     <QuantityInput/>
    </div>

    <div className="Product Actions md:ml-3" >

    
    <Button fullWidth className="flex items-center gap-1 w-full hover:scale-110">
        <i class="fa-solid fa-cart-plus"></i>
            Add to Cart
        </Button>
    
    

    </div>
    <div className="w-full">
    <hr className="m-6"/>
    </div> 
    <div className="Product Category w-full">
    <Typography variant="p" className="font-extralight">
     Category: Compressors, Pneumatiques
    </Typography>
    </div>
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

    <Typography variant="p" className="font-extralight">
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus.

Nunc nec porttitor turpis. In eu risus enim. In vitae mollis elit.
Vivamus finibus vel mauris ut vehicula.
Nullam a magna porttitor, dictum risus nec, faucibus sapien.
Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus.
    </Typography>

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
    <Typography variant="p" className="font-extralight">
    Information
Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci.

Fabric & care
Faux suede fabric
Gold tone metal hoop handles.
RI branding
Snake print trim interior
Adjustable cross body strap
Height: 31cm; Width: 32cm; Depth: 12cm; Handle Drop: 61cm
Size
one size
    </Typography>

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
    <Typography variant="p" className="font-extralight">
    We deliver to over 100 countries around the world. For full details of the delivery options we offer, please view our Delivery information
We hope you’ll love every purchase, but if you ever need to return an item you can do so within a month of receipt. For full details of how to make a return, please view our
    </Typography>

        </div>,
    }
  ]
}
DefaultSelectValue={"Description"}
/>
</div>

<Footer/>
</React.Fragment>


    );
  }