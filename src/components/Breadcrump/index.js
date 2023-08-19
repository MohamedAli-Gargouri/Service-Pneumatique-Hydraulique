import { Breadcrumbs } from "@material-tailwind/react";

 import Breadcrumbsbg from "../../assets/images/BreadCrumpbg.jpg"
 import Breadcrumbsbgdark from "../../assets/images/BreadCrumpbg_dark.jpeg"
 import { useSelector } from "react-redux/es/hooks/useSelector";
 import {LightMode,DarkMode} from "../../redux/actions/LightActions"
export default function BreadcrumbsWithIcon({Parent,Child,List}) {
  const LightModeState=useSelector(state=>state.lightMode)
  return (

        <div className=" rounded-md shadow-sm mx-4 grid grid-cols-1 bg-blue-gray-50 justify-center items-center gap-3 bg-cover " style={{backgroundImage:`${LightModeState==LightMode().type?`url(${Breadcrumbsbg})`:`url(${Breadcrumbsbgdark})`}`}}>
            
            {List==true?<div className=" col-span-1">
            <p className=" text-center" style={{  fontFamily:"Roboto, sans-serif",fontSize:"35px"}}>List</p>
            <p className=" text-center" style={{ fontStyle:"italic",color:"#bf360c",fontFamily:"serif" , fontSize:"25px"}}>{Child==undefined?"Products":Child.PageName}</p>
            </div>
            :null}
                          
     <Breadcrumbs separator={<p className={`${LightModeState==LightMode().type?"tc-whiteTheme_T1":"tc-darkTheme_T1"}`}>/</p>} fullWidt={true} className={`bg-inherit  mt-1 ml-4  col-span-1  ${LightModeState==LightMode().type?"tc-whiteTheme_T1":"tc-darkTheme_T1"}`}  >
      <a href="/Home" className={`hover:opacity-60 ${LightModeState==LightMode().type?"tc-whiteTheme_T1":"tc-darkTheme_T1"}`}>
      <i class="fa-solid fa-house"></i>
      </a>
      {Parent==undefined?null:<a className={`hover:opacity-60 ${LightModeState==LightMode().type?"tc-whiteTheme_T1":"tc-darkTheme_T1"}`} href={`${Parent.PageUrl}`}>{Parent.PageName}</a>}
      {Child==undefined?null:<a className={`hover:opacity-60 ${LightModeState==LightMode().type?"tc-whiteTheme_T1":"tc-darkTheme_T1"}`} href={`${Child.PageUrl}`}>{Child.PageName}</a>}    
    </Breadcrumbs>

        </div>
    
   

 
    
    
  );
}