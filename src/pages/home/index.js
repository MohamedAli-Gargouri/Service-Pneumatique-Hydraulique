import Navbar from "../../components/NavBar"
import Footer from "../../components/footer"
import React from "react";
import PresentationSection from "./PresentationSection"
import ServicesSection from "./ServicesSection"
import HeroImage from "../../assets/images/background1.png"
import HeroCompressor from "../../assets/images/HeroBannerCompressor.png"
import Partners from "./Partners"
import Employees from "./Employees";
import {
  Typography,Button
    } from "@material-tailwind/react";
const Home =()=>{

  return(<React.Fragment>   
<Navbar/>
<div  style={{backgroundImage:`url(${HeroImage})`}} className=" flex justify-center items-center flex-wrap gap-1 bg-cover aspect-video  h-[170vh] md:h-[100vh] w-full  ">

<div className=" order-2 mt-0 md:order-1 w-full animate-LeftToRight md:w-fit md:h-[70%] aspect-square">
<img className="m-0  animate-rotate   Imageshadow" src={HeroCompressor}/>
</div>



<div className=" order-1 mt-28 h-[50%] md:mt-0  w-full md:h-full md:w-[50%] flex justify-center  items-start md:items-center p-4">
<div  className="w-full md:w-fit  text-white Imageshadow text-center animate-RightToLeft bg-opacity-0 hover:scale-105 bg-red-600  backdrop-blur-md rounded-lg flex flex-col justify-start gap-0 items-center pt-3">
  
<Typography variant="h1" >
         Service Pneumatique Hydraulique
      </Typography>

      <Typography variant="h7" className=" italic" >
         "Welcome to SPH, Your Trusted Source for Innovative Air Compressors and Air Solutions!

At SPH, we are dedicated to revolutionizing the way industries harness the power of air. With a passion for excellence and a commitment to quality, we proudly offer a comprehensive range of cutting-edge air compressors and air-related solutions to meet the diverse needs of businesses across various sectors.
      </Typography>

      <div className="flex items-center justify-center h-full">
          <Button color="white" variant="outlined"  className=" italic shadowed-div flex items-center gap-3 m-4 hover:scale-x-105 hover:scale-y-105">
          <i class="fa-solid fa-phone"></i>

            Contact us
          </Button>

          <Button  color="white" variant="outlined" className=" italic shadowed-div flex items-center gap-3 m-4 hover:scale-x-105 hover:scale-y-105">
          <i class="fa-solid fa-cart-shopping"></i>
            Check Products
          </Button>
          </div>

</div>
</div>



</div>
<PresentationSection/>
<ServicesSection/>
<Partners/>
 <Footer/>
    </React.Fragment>)
}
export default Home;