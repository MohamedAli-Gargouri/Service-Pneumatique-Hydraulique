import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {LightMode,DarkMode} from "../../redux/actions/LightActions"
 import SPHLOGO from "../../assets/images/SPH Logo.png"
export default function SidebarWithCta() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  const LightModeState=useSelector(state=>state.lightMode)

  return (
    <React.Fragment>
      <div className="mb-2 p-4 flex flex-col justify-center items-center">
        <img src={SPHLOGO} className="Imageshadow w-22 h-12 m-1"/>
        <Typography variant="h5" >
          Control Center
        </Typography>
      </div>
      <List className={`${LightModeState==LightMode().type?"tc-whiteTheme_T1 ":"tc-darkTheme_T1 "}`}>
       {/* <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className={`border-b-0 p-3 ${LightModeState==LightMode().type?"tc-whiteTheme_T1 ":"tc-darkTheme_T1 "}`}>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography  className="mr-auto font-normal">
                Dashboard
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className={`${LightModeState==LightMode().type?"tc-whiteTheme_T1 ":"tc-darkTheme_T1 "}`}>
              <ListItem style={{color:`${LightModeState==LightMode().type?"black":"white"}`}}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Analytics
              </ListItem>
              <ListItem style={{color:`${LightModeState==LightMode().type?"black":"white"}`}}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Reporting
              </ListItem>
              <ListItem style={{color:`${LightModeState==LightMode().type?"black":"white"}`}}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Projects
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className={`p-0 `} selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className={`border-b-0 p-3 ${LightModeState==LightMode().type?"tc-whiteTheme_T1 ":"tc-darkTheme_T1 "}`}>
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography  className="mr-auto font-normal">
                E-Commerce
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className={`p-0 ${LightModeState==LightMode().type?"tc-whiteTheme_T1 ":"tc-darkTheme_T1 "}`}>
              <ListItem style={{color:`${LightModeState==LightMode().type?"black":"white"}`}} onClick={()=>{window.location.href="/UCP/Orders"}}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Orders
              </ListItem>
              <ListItem style={{color:`${LightModeState==LightMode().type?"black":"white"}`}} onClick={()=>{window.location.href="/UCP/MyOrders"}}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                My Orders
              </ListItem>
              <ListItem style={{color:`${LightModeState==LightMode().type?"black":"white"}`}} onClick={()=>{window.location.href="/UCP/Products"}}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Products
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        */}

        <ListItem onClick={()=>{window.location.href="/UCP/MyOrders"}}>
          <ListItemPrefix>
          <i class="fa-solid fa-cart-shopping h-5 w-5"></i>
          </ListItemPrefix>
          My Orders
          <ListItemSuffix>
            <Chip value="5" size="sm" color="green" variant="ghost"  className={`rounded-full ${LightModeState==LightMode().type?"tc-whiteTheme_T1 ":"tc-darkTheme_T1 "}`} />
          </ListItemSuffix>
        </ListItem>

        <ListItem onClick={()=>{window.location.href="/UCP/Orders"}}>
          <ListItemPrefix>
          <i class="fa-solid fa-file-invoice h-5 w-5"></i>
          </ListItemPrefix>
          Orders
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost"  className={`rounded-full ${LightModeState==LightMode().type?"tc-whiteTheme_T1 ":"tc-darkTheme_T1 "}`} />
          </ListItemSuffix>
        </ListItem>

        <ListItem onClick={()=>{window.location.href="/UCP/Products"}}>
          <ListItemPrefix>
          <i class="fa-solid fa-boxes-stacked h-5 w-5"></i>
          </ListItemPrefix>
          Products
          <ListItemSuffix>
            <Chip value="50" size="sm" color="green" variant="ghost"  className={`rounded-full ${LightModeState==LightMode().type?"tc-whiteTheme_T1 ":"tc-darkTheme_T1 "}`} />
          </ListItemSuffix>
        </ListItem>

        <ListItem onClick={()=>{window.location.href="/UCP/Accounts"}}>
          <ListItemPrefix>
          <i class="fa-solid fa-users h-5 w-5"></i>
          </ListItemPrefix>
          Manage Accounts
          <ListItemSuffix>
            <Chip value="100" size="sm" color="green" variant="ghost"  className={`rounded-full ${LightModeState==LightMode().type?"tc-whiteTheme_T1 ":"tc-darkTheme_T1 "}`} />
          </ListItemSuffix>
        </ListItem>


        <ListItem onClick={()=>{window.location.href="/UCP/Invoice"}}>
          <ListItemPrefix>
          <i class="fa-solid fa-receipt"></i>
          </ListItemPrefix>
          Invoice
          <ListItemSuffix>
            <Chip value="100" size="sm" color="green" variant="ghost"  className={`rounded-full ${LightModeState==LightMode().type?"tc-whiteTheme_T1 ":"tc-darkTheme_T1 "}`} />
          </ListItemSuffix>
        </ListItem>

        

        <ListItem onClick={()=>{window.location.href="/UCP/Inbox"}}>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost"  className={`rounded-full ${LightModeState==LightMode().type?"tc-whiteTheme_T1 ":"tc-darkTheme_T1 "}`} />
          </ListItemSuffix>
        </ListItem>
        <ListItem onClick={()=>{window.location.href="/UCP/Profil"}}>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profil
        </ListItem>
        <ListItem onClick={()=>{window.location.href="/"}}>
          <ListItemPrefix>
          <i class="fa-solid fa-arrow-left"></i>
          </ListItemPrefix>
          Back
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
      {/*<Alert open={openAlert} className="mt-auto" onClose={() => setOpenAlert(false)}>
        <CubeTransparentIcon className="mb-4 h-12 w-12" />
        <Typography variant="h6" className="mb-1">
          Upgrade to PRO
        </Typography>
        <Typography variant="small" className="font-normal opacity-80">
          Upgrade to Material Tailwind PRO and get even more components, plugins, advanced features
          and premium.
        </Typography>
        <div className="mt-4 flex gap-3">
          <Typography
            as="a"
            href="#"
            variant="small"
            className="font-medium opacity-80"
            onClick={() => setOpenAlert(false)}
          >
            Dismiss
          </Typography>
          <Typography as="a" href="#" variant="small" className="font-medium">
            Upgrade Now
          </Typography>
        </div>
        </Alert>*/}
    </React.Fragment>
  );
}