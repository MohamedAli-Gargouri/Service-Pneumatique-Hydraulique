import Navbar from "../../components/NavBar"
import Footer from "../../components/footer"
import {
Typography,
    Card,
    CardHeader,
    CardBody,
    Avatar
  } from "@material-tailwind/react";
  import { Button } from "@material-tailwind/react";
  import TranslatedText from "../../utils/Translation"
  import ServiceImage from "../../assets/images/Service.png"
  import Hassen from "../../assets/images/team/Employee.jpg"
import partner1 from "../../assets/images/partners/137_hertz.png"
import partner2 from "../../assets/images/partners/138_omi.jpg"
import partner3 from "../../assets/images/partners/139_airwork.jpg"
import partner4 from "../../assets/images/partners/140_waircom.jpg"
import partner5 from "../../assets/images/partners/141_Pneumatic_corp.jpg"
import CustomCard from "../../components/Card"
  import SPHLogo from "../../assets/images/SPH Logo.png"
import Carousel from "../../components/Carousel"
import ProductCarousel from "../../components/Carousel/productsCarousel"

import { useSelector } from "react-redux/es/hooks/useSelector";
import {LightMode,DarkMode} from "../../redux/actions/LightActions"
import CustomTab from "../../components/Tab"
import ProfileCard from "../../components/Card/ProfileCard"
import COCEOPFP from "../../assets/images/team/Co-CEO.png"
import CEOPFP from "../../assets/images/team/CEO.png"

const Home =()=>{
  const LightModeState=useSelector(state=>state.lightMode)
    return <>
    <Navbar/>
  <Carousel/>

 
    

    <div className={`Presentation flex flex-wrap  items-center justify-center ${LightModeState==LightMode().type?"":"ContainerDarkMode"}`}>

    <div className="container mx-auto">
  <div className="grid grid-cols-12 gap-4">
    <div className="col-span-12">
      
      <div className="flex items-center justify-center h-full mt-4">
      <hr className="border-red-600 rounded-lg w-[30%] h-[0.35rem] bg-red-600 m-4"/>
      <img
        src={SPHLogo}
        alt="image 3"
        className="block animate-PulseSlow object-fit: cover w-1/5 h-1/1 relative "
        
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
      <Typography   variant="h1" color="blue-gray" className={` m-4 ${LightModeState==LightMode().type?"":"TextDarkMode"}`}>
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
        
      <Typography   variant="p" color="blue-gray" className={`m-4 ${LightModeState==LightMode().type?"":"TextDarkMode"}`}><TranslatedText TranslationPath="Home.Presentation"/> </Typography>
      </div>
    </div>

    <div className="col-span-12">
      <ProductCarousel/>
      </div>
    

  </div>
</div>

<div className="Products bg-gray-500">


</div>
    </div>

    <div className={`flex items-center justify-center h-full pt-4 pb-4 ${LightModeState==LightMode().type?"":"ContainerDarkMode"}`}>
        <hr className=" border-red-600 rounded-lg w-[30%] h-[0.35rem] bg-red-600 m-4"/><Typography  variant="h4" color="black" className={`font-extrabold ${LightModeState==LightMode().type?"":"TextDarkMode"}`}><TranslatedText TranslationPath="Home.Services.Service_Title"/>  </Typography><hr className=" border-red-600 rounded-lg w-[30%] h-[0.35rem] bg-red-600 m-4"/>
        </div>
    <div className={`Services  ${LightModeState==LightMode().type?"bg-gray-500":"ContainerDarkMode"}`} >
    <div className="flex flex-wrap transition-opacity duration-1000">
  <div className="block w-1/2 h-1/1 p-4 animate-LeftToRight">
  <img
        src={ServiceImage}
        alt="image 3"
        className="animate-rotate object-fit: cover w-1/1 h-1/1 relative "
        
      />
  </div>
  <div className="block w-1/2 p-4 relative md:mt-[5rem] animate-RightToLeft ">
    <ul className="custom-list w-1/1">
      <li style={{ overflowWrap:"break-word"}}>
      <Typography   variant="h3" color="white" className={`m-1 font-extrabold ${LightModeState==LightMode().type?"":"TextDarkMode"} `}><TranslatedText TranslationPath="Home.Services.Service1"/></Typography>
      </li>
      <li style={{ overflowWrap:"break-word"}}>
      <Typography  variant="h3" color="white" className={`m-1 font-extrabold ${LightModeState==LightMode().type?"":"TextDarkMode"}`}><TranslatedText TranslationPath="Home.Services.Service2"/></Typography>
      </li>
      <li style={{ overflowWrap:"break-word"}}>
      <Typography  variant="h3" color="white" className={`m-1 font-extrabold ${LightModeState==LightMode().type?"":"TextDarkMode"}`}><TranslatedText TranslationPath="Home.Services.Service3"/></Typography>
      </li>
    </ul>
      <Typography  variant="p" color="white" className={`m-1 hidden md:block font-black p-4 ${LightModeState==LightMode().type?"":"TextDarkMode"}`}><TranslatedText TranslationPath="Home.Services.Service_Description"/></Typography>
  </div>
  <div className="w-1/1 h-1/1 p-4">
  <Typography  variant="p" color="white" className={` m-1 block md:hidden font-black p-4 ${LightModeState==LightMode().type?"":"TextDarkMode"}`}><TranslatedText TranslationPath="Home.Services.Service_Description"/></Typography>
  </div>

</div>
  
    </div>



 <div>

 <div className={`Partner flex flex-wrap  items-center justify-center ${LightModeState==LightMode().type?"":"ContainerDarkMode"}` }>

<div className="container mx-auto">
<div className="grid grid-cols-12 gap-4">
  {/*=============ROW===================== */}
<div className="col-span-12"> 
        <div className="flex items-center justify-center h-full mt-4">
        <hr className=" border-red-600 rounded-lg w-[30%] h-[0.35rem] bg-red-600 m-4"/><Typography  variant="h4" color="black" className={`font-extrabold ${LightModeState==LightMode().type?"":"TextDarkMode"}`}><TranslatedText TranslationPath="Home.Partners.Partner_Title"/></Typography><hr className=" border-red-600 rounded-lg w-[30%] h-[0.35rem] bg-red-600 m-4"/>
        </div>
</div>
 {/*=============ROW===================== */}
<div className="col-span-12">
  
        <div className="flex items-center justify-center h-full mt-0">
        <Typography  variant="hp" color="black" className={` m-4 font-thin ${LightModeState==LightMode().type?"":"TextDarkMode"}`}><TranslatedText TranslationPath="Home.Partners.Partner_Description"/></Typography>
      
        </div>

</div>
 {/*=============ROW===================== */}
<div className="col-span-12">

<div class="table-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
    <div class="table-cell aspect-w-1 aspect-h-1">
      <CustomCard>
        <img src={partner1} alt="Image 1" class="object-cover w-full h-full"/>
        </CustomCard>
    </div>
    <div class="table-cell aspect-w-1 aspect-h-1">
    <CustomCard>
        <img src={partner2} alt="Image 2" class="object-cover w-full h-full"/>
        </CustomCard>
    </div>
    <div class="table-cell aspect-w-1 aspect-h-1">
    <CustomCard>
        <img src={partner3} alt="Image 3" class="object-cover w-full h-full"/>
        </CustomCard>
    </div>
    <div class="table-cell aspect-w-1 aspect-h-1">
    <CustomCard>
        <img src={partner4} alt="Image 3" class="object-cover w-full h-full"/>
        </CustomCard>
    </div>
    <div class="table-cell aspect-w-1 aspect-h-1">
    <CustomCard>
        <img src={partner5} alt="Image 3" class="object-cover w-full h-full"/>
        </CustomCard>
    </div>

  </div>
         
</div>

   


</div>
</div>

<div className="flex items-center justify-center w-full h-full mt-4">
        <hr className=" border-red-600 rounded-lg w-[30%] h-[0.35rem] bg-red-600 m-4"/><Typography  variant="h4" color="black" className={`m-4 font-extrabold ${LightModeState==LightMode().type?"":"TextDarkMode"}`}><TranslatedText TranslationPath="Home.Team.Team_title"/></Typography><hr className=" border-red-600 rounded-lg w-[30%] h-[0.35rem] bg-red-600 m-4"/>
        </div>
<CustomTab 
data={
  [
    {
      label: "All",
      value: "All",
      desc: 
      <div class="table-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
<div class="table-cell aspect-w-1 aspect-h-1 m-3 ">
<ProfileCard name="Kamel Hachicha" position="CEO" image={CEOPFP}/>
</div>
    <div class="table-cell aspect-w-1 aspect-h-1 m-3">
    <ProfileCard name="Melek Hachicha" position="Co-Founder" image={COCEOPFP}/>
    </div>
    <div class="table-cell aspect-w-1 aspect-h-1 m-3">
    <ProfileCard name="Hassen Jeribi" position="Chef Service" image={Hassen}/>
    </div>
    <div class="table-cell aspect-w-1 aspect-h-1 m-3">
          <ProfileCard name="Hassen Jeribi" position="Chef Service" image={Hassen}/>
          </div>
          

  </div>      
    },
    {
      label: "Management Team",
      value: "Management Team",
      desc:   <div class="table-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <div class="table-cell aspect-w-1 aspect-h-1 m-3 ">
      <ProfileCard name="Kamel Hachicha" position="CEO" image={CEOPFP}/>
      </div>
          <div class="table-cell aspect-w-1 aspect-h-1 m-3">
          <ProfileCard name="Melek Hachicha" position="Co-Founder" image={COCEOPFP}/>
          </div>     
        </div>,
    },
    {
      label: "Staff Team",
      value: "Staff Team",
      desc:   <div class="table-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          <div class="table-cell aspect-w-1 aspect-h-1 m-3">
          <ProfileCard name="Hassen Jeribi" position="Chef Service" image={Hassen}/>
          </div>
      
        </div>,
    }
  ]
}
DefaultSelectValue={"All"}
/>

</div>
 <Footer/>
 </div>


   
    </>
}
export default Home;