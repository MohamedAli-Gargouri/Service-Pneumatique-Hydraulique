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
} from '@material-tailwind/react';
import { Textarea } from '@material-tailwind/react';
import Navbar from '../../components/NavBar';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/light-actions';
import PhoneInput from '../../components/Input/Phone';
import Footer from '../../components/footer';
import PropTypes from 'prop-types';
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { RootState } from 'redux/reducers';
//Animations Config
const Animations = {
  hidden: {
    opacity: 0,
    y: 0,
    x: 0,
    scale: 0.5,
  },
  hiddenLeft: {
    opacity: 0,
    y: 0,
    x: -500,
    scale: 0.5,
  },
  hiddenRight: {
    opacity: 0,
    y: 0,
    x: 500,
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
export default function ContactCard() {
  Input.propTypes = {
    label: PropTypes.any,
  };
  Textarea.propTypes = {
    label: PropTypes.any,
  };
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const phoneInputRef = React.useRef(null);
  const internationalDialNumberRef = React.useRef(null);
  const { t, i18n } = useTranslation();
  var isLightMode = LightModeState == LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState == LightMode().type;
  }, [LightModeState]);
  return (
    <>
      <Navbar />
      <div className="BackgroundImage py-4 px-2  bg-cover bg-center min-h-screen flex flex-row flex-wrap  justify-center items-center gap-4">
        <motion.div className=" mt-[20vh]" initial={'hiddenLeft'} variants={Animations} animate={'visible'}>
          <Card
            className={`w-[90vw] sm:[70vw]  md:w-[50vw] lg:w-[50vw] ExtraShadowed-div m-0 backdrop-blur-sm background-secondary text-primary `}
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
              <Typography variant="h3">
                <i className="fa-solid fa-circle-info mx-2 "></i> {t('Contact.Title1')}
              </Typography>
            </CardHeader>
            <CardBody
              className="flex flex-col gap-4 "
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <List
                className={`my-2 p-0 bg-transparent  opacity-80  `}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Typography variant="h6" className={` mx-1 `}>
                  {t('Contact.SubTitle1')}
                </Typography>
                <ListItem
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  className={`mx-1 group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105`}
                >
                  <ListItemPrefix
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <i className="fa-solid fa-location-dot"></i>
                  </ListItemPrefix>
                  {t('Contact.Address')}
                  <ListItemSuffix
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    className="text-current"
                  >
                    Rte de Gabes KM 0.5 Immeuble Elfrikha Sfax - Tunisie
                  </ListItemSuffix>
                </ListItem>
                <ListItem
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  className={`mx-1 group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105`}
                >
                  <ListItemPrefix
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <i className="fa-solid fa-phone"></i>
                  </ListItemPrefix>
                  {t('Contact.Phone')}:
                  <ListItemSuffix
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    className="text-current"
                  >
                    (+216) 74 21 18 76
                  </ListItemSuffix>
                </ListItem>

                <ListItem
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  className={`mx-1 group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105`}
                >
                  <ListItemPrefix
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <i className="fa-solid fa-fax"></i>
                  </ListItemPrefix>
                  {t('Contact.Fax')}
                  <ListItemSuffix
                    className="text-current"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    (+216) 74 22 66 09
                  </ListItemSuffix>
                </ListItem>

                <ListItem
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  className={`mx-1 group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105`}
                >
                  <ListItemPrefix
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <i className="fa-solid fa-at"></i>
                  </ListItemPrefix>
                  {t('Contact.Email')}
                  <ListItemSuffix
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    className="text-current"
                  >
                    sph@sph-tn.com
                  </ListItemSuffix>
                </ListItem>

                <Typography variant="h6" className={`mx-1 `}>
                  {t('Contact.SubTitle2')}
                </Typography>

                <ListItem
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  className={`mx-1 group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105`}
                >
                  <ListItemPrefix
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <i className="fa-solid fa-location-dot"></i>
                  </ListItemPrefix>
                  {t('Contact.Address')}
                  <ListItemSuffix
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    className="text-current"
                  >
                    {' '}
                    Rte de Gabes KM 0.5 Immeuble Elfrikha Sfax - Tunisie
                  </ListItemSuffix>
                </ListItem>
                <ListItem
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  className={`mx-1 group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105`}
                >
                  <ListItemPrefix
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <i className="fa-solid fa-phone"></i>
                  </ListItemPrefix>
                  {t('Contact.Phone')}
                  <ListItemSuffix
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    className="text-current"
                  >
                    (+216) 74 21 18 76
                  </ListItemSuffix>
                </ListItem>

                <ListItem
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  className={`mx-1 group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105`}
                >
                  <ListItemPrefix
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <i className="fa-solid fa-fax"></i>
                  </ListItemPrefix>
                  {t('Contact.Fax')}
                  <ListItemSuffix
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    className="text-current"
                  >
                    (+216) 74 22 66 09
                  </ListItemSuffix>
                </ListItem>

                <ListItem
                  className={`mx-1 group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105`}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <ListItemPrefix
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <i className="fa-solid fa-at"></i>
                  </ListItemPrefix>
                  {t('Contact.Email')}
                  <ListItemSuffix
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    className="text-current"
                  >
                    sph@sph-tn.com
                  </ListItemSuffix>
                </ListItem>
              </List>
            </CardBody>
          </Card>
        </motion.div>
        <motion.div initial={'hiddenRight'} variants={Animations} animate={'visible'} className=" mt-6 md:mt-[20vh]">
          <Card
            className={`w-[90vw] sm:[40vw] md:w-[40vw] lg:w-[40vw] ExtraShadowed-div backdrop-blur-sm background-secondary text-primary`}
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
              <Typography variant="h3" color="white">
                <i className="fa-solid fa-envelope mx-2 "></i>
                {t('Contact.Title2')}
              </Typography>
            </CardHeader>
            <CardBody
              className={`flex flex-col gap-4 `}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Input
                labelProps={{
                  style: {
                    color: isLightMode ? 'black' : 'white',
                  },
                }}
                label={t('Contact.Email')}
                size="lg"
                required
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              <Input
                labelProps={{
                  style: {
                    color: isLightMode ? 'black' : 'white',
                  },
                }}
                label={t('Contact.FName')}
                size="lg"
                required
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              <Input
                labelProps={{
                  style: {
                    color: isLightMode ? 'black' : 'white',
                  },
                }}
                label={t('Contact.LName')}
                size="lg"
                required
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              <PhoneInput phoneNumberRef={phoneInputRef} internationalDialRef={internationalDialNumberRef} />
              <Textarea
                labelProps={{
                  style: {
                    color: isLightMode ? 'black' : 'white',
                  },
                }}
                label={t('Contact.Message')}
                required
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </CardBody>
            <CardFooter
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="pt-0"
            >
              <Button
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                variant="gradient"
                className=" hover:scale-105 "
                color="red"
                fullWidth
              >
                Send Message
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
