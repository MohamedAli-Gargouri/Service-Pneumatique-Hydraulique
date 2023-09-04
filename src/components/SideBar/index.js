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
import TranslatedText from "../../utils/Translation"
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
      <div className="my-4 flex flex-col justify-center items-center">
        <img src={SPHLOGO} className="Imageshadow w-22 h-12 m-1"/>
        <Typography variant="h5" >
        <TranslatedText TranslationPath="UCP.SideBar.Title"/>
        </Typography>
      </div>
      <List className={`${LightModeState==LightMode().type?"tc-whiteTheme_T1 ":"tc-darkTheme_T1 "}`}>

        <ListItem onClick={()=>{window.location.href="/UCP/MyOrders"}}>
          <ListItemPrefix>
          <i class="fa-solid fa-cart-shopping h-5 w-5"></i>
          </ListItemPrefix>
          <TranslatedText TranslationPath="UCP.SideBar.MyOrders"/>
          <ListItemSuffix>
            <Chip value="5" size="sm" color="green" variant="ghost"  className={`rounded-full ${LightModeState==LightMode().type?"tc-whiteTheme_T1 ":"tc-darkTheme_T1 "}`} />
          </ListItemSuffix>
        </ListItem>

        <ListItem onClick={()=>{window.location.href="/UCP/Orders"}}>
          <ListItemPrefix>
          <i class="fa-solid fa-file-invoice h-5 w-5"></i>
          </ListItemPrefix>
          <TranslatedText TranslationPath="UCP.SideBar.Orders"/>
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost"  className={`rounded-full ${LightModeState==LightMode().type?"tc-whiteTheme_T1 ":"tc-darkTheme_T1 "}`} />
          </ListItemSuffix>
        </ListItem>

        <ListItem onClick={()=>{window.location.href="/UCP/Products"}}>
          <ListItemPrefix>
          <i class="fa-solid fa-boxes-stacked h-5 w-5"></i>
          </ListItemPrefix>
          <TranslatedText TranslationPath="UCP.SideBar.Products"/>
          <ListItemSuffix>
            <Chip value="50" size="sm" color="green" variant="ghost"  className={`rounded-full ${LightModeState==LightMode().type?"tc-whiteTheme_T1 ":"tc-darkTheme_T1 "}`} />
          </ListItemSuffix>
        </ListItem>
        <ListItem onClick={()=>{window.location.href="/UCP/Inbox"}}>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          <TranslatedText TranslationPath="UCP.SideBar.Inbox"/>
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost"  className={`rounded-full ${LightModeState==LightMode().type?"tc-whiteTheme_T1 ":"tc-darkTheme_T1 "}`} />
          </ListItemSuffix>
        </ListItem>

        <ListItem onClick={()=>{window.location.href="/UCP/Accounts"}}>
          <ListItemPrefix>
          <i class="fa-solid fa-users h-5 w-5"></i>
          </ListItemPrefix>
          <TranslatedText TranslationPath="UCP.SideBar.ManageAccounts"/>
        </ListItem>


        <ListItem onClick={()=>{window.location.href="/UCP/Invoice"}}>
          <ListItemPrefix>
          <i class="fa-solid fa-file-invoice"></i>
          </ListItemPrefix>
          <TranslatedText TranslationPath="UCP.SideBar.InvoiceEstimate"/>
          <ListItemSuffix>
            
          </ListItemSuffix>
        </ListItem>

        

        <ListItem onClick={()=>{window.location.href="/UCP/Profil"}}>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          <TranslatedText TranslationPath="UCP.SideBar.Profil"/>
        </ListItem>
        <ListItem onClick={()=>{window.location.href="/"}}>
          <ListItemPrefix>
          <i class="fa-solid fa-arrow-left"></i>
          </ListItemPrefix>
          <TranslatedText TranslationPath="UCP.SideBar.Back"/>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          <TranslatedText TranslationPath="UCP.SideBar.Logout"/>
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