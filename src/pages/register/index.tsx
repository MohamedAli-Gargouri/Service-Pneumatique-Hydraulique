import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Button } from '@material-tailwind/react';
import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/light-actions';
import PhoneInput from '../../components/Input/Phone';
import { register } from '../../services/auth';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNotify } from 'utils/hooks/useNotify';
import { RootState } from 'redux/reducers';
import { useInputValidation } from 'utils/hooks/useInputValidation';
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
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const isLogged = useSelector((state: RootState) => state.isLogged);
  const { displayNotification, displayPromiseNotification } = useNotify();
  const { validateInputs } = useInputValidation();
  const { t, i18n } = useTranslation();
  var isLightMode = LightModeState == LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState == LightMode().type;
  }, [LightModeState]);
  if (isLogged) {
    window.location.href = '/home';
  }
  const userNamerRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const firstNameRef = React.useRef(null);
  const lastNameRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const internationalDialNumberRef = React.useRef(null);
  const phoneNumberRef = React.useRef(null);
  const confirmPasswordRef = React.useRef(null);

  const HandleRegister = () => {
    if (
      validateInputs(
        [userNamerRef.current.value, firstNameRef.current.value, lastNameRef.current.value],
        [emailRef.current.value],
        [],
        [internationalDialNumberRef.current],
        [phoneNumberRef.current.value],
        [passwordRef.current.value],
        [confirmPasswordRef.current.value],
      )
    ) {
      const promise = register(
        userNamerRef.current.value,
        emailRef.current.value,
        firstNameRef.current.value,
        lastNameRef.current.value,
        passwordRef.current.value,
        internationalDialNumberRef.current,
        phoneNumberRef.current.value,
      );
      displayPromiseNotification(
        promise,
        [
          t('UCP.DialogMessages.Register.UsedEmail_Error'),
          t('UCP.DialogMessages.Register.UsedPhoneNumber_Erro'),
          t('UCP.DialogMessages.Register.UsedUsername_Error'),
        ],
        ['AUTH_ERROR04', 'AUTH_ERROR05', 'AUTH_ERROR06'],
      );
      promise
        .then((resolveRes) => {
          window.location.href = './login';
        })
        .catch((errorRes) => {});
    }
  };

  return (
    <>
      <div className="  min-h-screen BackgroundImage bg-cover bg-center flex flex-row justify-center items-center py-7 px-1 ">
        <motion.div initial={'hidden'} variants={Animations} animate={'visible'}>
          <Card
            className={` text-primary background-secondary w-[100vw] md:w-[70vw]  ExtraShadowed-div `}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <CardHeader
              variant="gradient"
              color="red"
              className="mb-4 grid h-28 place-items-center"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <i className="fa-solid fa-right-to-bracket fa-2x text-white-c"></i>
              <Typography variant="h3" className="text-white-c">
                {t('Register.Register_Title')}
              </Typography>
            </CardHeader>
            <CardBody
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className={`flex flex-col gap-4 `}
            >
              <div className=" grid justify-between items-center grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  inputRef={userNamerRef}
                  labelProps={{
                    style: {
                      color: isLightMode ? 'black' : 'white',
                    },
                  }}
                  label={t('Register.UserName_Label')}
                  size="lg"
                  required
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />

                <Input
                  inputRef={emailRef}
                  labelProps={{
                    style: {
                      color: isLightMode ? 'black' : 'white',
                    },
                  }}
                  label={t('Register.Email_Label')}
                  size="lg"
                  required
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
                <Input
                  inputRef={firstNameRef}
                  labelProps={{
                    style: {
                      color: isLightMode ? 'black' : 'white',
                    },
                  }}
                  label={t('Register.FirstName_Label')}
                  size="lg"
                  required
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
                <Input
                  inputRef={lastNameRef}
                  labelProps={{
                    style: {
                      color: isLightMode ? 'black' : 'white',
                    },
                  }}
                  label={t('Register.LastName_Label')}
                  size="lg"
                  required
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
                  label={t('Register.Password_Label')}
                  size="lg"
                  required
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />

                <PhoneInput internationalDialRef={internationalDialNumberRef} phoneNumberRef={phoneNumberRef} />
                <Input
                  type="password"
                  inputRef={confirmPasswordRef}
                  labelProps={{
                    style: {
                      color: isLightMode ? 'black' : 'white',
                    },
                  }}
                  label={t('Register.Confirm_Password_Label')}
                  size="lg"
                  required
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
              </div>
              <Typography variant="small" className={`mt-2 flex items-center gap-1 font-normal`}>
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
                {t('Register.PasswordCondition_Label')}
              </Typography>
            </CardBody>
            <CardFooter
              className={``}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Button
                variant="gradient"
                color="red"
                fullWidth
                className=" hover:scale-95"
                onClick={HandleRegister}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {t('Register.SignInButtonLabel')}
              </Button>
              <Typography variant="small" className={`mt-6 flex justify-center`}>
                {t('Register.SignUpRecommandationLabel')}
                <Typography as="a" href="/login" variant="small" color="red" className="ml-1 font-bold">
                  {t('Login.Login_Title')}
                </Typography>
              </Typography>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </>
  );
}
