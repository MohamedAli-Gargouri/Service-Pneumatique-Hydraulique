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
  export default function LoginCard() {
    const LightModeState=useSelector(state=>state.lightMode)
    return (
      <>
      <Navbar/>
        <div class="BackgroundImage py-4 px-2  bg-cover bg-center min-h-screen flex flex-row flex-wrap  justify-center items-center gap-4">         
          <div className=" mt-[20vh]">
          <Card className={`${LightModeState==LightMode().type?"bg-whiteTheme_T2":"bg-darkTheme_T2"} w-[90vw] sm:[70vw]  md:w-[50vw] lg:w-[50vw]  ExtraShadowed-div  m-0  backdrop-blur-sm `}>
          <CardHeader
            variant="gradient"
            color="red"
            className="mb-4 grid h-28 place-items-center"
          >
            
            <Typography variant="h3" >
            <i class="fa-solid fa-circle-info "></i> Information
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4 ">

          <List  className={`my-2 p-0 bg-transparent  opacity-80  ${LightModeState==LightMode().type?"tc-whiteTheme_T1":"tc-darkTheme_T1"}`}>
          <Typography variant="h6"  className={` mx-1 ${LightModeState==LightMode().type?"tc-whiteTheme_T1":"tc-darkTheme_T1"}`}>
          Siège social et Point de vente
            </Typography>
          <ListItem className={`mx-1 ${LightModeState==LightMode().type?"tc-whiteTheme_T1":"tc-darkTheme_T1"} group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105`}>
            <ListItemPrefix>
            <i class="fa-solid fa-location-dot"></i>
            </ListItemPrefix>
            Adresse
            <ListItemSuffix color="inherit" className="text-current">
             Rte de Gabes KM 0.5 Immeuble Elfrikha Sfax - Tunisie
            </ListItemSuffix>
          </ListItem>
          <ListItem className={`mx-1 ${LightModeState==LightMode().type?"tc-whiteTheme_T1":"tc-darkTheme_T1"} group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105`}>
            <ListItemPrefix>
            <i class="fa-solid fa-phone"></i>
            </ListItemPrefix>
            Téléphone 1: 
            <ListItemSuffix className="text-current">
             (+216) 74 21 18 76

            </ListItemSuffix>
          </ListItem>


          <ListItem className={`mx-1 ${LightModeState==LightMode().type?"tc-whiteTheme_T1":"tc-darkTheme_T1"} group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105`}>
            <ListItemPrefix>
            <i class="fa-solid fa-fax"></i>
            </ListItemPrefix>
            Fax: 
            <ListItemSuffix className="text-current">
             (+216) 74 22 66 09
            </ListItemSuffix>
          </ListItem>

          <ListItem className={`mx-1 ${LightModeState==LightMode().type?"tc-whiteTheme_T1":"tc-darkTheme_T1"} group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105`}>
            <ListItemPrefix>
            <i class="fa-solid fa-at"></i>
            </ListItemPrefix>
            Email:
            <ListItemSuffix className="text-current">
             sph@sph-tn.com

            </ListItemSuffix>
          </ListItem>


          <Typography variant="h6"className={`mx-1 ${LightModeState==LightMode().type?"tc-whiteTheme_T1":"tc-darkTheme_T1"}`} >
          Point de vente
            </Typography>


            <ListItem className={`mx-1 ${LightModeState==LightMode().type?"tc-whiteTheme_T1":"tc-darkTheme_T1"} group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105`}>
            <ListItemPrefix>
            <i class="fa-solid fa-location-dot"></i>
            </ListItemPrefix>
            Adresse
            <ListItemSuffix className="text-current"> Rte de Gabes KM 0.5 Immeuble Elfrikha Sfax - Tunisie
            </ListItemSuffix>
          </ListItem>
          <ListItem className={`mx-1 ${LightModeState==LightMode().type?"tc-whiteTheme_T1":"tc-darkTheme_T1"} group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105`}>
            <ListItemPrefix>
            <i class="fa-solid fa-phone"></i>
            </ListItemPrefix>
            Téléphone 1: 
            <ListItemSuffix className="text-current">
                (+216) 74 21 18 76    
            </ListItemSuffix>
          </ListItem>


          <ListItem className={`mx-1 ${LightModeState==LightMode().type?"tc-whiteTheme_T1":"tc-darkTheme_T1"} group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105`}>
            <ListItemPrefix>
            <i class="fa-solid fa-fax"></i>
            </ListItemPrefix>
            Fax: 
            <ListItemSuffix className="text-current">
              (+216) 74 22 66 09
                

            </ListItemSuffix>
          </ListItem>

          <ListItem className={`mx-1 ${LightModeState==LightMode().type?"tc-whiteTheme_T1":"tc-darkTheme_T1"} group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105`}>
            <ListItemPrefix>
            <i class="fa-solid fa-at"></i>
            </ListItemPrefix>
            Email:
            <ListItemSuffix className="text-current">
               sph@sph-tn.com  
            </ListItemSuffix>
          </ListItem>

          
          
          
        </List>

        <div class=" flex flex-row justify-around items-center">    
         
          <div class="hover:scale-125">
          <Popover
           animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
          }}
           
    >
      <PopoverHandler>
      <IconButton variant="filled" color="red" className=" ">
      <i class="fa-regular fa-copy"></i>
        </IconButton>
      </PopoverHandler>
      <PopoverContent className={`${LightModeState==LightMode().type?"bg-whiteTheme_T1 tc-whiteTheme_T1":"bg-darkTheme_T1 tc-darkTheme_T1"}`}>
       Information Copied !
      </PopoverContent>
    </Popover>
          </div>
          

      </div>

      


        </CardBody>
        <CardFooter className="pt-0">

        </CardFooter>
      </Card>
        </div>
        <div className=" mt-6 md:mt-[20vh]">
          <Card className={`${LightModeState==LightMode().type?"bg-whiteTheme_T2":"bg-darkTheme_T2"} w-[90vw] sm:[40vw]  md:w-[40vw] lg:w-[40vw]  ExtraShadowed-div  backdrop-blur-sm `}>
          <CardHeader
            variant="gradient"
            color="red"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
            <i class="fa-solid fa-envelope "></i> Contact
            </Typography>
          </CardHeader>
          <CardBody className={`flex flex-col gap-4 ${LightModeState==LightMode().type?"tc-whiteTheme_T1":"tc-darkTheme_T1"}`} >
          <Input labelProps={{style:{color:LightModeState==LightMode().type?"black":"white"}}} label="Email" size="lg" color="inherit"  required/>
            <Input labelProps={{style:{color:LightModeState==LightMode().type?"black":"white"}}} label="First Name" color="inherit" size="lg"required />
            <Input labelProps={{style:{color:LightModeState==LightMode().type?"black":"white"}}} label="Last Name" color="inherit" size="lg" required/>
            <PhoneInput/>          
        <Textarea labelProps={{style:{color:LightModeState==LightMode().type?"black":"white"}}}  label="Message" color="inherit" required/>


          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" className=" hover:scale-105 " color="red" fullWidth>
                Send Message
            </Button>
          </CardFooter>
        </Card>
          </div>
        

        

      </div>       
        <Footer/>
      </>

    );
  }