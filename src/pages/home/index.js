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
<Carousel/>
<PresentationSection/>
<ServicesSection/>
 <Footer/>
    </React.Fragment>)
}
export default Home;