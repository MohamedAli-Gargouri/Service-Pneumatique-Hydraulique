
import {
Typography,
  } from "@material-tailwind/react";
  import React from "react";
  import TranslatedText from "../../utils/Translation"
  import ServiceImage from "../../assets/images/Service.png"
import { useSelector } from "react-redux/es/hooks/useSelector";
import {LightMode,DarkMode} from "../../redux/actions/LightActions"


const Services =()=>{
  const LightModeState=useSelector(state=>state.lightMode)
    return (<React.Fragment>
 <div className={`flex items-center justify-center h-full pt-4 pb-4 ${LightModeState==LightMode().type?"ContainerWhiteMode":"ContainerDarkMode"}`}>
        <hr className=" border-red-600 rounded-lg w-[30%] h-[0.35rem] bg-red-600 m-4"/><Typography  variant="h4" color="black" className={` text-center font-extrabold ${LightModeState==LightMode().type?"":"TextDarkMode"}`}><TranslatedText TranslationPath="Home.Services.Service_Title"/>  </Typography><hr className=" border-red-600 rounded-lg w-[30%] h-[0.35rem] bg-red-600 m-4"/>
        </div>
    <div className={`Services  ${LightModeState==LightMode().type?"bg-gray-500":"ContainerDarkMode"}`} >
    <div className="flex flex-wrap flex-col md:flex-row md:flex-nowrap">
          <div className="m-4 md:w-1/3 md:h-1/3 animate-LeftToRight">
          <img
                src={ServiceImage}
                alt="image 3"
                className="animate-rotate object-fit: cover w-1/1 h-1/1"
                
              />
          </div>
          <div className=" flex flex-col items-center justify-center md:items-start flex-wrap animate-RightToLeft ">
            <div>
            <Typography   variant="h4" color="white" className={`m-1 font-extrabold ${LightModeState==LightMode().type?"TextWhiteMode":"TextDarkMode"} `}><TranslatedText TranslationPath="Home.Services.Service1"/></Typography>
            </div>

            <div>
            <Typography  variant="h4" color="white" className={`m-1 font-extrabold ${LightModeState==LightMode().type?"TextWhiteMode":"TextDarkMode"}`}><TranslatedText TranslationPath="Home.Services.Service2"/></Typography>
            </div>

            <div>
            <Typography  variant="h4" color="white" className={`m-1 font-extrabold ${LightModeState==LightMode().type?"TextWhiteMode":"TextDarkMode"}`}><TranslatedText TranslationPath="Home.Services.Service3"/></Typography>
            </div>

            <div>
            <Typography  variant="p" color="white" className={`m-1 font-black p-4 ${LightModeState==LightMode().type?"TextWhiteMode":"TextDarkMode"}`}><TranslatedText TranslationPath="Home.Services.Service_Description"/></Typography>
            </div>
          </div>


</div>
  
    </div>
    </React.Fragment>)
}
export default Services;