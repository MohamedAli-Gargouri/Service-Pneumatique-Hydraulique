import Navbar from "../../components/NavBar"
import Footer from "../../components/footer"
import {
Typography,
  } from "@material-tailwind/react";
  import React from "react";
  import { Button } from "@material-tailwind/react";
  import TranslatedText from "../../utils/Translation"
  import SPHLogo from "../../assets/images/SPH Logo.png"
import ProductCarousel from "../../components/Carousel/productsCarousel"

import { useSelector } from "react-redux/es/hooks/useSelector";
import {LightMode,DarkMode} from "../../redux/actions/LightActions"


const Presentation =()=>{
  const LightModeState=useSelector(state=>state.lightMode)
  return (<React.Fragment>
<div className={`Presentation flex flex-wrap  items-center justify-center ${LightModeState==LightMode().type?"ContainerWhiteMode":"ContainerDarkMode"}`}>

<div className=" flex flex-col flex-wrap  justify-center items-center">
        <div className="col-span-12">
          
          <div className="flex items-center justify-center h-full mt-4">
          <hr className="border-red-600 rounded-lg w-[30%] h-[0.35rem] bg-red-600 m-4"/>
          <img
            src={SPHLogo}
            alt="image 3"
            className="block  object-fit: cover w-1/5 h-1/1 relative "
            
            />
          <hr className="border-red-600 rounded-lg w-[30%] h-[0.35rem] bg-red-600 m-4"/>
          </div>
        </div>

        <div className="col-span-12">

          <div className="flex items-center justify-center h-full">


          <div className="block container mx-auto relative">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          
          <div className="flex items-center justify-center">
          <Typography   variant="h1" color="blue-gray" className={` text-center m-4 ${LightModeState==LightMode().type?"TextWhiteMode":"TextDarkMode"}`}>
          Unleashing Fluid Power Innovation
            </Typography>

          </div>
        </div>
        <div className="col-span-12">

          <div className="flex items-center justify-center h-full">
          <Button color="red" className="shadowed-div flex items-center gap-3 m-4 hover:scale-x-105 hover:scale-y-105">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>

            Contact us
          </Button>

          <Button color="red" className="shadowed-div flex items-center gap-3 m-4 hover:scale-x-105 hover:scale-y-105">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>

            Check Products
          </Button>
          </div>
        </div>

      </div>
    </div>





          </div>
        </div>
        <div className="col-span-12">

          <div className="flex items-center justify-center h-full">
            
          <Typography   variant="p" color="blue-gray" className={`m-4 ${LightModeState==LightMode().type?"TextWhiteMode":"TextDarkMode"}`}><TranslatedText TranslationPath="Home.Presentation"/> </Typography>
          </div>
        </div>

        
  

</div>

<div className=" w-full col-span-12">
          <ProductCarousel/>
         </div>



</div>
    </React.Fragment>)
}
export default Presentation;