import React from "react";
import {
  Collapse,
  Button,
  Card,
  Typography,
  CardBody,
  Badge,
  IconButton,
  CardHeader
} from "@material-tailwind/react";
 import NotificationTable from "../Table/Notification"
 import { useDispatch } from "react-redux/es/hooks/useDispatch";
 import { useSelector } from "react-redux/es/hooks/useSelector";
 import {LightMode,DarkMode} from "../../redux/actions/LightActions"
export default function Notification() {
  const [open, setOpen] = React.useState(false);
  const LightModeState=useSelector(state=>state.lightMode)
  const toggleOpen = () => setOpen((cur) => !cur);
 
  return (
    <div className="relative ">
    <Badge content="5"  className="">
    <IconButton className="rounded-full" onClick={toggleOpen} >
<   i class="fa-solid fa-bell"></i>
    </IconButton>
    </Badge>
      <Collapse open={open} className={` overflow-auto rounded-lg ${LightModeState==LightMode().type?"tc-whiteTheme_T1 bg-whiteTheme_T2":"tc-darkTheme_T1 bg-darkTheme_T2"} shadow-lg z-50 w-[90vw] md:w-[40vw] top-[3rem] right-[-3rem]    absolute md:right-[0.5rem]`}>
        <div className=" w-full h-full overflow-hidden p-0  flex flex-col  justify-stretch items-end">

        <div style={{ backgroundColor:"#e53935",color:"white"}} className={`text-center w-full  `}> 
        <p>Notifications</p></div>
        <div className="Body p-2 w-full">
        <NotificationTable/>
        </div>
          
          <div className="footer  texw-full flex  justify-center items-center">
          <Button variant="text" className="mb-1 mr-1" onClick={()=>{window.location.href="/UCP/Inbox"}}>View All</Button>
          </div>

        </div>
      </Collapse>
    </div>
  );
}