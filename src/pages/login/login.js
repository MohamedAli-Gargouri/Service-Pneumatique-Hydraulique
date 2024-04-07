import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Checkbox, Button } from '@material-tailwind/react';
import React from 'react';
import TranslatedText from '../../utils/Translation';
import { LightMode } from '../../redux/actions/LightActions';
import PropTypes from 'prop-types';
import { login } from '../../services/auth';
import { Notify } from '../../utils/Toast/toast';
import ReactDOMServer from 'react-dom/server';
import { VerifyInputs } from '../../utils/others/VerifyInputs';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { SET_ACCESS_TOKEN } from '../../redux/actions/AccessTokenActions';
import { SET_LOGGED, UNSET_LOGGED } from '../../redux/actions/isLoggedActions';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
Input.propTypes = {
  label: PropTypes.any,
};
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
export default function LoginCard() {
  const LightModeState = useSelector((state) => state.lightMode);
  const isLogged = useSelector((state) => state.isLogged);
  const { t, i18n } = useTranslation();
  var isLightMode = LightModeState == LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState == LightMode().type;
  }, [LightModeState]);
  if (isLogged) {
    window.location = '/home';
  }
  const userNameRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const rememberMeRef = React.useRef(null);
  const dispatch = useDispatch();

  /**
   * Function that handles logging the user to the web application
   */
  const HandleLogin = () => {
    if (VerifyInputs([userNameRef.current.value], [], [], [], [], [], [], isLightMode)) {
      const promise = login(userNameRef.current.value, passwordRef.current.value, rememberMeRef.current.checked);
      Notify.displayPromiseNotification(
        promise,
        [t('UCP.DialogMessages.Login.WrongCreds_Error')],
        ['AUTH_ERROR01'],
        isLightMode,
      );
      //login is successs
      promise
        .then((res) => {
          dispatch(SET_ACCESS_TOKEN(res.data.token));
          dispatch(SET_LOGGED());
          window.location.href = './home';
        })
        //Login failed
        .catch(() => {
          dispatch(UNSET_LOGGED());
        });
    }
  };
  return (
    <div className=" min-h-screen BackgroundImage bg-cover  bg-center flex flex-row justify-center items-center">
      <motion.div initial={'hidden'} variants={Animations} animate={'visible'}>
        <Card className={` w-[100vw] md:w-[70vw]  ExtraShadowed-div  background-secondary text-primary`}>
          <CardHeader variant="gradient" color="red" className="mb-4 grid h-28 place-items-center">
            <i className="fa-solid fa-right-to-bracket fa-2x text-white-c"></i>
            <Typography variant="h3" className="text-white-c">
              {t('Login.Login_Title')}
            </Typography>
          </CardHeader>
          <CardBody className={`flex flex-col gap-4 `}>
            <Input
              inputRef={userNameRef}
              labelProps={{
                style: { color: isLightMode ? 'black' : 'white' },
              }}
              label={t('Login.Username_Label')}
              size="lg"
            />
            <Input
              type="password"
              inputRef={passwordRef}
              labelProps={{
                style: {
                  color: isLightMode ? 'black' : 'white',
                },
              }}
              label={t('Login.Password_Label')}
              size="lg"
            />
            <div className="-ml-2.5">
              <Checkbox
                inputRef={rememberMeRef}
                labelProps={{
                  style: {
                    color: isLightMode ? 'black' : 'white',
                  },
                }}
                label={t('Login.RememberMeLabel')}
              />
            </div>
          </CardBody>
          <CardFooter>
            <Button variant="gradient" color="red" className="hover:scale-90" onClick={HandleLogin} fullWidth>
              {t('Login.SignInButtonLabel')}
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              {t('Login.SignUpRecommandationLabel')}
              <Typography as="a" href="/register" variant="small" color="red" className="ml-1 font-bold">
                {t('Register.Register_Title')}
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
