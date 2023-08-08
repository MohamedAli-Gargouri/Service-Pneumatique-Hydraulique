import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
  } from "@material-tailwind/react";
 import Navbar from "../../components/NavBar"
 import TranslatedText from "../../utils/Translation"
 import { useSelector } from "react-redux/es/hooks/useSelector";
import {LightMode,DarkMode} from "../../redux/actions/LightActions"
  export default function LoginCard() {
    const LightModeState=useSelector(state=>state.lightMode)
    return (
<div class="BackgroundImage2 bg-cover  bg-center min-h-screen grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 place-items-center">
<Navbar/> 
        <div className="mt-[10rem]">
        <Card className={`${LightModeState==LightMode().type?"":"ContainerDarkMode"} w-[20rem] sm:[25rem]  md:w-[30rem] lg:w-[40rem]  ExtraShadowed-div  m-0 bg-opacity-80 backdrop-blur-lg `}>
        <CardHeader
          variant="gradient"
          color="red"
          className="mb-4 grid h-28 place-items-center"
        >
          <i class="fa-solid fa-right-to-bracket"></i>
          <Typography variant="h3" color="white">
          <TranslatedText TranslationPath="Login.Login_Title" TextColor="White"/>
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input label={<TranslatedText TranslationPath="Login.Email_Label" />} size="lg" />
          <Input label={<TranslatedText TranslationPath="Login.Password_Label" />} size="lg" />
          <div className="-ml-2.5">
            <Checkbox label={<TranslatedText TranslationPath="Login.RememberMeLabel" />} />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" color="red" className="hover:scale-105" fullWidth>
          <TranslatedText TranslationPath="Login.SignInButtonLabel" TextColor="White"/>
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
          <TranslatedText TranslationPath="Login.SignUpRecommandationLabel" />
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="red"
              className="ml-1 font-bold"
            >
             <TranslatedText TranslationPath="Register.Register_Title" TextColor="White"/>
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
        </div>
        
        <div>

        </div>
        

      </div>
      

    );
  }