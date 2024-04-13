import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Checkbox, Button } from '@material-tailwind/react';
import React from 'react';
import { LightMode } from '../../redux/actions/light-actions';
import PropTypes from 'prop-types';
import { login } from '../../services/auth';
import ReactDOMServer from 'react-dom/server';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { SET_ACCESS_TOKEN } from '../../redux/actions/AccessTokenActions';
import { SET_LOGGED, UNSET_LOGGED } from '../../redux/actions/isLoggedActions';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { RootState } from 'types/components/general';
import { useNotify } from 'utils/hooks/useNotify';
import { useInputValidation } from 'utils/hooks/useInputValidation';
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
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const isLogged = useSelector((state: RootState) => state.isLogged);
  const { validateInputs } = useInputValidation();
  const { t } = useTranslation();
  var isLightMode = LightModeState == LightMode().type;
  const { displayPromiseNotification } = useNotify();
  React.useEffect(() => {
    isLightMode = LightModeState == LightMode().type;
  }, [LightModeState]);
  if (isLogged) {
    window.location.href = '/home';
  }
  const userNameRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const rememberMeRef = React.useRef(null);
  const dispatch = useDispatch();

  /**
   * Function that handles logging the user to the web application
   */
  const HandleLogin = () => {
    if (validateInputs([userNameRef.current.value], [], [], [], [], [], [])) {
      const promise = login(userNameRef.current.value, passwordRef.current.value, rememberMeRef.current.checked);
      displayPromiseNotification(promise, [t('UCP.DialogMessages.Login.WrongCreds_Error')], ['AUTH_ERROR01']);
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
        <Card
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className={` w-[100vw] md:w-[70vw]  ExtraShadowed-div  background-secondary text-primary`}
        >
          <CardHeader
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            variant="gradient"
            color="red"
            className="mb-4 grid h-28 place-items-center"
          >
            <i className="fa-solid fa-right-to-bracket fa-2x text-white-c"></i>
            <Typography
              variant="h3"
              className="text-white-c"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {t('Login.Login_Title')}
            </Typography>
          </CardHeader>
          <CardBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className={`flex flex-col gap-4 `}
          >
            <Input
              inputRef={userNameRef}
              labelProps={{
                style: { color: isLightMode ? 'black' : 'white' },
              }}
              label={t('Login.Username_Label')}
              size="lg"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
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
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
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
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>
          </CardBody>
          <CardFooter placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <Button
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              variant="gradient"
              color="red"
              className="hover:scale-90"
              onClick={HandleLogin}
              fullWidth
            >
              {t('Login.SignInButtonLabel')}
            </Button>
            <Typography
              variant="small"
              className="mt-6 flex justify-center"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {t('Login.SignUpRecommandationLabel')}
              <Typography
                as="a"
                href="/register"
                variant="small"
                color="red"
                className="ml-1 font-bold"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {t('Register.Register_Title')}
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
