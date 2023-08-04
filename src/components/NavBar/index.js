import React from "react";
import SPHlogo from "../../assets/images/SPH Logo.png"
import {
  Navbar,
  MobileNav,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
  SunIcon,
  MoonIcon
} from "@heroicons/react/24/outline";
import NavList from "./navList"
import ProfileMenu from "./profileMenu"
import TranslatedText from "../../utils/Translation"
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {LightMode,DarkMode} from "../../redux/actions/LightActions"
export default function ComplexNavbar() {
   //=======Setting Mobile View-start=================// 
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
 //=======Setting Mobile View-end=================//
 
 //=========Setting Dark and light mode states-start========//
 const LightModeState=useSelector(state=>state.lightMode)
 const dispatch=useDispatch();
 const HandleLightModeSwitch=(()=>{
  if (LightModeState==LightMode().type)
  {
    dispatch(DarkMode())
  }
  if(LightModeState==DarkMode().type)
  {
    dispatch(LightMode())
  }
 })
 //=========Setting Dark and light mode states-end========//
  return (
    <header className="fixed top-0 left-0 w-screen z-50 mt-4">
    <Navbar className={` mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6 ${LightModeState==LightMode().type?"":"ContainerDarkMode"}`}>
      <div className="relative mx-auto flex items-center text-blue-gray-900">
      
      <img src={SPHlogo} alt="avatar" className="w-15 h-10 animate-LogoRotate"  />
      <Typography
          as="div"
          className={`mr-4 ml-4 cursor-pointer py-1.5 lg:ml-2 ${LightModeState==LightMode().type?"":"TextDarkMode"}`}
        >
          <TranslatedText TranslationPath="navbar.companyname"/>
        </Typography>
        
       
        <div className="hidden lg:block">
          <NavList />
        </div>

        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          className=" ml-auto mr-auto"
          onClick={HandleLightModeSwitch}
        >
          {(LightModeState==LightMode().type)?<SunIcon className="h-6 w-6" />:<MoonIcon className="h-6 w-6" />}
        </IconButton>

        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className={`ml-auto mr-2 lg:hidden ${LightModeState==LightMode().type?"":"TextDarkMode"}`}
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        
        <ProfileMenu />
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
    </header>
  );
}

