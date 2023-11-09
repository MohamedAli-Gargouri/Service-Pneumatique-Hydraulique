import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from '@material-tailwind/react';
import React from 'react';
import TranslatedText from '../../utils/Translation';
import { TranslateString } from '../../utils/Translation';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/LightActions';
import PhoneInput from '../../components/Input/Phone';
import {register} from "../../services/auth"
import { CreateToast } from '../../utils/Toast';
import ReactDOMServer from 'react-dom/server';
import { VerifyInputs } from '../../utils/others/VerifyInputs';
import { motion } from 'framer-motion';

const Animations = {
  hidden: {
    opacity: 0,
    y: -500,
    x: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};
export default function RegisterCard() {
  const LightModeState = useSelector((state) => state.lightMode);
  const isLogged = useSelector((state) => state.isLogged);
  if(isLogged)
  {
    window.location="/home"
  }
  const userNamerRef=React.useRef(null)
  const emailRef=React.useRef(null)
  const firstNameRef=React.useRef(null)
  const lastNameRef=React.useRef(null)
  const passwordRef=React.useRef(null)
  const internationalDialNumberRef=React.useRef(null)
  const phoneNumberRef=React.useRef(null)
  const confirmPasswordRef=React.useRef(null)

  const HandleRegister=(()=>{

      if(VerifyInputs([userNamerRef.current.value,firstNameRef.current.value,lastNameRef.current.value],
        [emailRef.current.value],
        [],
        [internationalDialNumberRef.current],
        [phoneNumberRef.current.value],
        [passwordRef.current.value],
        [confirmPasswordRef.current.value],
        LightModeState == LightMode().type))
      {
        const promise=register(
          userNamerRef.current.value,
          emailRef.current.value,
          firstNameRef.current.value,
          lastNameRef.current.value,
          passwordRef.current.value,
          internationalDialNumberRef.current,
          phoneNumberRef.current.value)
          CreateToast(
            promise,
            "",
            ReactDOMServer.renderToStaticMarkup(<TranslatedText TranslationPath="UCP.DialogMessages.Register.Register_Success" />),
            ReactDOMServer.renderToStaticMarkup(<TranslatedText TranslationPath="UCP.DialogMessages.Promise.Pending" />),
            ReactDOMServer.renderToStaticMarkup(<TranslatedText TranslationPath="UCP.DialogMessages.Register.Register_Error" />),
            /*Custom request Errors message*/
            [
            ReactDOMServer.renderToStaticMarkup(<TranslatedText TranslationPath="UCP.DialogMessages.Register.UsedEmail_Error" />),
            ReactDOMServer.renderToStaticMarkup(<TranslatedText TranslationPath="UCP.DialogMessages.Register.UsedPhoneNumber_Error" />),
            ReactDOMServer.renderToStaticMarkup(<TranslatedText TranslationPath="UCP.DialogMessages.Register.UsedUsername_Error" />)
            ],
            /*Custom Request Error codes */
            ["AUTH_ERROR04","AUTH_ERROR05","AUTH_ERROR06"],
            /*Default Connection Errors */
            [
            ReactDOMServer.renderToStaticMarkup(<TranslatedText TranslationPath="UCP.DialogMessages.Connection.ConnectionLost" />),
            ReactDOMServer.renderToStaticMarkup(<TranslatedText TranslationPath="UCP.DialogMessages.Connection.ServerLoaded" />),
            ReactDOMServer.renderToStaticMarkup(<TranslatedText TranslationPath="UCP.DialogMessages.Connection.ServiceUnavaiable" />)
            ],
            'promise',
            LightModeState == LightMode().type,
          );
          promise.then((resolveRes)=>{
            window.location.href="./login"
          }).catch((errorRes)=>
          {

          })
      }


  })

  return (<>
    <div className="  min-h-screen BackgroundImage bg-cover bg-center flex flex-row justify-center items-center py-7 px-1 ">
        <motion.div
         initial={"hidden"}
         variants={Animations}
         animate={'visible'}
        >
        <Card
          className={`
          ${
            LightModeState == LightMode().type
              ? 'bg-whiteTheme_T2'
              : 'bg-darkTheme_T1'
          } w-[100vw] md:w-[70vw]  ExtraShadowed-div `}
        >
          <CardHeader
            variant="gradient"
            color="red"
            className="mb-4 grid h-28 place-items-center"
          >
            <i className="fa-solid fa-right-to-bracket fa-2x"></i>
            <Typography variant="h3" color="white">
              <TranslatedText
                TranslationPath="Register.Register_Title"
                TextColor="White"
              />
            </Typography>
          </CardHeader>
          <CardBody
            className={`flex flex-col gap-4 ${
              LightModeState == LightMode().type
                ? 'tc-whiteTheme_T1'
                : 'tc-darkTheme_T1'
            }`}
          >

            <div className=' grid justify-between items-center grid-cols-1 md:grid-cols-2 gap-4'>
                        <Input
              inputRef={userNamerRef}
              labelProps={{
                style: {
                  color: LightModeState == LightMode().type ? 'black' : 'white',
                },
              }}
              label={<TranslatedText TranslationPath="Register.UserName_Label" />}
              size="lg"
              required
            />

            <Input
            inputRef={emailRef}
              labelProps={{
                style: {
                  color: LightModeState == LightMode().type ? 'black' : 'white',
                },
              }}
              label={<TranslatedText TranslationPath="Register.Email_Label" />}
              size="lg"
              required
            />
            <Input
            inputRef={firstNameRef}
              labelProps={{
                style: {
                  color: LightModeState == LightMode().type ? 'black' : 'white',
                },
              }}
              label={
                <TranslatedText TranslationPath="Register.FirstName_Label" />
              }
              size="lg"
              required
            />
            <Input
            inputRef={lastNameRef}
              labelProps={{
                style: {
                  color: LightModeState == LightMode().type ? 'black' : 'white',
                },
              }}
              label={
                <TranslatedText TranslationPath="Register.LastName_Label" />
              }
              size="lg"
              required
            />
            <Input
            type='password'
            inputRef={passwordRef}
              labelProps={{
                style: {
                  color: LightModeState == LightMode().type ? 'black' : 'white',
                },
              }}
              label={
                <TranslatedText TranslationPath="Register.Password_Label" />
              }
              size="lg"
              required
            />

            <PhoneInput
              internationalDialRef={internationalDialNumberRef}
              phoneNumberRef={phoneNumberRef}
              labelProps={{
                style: {
                  color: LightModeState == LightMode().type ? 'black' : 'white',
                },
              }}
              InputLabel={TranslateString('Register.Phone_Label')}
            />
            <Input
            type='password'
            inputRef={confirmPasswordRef}
              labelProps={{
                style: {
                  color: LightModeState == LightMode().type ? 'black' : 'white',
                },
              }}
              label={
                <TranslatedText TranslationPath="Register.Confirm_Password_Label" />
              }
              size="lg"
              required
            />
            </div>
            <Typography
              variant="small"
              className={`${
                LightModeState == LightMode().type
                  ? 'tc-whiteTheme_T1'
                  : 'tc-darkTheme_T1'
              }  mt-2 flex items-center gap-1 font-normal`}
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
              {
                <TranslatedText TranslationPath="Register.PasswordCondition_Label" />
              }
            </Typography>

          </CardBody>
          <CardFooter className={``}>
            <Button
              variant="gradient"
              color="red"
              fullWidth
              className=" hover:scale-95"
              onClick={HandleRegister}
            >
              <TranslatedText
                TranslationPath="Register.SignInButtonLabel"
                TextColor="White"
              />
            </Button>
            <Typography
              variant="small"
              className={`${
                LightModeState == LightMode().type
                  ? 'tc-whiteTheme_T1'
                  : 'tc-darkTheme_T1'
              } mt-6 flex justify-center`}
            >
              <TranslatedText TranslationPath="Register.SignUpRecommandationLabel" />
              <Typography
                as="a"
                href="/login"
                variant="small"
                color="red"
                className="ml-1 font-bold"
              >
                <TranslatedText
                  TranslationPath="Login.Login_Title"
                  TextColor="White"
                />
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
        </motion.div>
    </div>
    </>
  );
}
