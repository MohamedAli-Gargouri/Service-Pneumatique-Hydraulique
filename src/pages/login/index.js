import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from '@material-tailwind/react';
import React from 'react';
import TranslatedText from '../../utils/Translation';
import { LightMode } from '../../redux/actions/LightActions';
import PropTypes from 'prop-types';
import { login } from '../../services/auth';
import { CreateToast } from '../../utils/Toast';
import ReactDOMServer from 'react-dom/server';
import { VerifyInputs } from '../../utils/others/VerifyInputs';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { SET_ACCESS_TOKEN  } from '../../redux/actions/AccessTokenActions';
import { SET_LOGGED,UNSET_LOGGED } from '../../redux/actions/isLoggedActions';
Input.propTypes=
{
  label:PropTypes.any
}
export default function LoginCard() {
  const LightModeState = useSelector((state) => state.lightMode);
  const isLogged = useSelector((state) => state.isLogged);
  if(isLogged)
  {
    window.location="/home"
  }
  const userNameRef=React.useRef(null);
  const passwordRef=React.useRef(null)
  const rememberMeRef=React.useRef(null)
  const dispatch = useDispatch();
  const HandleLogin=(()=>{

    if(VerifyInputs([userNameRef.current.value],
      [],
      [],
      [],
      [],
      [],
      [],
      LightModeState == LightMode().type))
    {
      const promise=login(userNameRef.current.value,passwordRef.current.value,rememberMeRef.current.checked)
        CreateToast(
          promise,
          "",
          ReactDOMServer.renderToStaticMarkup(<TranslatedText TranslationPath="UCP.DialogMessages.Login.Login_Success" />),
          ReactDOMServer.renderToStaticMarkup(<TranslatedText TranslationPath="UCP.DialogMessages.Promise.Pending" />),
          ReactDOMServer.renderToStaticMarkup(<TranslatedText TranslationPath="UCP.DialogMessages.Login.Login_Error" />),
          /*Custom request Errors message*/
          [
          ReactDOMServer.renderToStaticMarkup(<TranslatedText TranslationPath="UCP.DialogMessages.Login.WrongCreds_Error" />),
          ],
          /*Custom Request Error codes */
          ["AUTH_ERROR01"],
          /*Default Connection Errors */
          [
          ReactDOMServer.renderToStaticMarkup(<TranslatedText TranslationPath="UCP.DialogMessages.Connection.ConnectionLost" />),
          ReactDOMServer.renderToStaticMarkup(<TranslatedText TranslationPath="UCP.DialogMessages.Connection.ServerLoaded" />),
          ReactDOMServer.renderToStaticMarkup(<TranslatedText TranslationPath="UCP.DialogMessages.Connection.ServiceUnavaiable" />)
          ],
          'promise',
          LightModeState == LightMode().type,
        );
        //login is successs
        promise.then((res)=>{
          dispatch(SET_ACCESS_TOKEN(res.data.token))
          dispatch(SET_LOGGED())
          window.location.href="./home"
        })
        //Login failed
        .catch(()=>
        {
          dispatch(UNSET_LOGGED())
        })
    }


})
  return (
    <div className=" min-h-screen BackgroundImage bg-cover  bg-center flex flex-row justify-center items-center">
        <Card
          className={`
           animate-QuickBottomToTop
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
                TranslationPath="Login.Login_Title"
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
            <Input
            inputRef={userNameRef}
              labelProps={{
                style: {
                  color: LightModeState == LightMode().type ? 'black' : 'white',
                },
              }}
              label={<TranslatedText TranslationPath="Login.Username_Label" />}
              size="lg"
            />
            <Input
            type='password'
            inputRef={passwordRef}
              labelProps={{
                style: {
                  color: LightModeState == LightMode().type ? 'black' : 'white',
                },
              }}
              label={<TranslatedText TranslationPath="Login.Password_Label" />}
              size="lg"
            />
            <div className="-ml-2.5">
              <Checkbox
              inputRef={rememberMeRef}
                labelProps={{
                  style: {
                    color:
                      LightModeState == LightMode().type ? 'black' : 'white',
                  },
                }}
                label={
                  <TranslatedText TranslationPath="Login.RememberMeLabel" />
                }
              />
            </div>
          </CardBody>
          <CardFooter
            className={`${
              LightModeState == LightMode().type
                ? 'tc-whiteTheme_T1'
                : 'tc-darkTheme_T1'
            }`}
          >
            <Button
              variant="gradient"
              color="red"
              className="hover:scale-90"
              onClick={HandleLogin}
              fullWidth
            >
              <TranslatedText
                TranslationPath="Login.SignInButtonLabel"
                TextColor="White"
              />
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              <TranslatedText TranslationPath="Login.SignUpRecommandationLabel" />
              <Typography
                as="a"
                href="/register"
                variant="small"
                color="red"
                className="ml-1 font-bold"
              >
                <TranslatedText
                  TranslationPath="Register.Register_Title"
                  TextColor="White"
                />
              </Typography>
            </Typography>
          </CardFooter>
        </Card>



    </div>
  );
}
