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
 import TranslatedText from "../../utils/Translation";
 import {TranslateString} from "../../utils/Translation";
 import { useSelector } from "react-redux/es/hooks/useSelector";
import {LightMode,DarkMode} from "../../redux/actions/LightActions"
import PhoneInput from "../../components/Input/Phone"
  export default function RegisterCard() {
    const LightModeState=useSelector(state=>state.lightMode)
    return (
      <div class="BackgroundImage2 bg-cover  bg-center min-h-screen grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 place-items-center">
      <Navbar/>
     
      <div className="mt-[10rem]">
      <Card className={`${LightModeState==LightMode().type?"bg-whiteTheme_T2":"bg-darkTheme_T2"} w-[20rem] sm:[25rem]  md:w-[30rem] lg:w-[40rem]  ExtraShadowed-div  m-0 bg-opacity-80 backdrop-blur-lg `}>
      <CardHeader
        variant="gradient"
        color="red"
        className="mb-4 grid h-28 place-items-center"
      >
        <i class="fa-solid fa-right-to-bracket"></i>
        <Typography variant="h3" color="white">
        <TranslatedText TranslationPath="Register.Register_Title" TextColor="White"/>
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input label={<TranslatedText TranslationPath="Register.Email_Label" />} size="lg" />
        <Input label={<TranslatedText TranslationPath="Register.FirstName_Label" />} size="lg" />
        <Input label={<TranslatedText TranslationPath="Register.LastName_Label" />} size="lg" />
        <Input label={<TranslatedText TranslationPath="Register.Password_Label" />} size="lg" />
      
        <PhoneInput InputLabel={TranslateString("Register.Phone_Label")}/>
        <Input label={<TranslatedText TranslationPath="Register.Confirm_Password_Label" />} size="lg" />
        <Typography
        variant="small"
        color="gray"
        className="mt-2 flex items-center gap-1 font-normal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="-mt-px h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clipRule="evenodd"
          />
        </svg>
        {<TranslatedText TranslationPath="Register.PasswordCondition_Label" />}
      </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" color="red" fullWidth className="hover:scale-105">
        <TranslatedText TranslationPath="Register.SignInButtonLabel" TextColor="White"/>
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center">
        <TranslatedText TranslationPath="Register.SignUpRecommandationLabel" />
          <Typography
            as="a"
            href="#signup"
            variant="small"
            color="red"
            className="ml-1 font-bold"
          >
            <TranslatedText TranslationPath="Login.Login_Title" TextColor="White"/>
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