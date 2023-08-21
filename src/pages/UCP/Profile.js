import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    IconButton,
    Popover,
  PopoverHandler,
  PopoverContent,
  } from "@material-tailwind/react";
  import { Textarea } from "@material-tailwind/react";
 import Navbar from "../../components/NavBar"
 import TranslatedText from "../../utils/Translation"
 import { useSelector } from "react-redux/es/hooks/useSelector";
import {LightMode,DarkMode} from "../../redux/actions/LightActions"
import PhoneInput from "../../components/Input/Phone"
import Footer from "../../components/footer"
import SideBar from "../../components/SideBar"
import React from "react";
import TopBar from "../../components/Topbar"
import Topbarbg from "../../assets/images/Topbarbg.jpg"
  export default function User_Control_Panel() {
    const LightModeState=useSelector(state=>state.lightMode)
    return (
      <div className="flex flex-row items-stretch flex-nowrap">

<aside className={`rounded-none p-4 shadow-xl shadow-blue-gray-900/5 ${LightModeState==LightMode().type?"tc-whiteTheme_T1 bg-whiteTheme_T2":"tc-darkTheme_T1 bg-darkTheme_T2"}   hidden md:block w-[20rem] animate-fade`}>
<SideBar/>
</aside>

      <main className="w-full min-h-screen flex flex-col justify-start items-center ">  
        <section className=" flex flex-col justify-center items-stretch w-full text-center h-[17vh] p-4 shadow-xl shadow-blue-gray-900/ bg-cover" style={{backgroundImage:`url(${Topbarbg})`}} >     
        <TopBar SectionName="Profil" />

        </section>

        <section className="w-full flex justify-center  text-center">      
        <Card  className={`p-2 w-[100%]  min-h-[72vh] m-4 z-0 grid grid-cols-1 md:grid-cols-2 gap-3 ${LightModeState==LightMode().type?"tc-whiteTheme_T1 bg-whiteTheme_T2":"tc-darkTheme_T1 bg-darkTheme_T2"}`} >

          <div className=" flex flex-col justify-center items-center col-span-1" >
          <img
          className="h-[30vh] w-[30vh] rounded-full object-cover object-center mb-4 "
          src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
          alt="nature image"
          />
          <Input labelProps={{style:{color:LightModeState==LightMode().type?"black":"white"}}} label="Profile Image" type="file" icon={<i class="fa-solid fa-image"></i>} />

          <Button  className="flex items-center gap-3 mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"/>
        </svg>
        Save Image
      </Button>
          </div>
          <div className="col-span-1 flex flex-col justify-center items-center gap-2" >
          <Typography  variant="h4" className={`${LightModeState==LightMode().type?"tc-whiteTheme_T1 ":"tc-darkTheme_T1 "} `} >
             Basic Profile Information
            </Typography>

                 <Input labelProps={{style:{color:LightModeState==LightMode().type?"black":"white"}}} label="First Name"   icon={<i class="fa-solid fa-image"></i>} />
                 <Input labelProps={{style:{color:LightModeState==LightMode().type?"black":"white"}}} label="Last Name"   icon={<i class="fa-solid fa-image"></i>} />
                 <Input labelProps={{style:{color:LightModeState==LightMode().type?"black":"white"}}} label="New Password"   icon={<i class="fa-solid fa-image"></i>} />
                 <Button  className="flex items-center gap-3 mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"/>
        </svg>
        Save Infomration
      </Button>

          </div>
 

    </Card>
        </section>
        <Footer/>
      </main>

      
      </div>
    );
  }