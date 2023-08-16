
import {
Typography,
  } from "@material-tailwind/react";
  import React from "react";
  import TranslatedText from "../../utils/Translation"
  import Hassen from "../../assets/images/team/Employee.jpg"
import partner1 from "../../assets/images/partners/137_hertz.png"
import partner2 from "../../assets/images/partners/138_omi.jpg"
import partner3 from "../../assets/images/partners/139_airwork.jpg"
import partner4 from "../../assets/images/partners/140_waircom.jpg"
import partner5 from "../../assets/images/partners/141_Pneumatic_corp.jpg"
import CustomCard from "../../components/Card"


import { useSelector } from "react-redux/es/hooks/useSelector";
import {LightMode,DarkMode} from "../../redux/actions/LightActions"
import CustomTab from "../../components/Tab"
import ProfileCard from "../../components/Card/ProfileCard"
import COCEOPFP from "../../assets/images/team/Co-CEO.png"
import CEOPFP from "../../assets/images/team/CEO.png"

const Partner =()=>{
  const LightModeState=useSelector(state=>state.lightMode)
    return (<React.Fragment>
              <div className={`Partner flex flex-wrap  items-center justify-center ${LightModeState==LightMode().type?"ContainerWhiteMode":"ContainerDarkMode"}` }>

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
                    <Typography  variant="hp" color="black" className={` m-4 font-thin ${LightModeState==LightMode().type?"TextWhiteMode":"TextDarkMode"}`}><TranslatedText TranslationPath="Home.Partners.Partner_Description"/></Typography>
                  
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

            <div className="flex items-center justify-center  mt-4">
                    <hr className=" border-red-600 rounded-lg w-[30%] h-[0.35rem] bg-red-600 m-4"/><Typography  variant="h4" color="black" className={`m-4 font-extrabold ${LightModeState==LightMode().type?"TextWhiteMode":"TextDarkMode"}`}><TranslatedText TranslationPath="Home.Team.Team_title"/></Typography><hr className=" border-red-600 rounded-lg w-[30%] h-[0.35rem] bg-red-600 m-4"/>
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
    </React.Fragment>)
}
export default Partner;