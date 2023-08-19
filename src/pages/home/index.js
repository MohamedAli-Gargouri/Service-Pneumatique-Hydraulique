import Navbar from "../../components/NavBar"
import Footer from "../../components/footer"
import React from "react";
import Carousel from "../../components/Carousel"
import PartnerSection from "./PartnerSection"
import PresentationSection from "./PresentationSection"
import ServicesSection from "./ServicesSection"
const Home =()=>{

  return(<React.Fragment>   
<Navbar/>
<div className="h-[70vh] md:h-[97vh] rounded-md px-2  w-full pt-[20vh] ">
<Carousel/>
</div>
<PresentationSection/>
<ServicesSection/>
 <Footer/>
    </React.Fragment>)
}
export default Home;