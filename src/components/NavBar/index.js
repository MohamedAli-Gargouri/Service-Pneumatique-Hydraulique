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
  Badge
} from "@material-tailwind/react";
import {
  Bars2Icon,
  SunIcon,
  MoonIcon
} from "@heroicons/react/24/outline";
import LanguageSelect from "./languageListSelect";
import Cart from "../Cart"
import NavList from "./navList"
import ProfileMenu from "./profileMenu"
import TranslatedText from "../../utils/Translation"
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {LightMode,DarkMode} from "../../redux/actions/LightActions"
import {OPENCART} from "../../redux/actions/cartActions"
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

 const toggleCart = () =>{dispatch(OPENCART())};
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
 var prevScrollPos = React.useRef(0);
 var NavbarVisible=React.useRef(true)

 window.addEventListener("scroll", () => {
   const currentScrollPos = window.pageYOffset;
   const navbar = document.getElementById("navbar");
   if (prevScrollPos.current < currentScrollPos) {
     if(NavbarVisible.current==true)
     {
        // Scrolling down, hide the navbar with animation
     navbar.classList.remove("animate-NavSlideDown");
     navbar.classList.add("animate-NavSlideUp");
     // Set final position after animation duration
     NavbarVisible.current=false
     setTimeout(() => {
       navbar.style.transition = "none"; // Disable transition temporarily
       navbar.style.transform = "translateY(-130%)";
       setTimeout(() => {
         navbar.style.transition = ""; // Re-enable transition
       }, 0);
     }, 300); // Assuming animation duration is 300ms
     }    

   } 
   
   if(prevScrollPos.current > currentScrollPos) {
     if(NavbarVisible.current==false)
     {
       // Scrolling up, show the navbar with animation
     navbar.classList.remove("animate-NavSlideUp");
     navbar.classList.add("animate-NavSlideDown");

     NavbarVisible.current=true
     setTimeout(() => {
       navbar.style.transition = "none"; // Disable transition temporarily
       navbar.style.transform = "translateY(0)";
       setTimeout(() => {
         navbar.style.transition = ""; // Re-enable transition
       }, 0);
         }, 300); 
     }           
   }

   setTimeout(() => {
    prevScrollPos.current=currentScrollPos
      }, 0); 
   
 });

       
 //=========Setting Dark and light mode states-end========//
  return (
    <header id="navbar"  className="fixed flex justify-center items-center top-0 left-0 w-screen z-50 mt-4 animate-NavSlideDown">
    <Navbar className={`lg:rounded-full mx-4 ${LightModeState==LightMode().type?"bg-whiteTheme_T2 tc-whiteTheme_T1":"bg-darkTheme_T2 tc-darkTheme_T1"}`}>
      <div className=" flex items-center justify-center ">
      
      <img src={SPHlogo} alt="avatar" className="w-15 h-10 animate-LogoRotate"  />
      <Typography
          color="inherit"
          className={`hidden md:block mr-4 ml-4 cursor-pointer py-1.5 lg:ml-2`}
        >
          <TranslatedText TranslationPath="navbar.companyname"/>
        </Typography>
        
       
        <div className="hidden lg:block mx-1">
          <NavList />
        </div>

        
        
         <div className="MobileNavButton mx-1">
        <IconButton
          size="sm"
          color="inherit"
          variant="text"
          onClick={toggleIsNavOpen}
          className={`ml-auto mr-2 lg:hidden text-current`}
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
         </div>
         
         <div className="LightMode mx-1">
        <IconButton
        size="sm"
        color="inherit"
        variant="text"
        className="rounded-full"
        onClick={HandleLightModeSwitch}
      >
        {(LightModeState==LightMode().type)?<MoonIcon className="h-4 w-4 md:h-6 md:w-6" />:<SunIcon className="h-6 w-6" />}
      </IconButton>
        </div>

         <div className="mx-1">
         <LanguageSelect/>
         </div>
         

         <div className="Cart mx-1">
         <Badge content="2"  className="">
          <IconButton variant="text" size="sm" color="inherit" className="rounded-full" onClick={toggleCart}>
          <i class="fa-solid fa-bag-shopping"></i>
          </IconButton>
          </Badge>
        </div>

        <div className="Profile mx-1" color="inherit">
        <ProfileMenu />
        </div>

        

        

      </div>
      <Collapse open={isNavOpen} className="h-[80vh] w-[80vw] overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
    </header>
  );
}

