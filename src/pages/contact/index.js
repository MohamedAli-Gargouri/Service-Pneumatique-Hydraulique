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
    IconButton
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
<div class=" p-4 BackgroundImage bg-cover  bg-center min-h-screen grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 place-items-center">
<Navbar/> 
        <div className="mt-[9rem]">
        <Card className={`${LightModeState==LightMode().type?"":"ContainerDarkMode"} w-[20rem] sm:[25rem]  md:w-[30rem] lg:w-[40rem]  ExtraShadowed-div  m-0 bg-opacity-80 backdrop-blur-lg `}>
        <CardHeader
          variant="gradient"
          color="red"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
          <i class="fa-solid fa-envelope "></i> Contact
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
        <Input label="Email" size="lg"  required/>
          <Input label="First Name" size="lg"required />
          <Input label="Last Name" size="lg" required/>
          <PhoneInput/>          
      <Textarea label="Message" required/>


        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" className=" hover:scale-105" color="red" fullWidth>
              Send Message
          </Button>
        </CardFooter>
      </Card>
        </div>


        <div className="mt-[9rem]">
        <Card className={`${LightModeState==LightMode().type?"":"ContainerDarkMode"} w-[20rem] sm:[25rem]  md:w-[30rem] lg:w-[40rem]  ExtraShadowed-div  m-0 bg-opacity-80 backdrop-blur-lg `}>
        <CardHeader
          variant="gradient"
          color="red"
          className="mb-4 grid h-28 place-items-center"
        >
          
          <Typography variant="h3">
          <i class="fa-solid fa-circle-info"></i> Information
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">

        <List className="my-2 p-0 bg-transparent opacity-80">
        <Typography variant="h6">
        Siège social et Point de vente
          </Typography>
        <ListItem className="group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105">
          <ListItemPrefix>
          <i class="fa-solid fa-location-dot"></i>
          </ListItemPrefix>
          Adresse
          <ListItemSuffix>
            <Chip
              value="Rte de Gabes KM 0.5 Immeuble Elfrikha Sfax - Tunisie"
              variant="ghost"
              size="sm"
              className="text-black rounded-full px-2 py-1 text-xs"
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem className="group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105">
          <ListItemPrefix>
          <i class="fa-solid fa-phone"></i>
          </ListItemPrefix>
          Téléphone 1: 
          <ListItemSuffix>
            <Chip
              value="(+216) 74 21 18 76"
              variant="ghost"
              size="sm"
              className="text-black rounded-full px-2 py-1 text-xs"
            />
          </ListItemSuffix>
        </ListItem>


        <ListItem className="group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105">
          <ListItemPrefix>
          <i class="fa-solid fa-fax"></i>
          </ListItemPrefix>
          Fax: 
          <ListItemSuffix>
            <Chip
              value="(+216) 74 22 66 09"
              variant="ghost"
              size="sm"
              className="text-black rounded-full px-2 py-1 text-xs"
            />
          </ListItemSuffix>
        </ListItem>

        <ListItem className="group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105">
          <ListItemPrefix>
          <i class="fa-solid fa-at"></i>
          </ListItemPrefix>
          Email:
          <ListItemSuffix>
            <Chip
            
              value="sph@sph-tn.com"
              variant="ghost"
              size="sm"
              className=" text-black rounded-full px-2 py-1 text-xs"
            />
          </ListItemSuffix>
        </ListItem>


        <Typography variant="h6" >
        Point de vente
          </Typography>


          <ListItem className="group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105">
          <ListItemPrefix>
          <i class="fa-solid fa-location-dot"></i>
          </ListItemPrefix>
          Adresse
          <ListItemSuffix>
            <Chip
              value="Rte de Gabes KM 0.5 Immeuble Elfrikha Sfax - Tunisie"
              variant="ghost"
              size="sm"
              className="text-black rounded-full px-2 py-1 text-xs"
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem className="group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105">
          <ListItemPrefix>
          <i class="fa-solid fa-phone"></i>
          </ListItemPrefix>
          Téléphone 1: 
          <ListItemSuffix>
            <Chip
              value="(+216) 74 21 18 76"
              variant="ghost"
              size="sm"
              className="text-black rounded-full px-2 py-1 text-xs"
            />
          </ListItemSuffix>
        </ListItem>


        <ListItem className="group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105">
          <ListItemPrefix>
          <i class="fa-solid fa-fax"></i>
          </ListItemPrefix>
          Fax: 
          <ListItemSuffix>
            <Chip
              value="(+216) 74 22 66 09"
              variant="ghost"
              size="sm"
              className="text-black rounded-full px-2 py-1 text-xs"
            />
          </ListItemSuffix>
        </ListItem>

        <ListItem className="group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105">
          <ListItemPrefix>
          <i class="fa-solid fa-at"></i>
          </ListItemPrefix>
          Email:
          <ListItemSuffix>
            <Chip
            
              value="sph@sph-tn.com"
              variant="ghost"
              size="sm"
              className=" text-black rounded-full px-2 py-1 text-xs"
            />
          </ListItemSuffix>
        </ListItem>

        
        
        
      </List>

      <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-1 place-items-center">    
        <div class="hover:scale-125">
        <IconButton variant="gradient" className="rounded-full">
        <i class="fa-regular fa-copy"></i>
      </IconButton>
        </div>
        
        
        

      </div>

      


        </CardBody>
        <CardFooter className="pt-0">

        </CardFooter>
      </Card>
        </div>
        
        <div>

        </div>
        

      </div>       
        <Footer/>
      </>

    );
  }