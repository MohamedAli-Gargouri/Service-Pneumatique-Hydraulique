import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Button } from '@material-tailwind/react';
import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/light-actions';
import PhoneInput from '../../components/Input/Phone';
import { register } from '../../services/auth';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNotify } from 'utils/hooks/useNotify';
import { RootState } from 'types/components/general';
import { useInputValidation } from 'utils/hooks/useInputValidation';
import FormTextBox from 'components/Form/Form-TextBox';
import { FormButtonParamBuilder, FormTextBoxParam, FormTextBoxParamBuilder } from 'types/components/params';
import FormButton from 'components/Form/Form-Button';
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
  const { t } = useTranslation();
  var isLightMode = LightModeState === LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState === LightMode().type;
  }, [LightModeState]);
  if (isLogged) {
    window.location.href = '/home';
  }

  const userName = React.useState<string>('');
  const email = React.useState<string>('');
  const firstName = React.useState<string>('');
  const lastName = React.useState<string>('');
  const password = React.useState<string>('');
  const confirmPassword = React.useState<string>('');
  const phoneNumber = React.useState<string>('');
  React.useEffect(() => {
    console.log(phoneNumber);
  }, [phoneNumber]);
  const HandleRegister = () => {
    if (
      validateInputs(
        [userName[0], firstName[0], lastName[0]],
        [email[0]],
        [],
        [],
        [],
        [password[0]],
        [confirmPassword[0]],
      )
    ) {
      const promise = register(
        userName[0],
        email[0],
        firstName[0],
        lastName[0],
        password[0],
        phoneNumber[0].slice(0, 3),
        phoneNumber[0].slice(3, 11),
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
              <Typography
                variant="h3"
                className="text-white-c"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
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
                <FormTextBox
                  parameter={new FormTextBoxParamBuilder()
                    .setLabel(t('Register.UserName_Label'))
                    .setValidation(true)
                    .setRequired(true)
                    .setState(userName)
                    .build()}
                ></FormTextBox>

                <FormTextBox
                  parameter={new FormTextBoxParamBuilder()
                    .setMode('email')
                    .setValidation(true)
                    .setRequired(true)
                    .setLabel(t('Register.Email_Label'))
                    .setState(email)
                    .build()}
                ></FormTextBox>
                <FormTextBox
                  parameter={new FormTextBoxParamBuilder()
                    .setLabel(t('Register.FirstName_Label'))
                    .setValidation(true)
                    .setRequired(true)
                    .setState(firstName)
                    .build()}
                ></FormTextBox>

                <FormTextBox
                  parameter={new FormTextBoxParamBuilder()
                    .setLabel(t('Register.LastName_Label'))
                    .setValidation(true)
                    .setRequired(true)
                    .setState(lastName)
                    .build()}
                ></FormTextBox>

                <FormTextBox
                  parameter={new FormTextBoxParamBuilder()
                    .setLabel(t('Register.Password_Label'))
                    .setValidation(true)
                    .setRequired(true)
                    .setMode('password')
                    .setState(password)
                    .build()}
                ></FormTextBox>

                <FormTextBox
                  parameter={new FormTextBoxParamBuilder()
                    .setLabel(t('Register.Confirm_Password_Label'))
                    .setValidation(true)
                    .setRequired(true)
                    .setMode('password')
                    .setState(confirmPassword)
                    .build()}
                ></FormTextBox>

                <FormTextBox
                  parameter={new FormTextBoxParamBuilder()
                    .setLabel(t('Register.Confirm_Password_Label'))
                    .setValidation(true)
                    .setRequired(true)
                    .setMode('tel')
                    .setState(phoneNumber)
                    .build()}
                ></FormTextBox>
              </div>
              <Typography
                variant="small"
                className={`mt-2 flex items-center gap-1 font-normal`}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="mt-px h-4 w-4">
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
              <FormButton
                parameter={new FormButtonParamBuilder()
                  .setFullWidth(true)
                  .setClickCallBackFunction(HandleRegister)
                  .setText(t('Register.SignInButtonLabel'))
                  .build()}
              ></FormButton>

              <Typography
                variant="small"
                className={`mt-6 flex justify-center`}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {t('Register.SignUpRecommandationLabel')}
                <Typography
                  as="a"
                  href="/login"
                  variant="small"
                  className="ml-1 font-bold accent-primary"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
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
