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
  IconButton,
  Popover,
  PopoverHandler,
  PopoverContent,
} from '@material-tailwind/react';
import { Textarea } from '@material-tailwind/react';
import Navbar from '../../components/NavBar';
import TranslatedText from '../../utils/Translation';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode, DarkMode } from '../../redux/actions/LightActions';
import PhoneInput from '../../components/Input/Phone';
import Footer from '../../components/footer';
import PropTypes from 'prop-types'; 
export default function ContactCard() {
  Input.propTypes=
  {
    label:PropTypes.any
  }
  Textarea.propTypes=
  {
    label:PropTypes.any
  }
  const LightModeState = useSelector((state) => state.lightMode);

  return (
    <>
      <Navbar />
      <div className="BackgroundImage py-4 px-2  bg-cover bg-center min-h-screen flex flex-row flex-wrap  justify-center items-center gap-4">
        <div className=" mt-[20vh]">
          <Card
            className={`
            animate-QuickLeftToRight
            backdrop-blur-lg ${
              LightModeState == LightMode().type
                ? 'bg-whiteTheme_T3'
                : 'bg-darkTheme_T1'
            } w-[90vw] sm:[70vw]  md:w-[50vw] lg:w-[50vw]  ExtraShadowed-div  m-0  backdrop-blur-sm `}
          >
            <CardHeader
              variant="gradient"
              color="red"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3">
                <i className="fa-solid fa-circle-info mx-2 "></i>
                <TranslatedText TranslationPath="Contact.Title1" />
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4 ">
              <List
                className={`my-2 p-0 bg-transparent  opacity-80  ${
                  LightModeState == LightMode().type
                    ? 'tc-whiteTheme_T1'
                    : 'tc-darkTheme_T1'
                }`}
              >
                <Typography
                  variant="h6"
                  className={` mx-1 ${
                    LightModeState == LightMode().type
                      ? 'tc-whiteTheme_T1'
                      : 'tc-darkTheme_T1'
                  }`}
                >
                  <TranslatedText TranslationPath="Contact.SubTitle1" />
                </Typography>
                <ListItem
                  className={`mx-1 ${
                    LightModeState == LightMode().type
                      ? 'tc-whiteTheme_T1'
                      : 'tc-darkTheme_T1'
                  } group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105`}
                >
                  <ListItemPrefix>
                    <i className="fa-solid fa-location-dot"></i>
                  </ListItemPrefix>
                  <TranslatedText TranslationPath="Contact.Address" />
                  <ListItemSuffix  className="text-current">
                    Rte de Gabes KM 0.5 Immeuble Elfrikha Sfax - Tunisie
                  </ListItemSuffix>
                </ListItem>
                <ListItem
                  className={`mx-1 ${
                    LightModeState == LightMode().type
                      ? 'tc-whiteTheme_T1'
                      : 'tc-darkTheme_T1'
                  } group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105`}
                >
                  <ListItemPrefix>
                    <i className="fa-solid fa-phone"></i>
                  </ListItemPrefix>
                  <TranslatedText TranslationPath="Contact.Phone" />:
                  <ListItemSuffix className="text-current">
                    (+216) 74 21 18 76
                  </ListItemSuffix>
                </ListItem>

                <ListItem
                  className={`mx-1 ${
                    LightModeState == LightMode().type
                      ? 'tc-whiteTheme_T1'
                      : 'tc-darkTheme_T1'
                  } group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105`}
                >
                  <ListItemPrefix>
                    <i className="fa-solid fa-fax"></i>
                  </ListItemPrefix>
                  <TranslatedText TranslationPath="Contact.Fax" />
                  <ListItemSuffix className="text-current">
                    (+216) 74 22 66 09
                  </ListItemSuffix>
                </ListItem>

                <ListItem
                  className={`mx-1 ${
                    LightModeState == LightMode().type
                      ? 'tc-whiteTheme_T1'
                      : 'tc-darkTheme_T1'
                  } group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105`}
                >
                  <ListItemPrefix>
                    <i className="fa-solid fa-at"></i>
                  </ListItemPrefix>
                  <TranslatedText TranslationPath="Contact.Email" />
                  <ListItemSuffix className="text-current">
                    sph@sph-tn.com
                  </ListItemSuffix>
                </ListItem>

                <Typography
                  variant="h6"
                  className={`mx-1 ${
                    LightModeState == LightMode().type
                      ? 'tc-whiteTheme_T1'
                      : 'tc-darkTheme_T1'
                  }`}
                >
                  <TranslatedText TranslationPath="Contact.SubTitle2" />
                </Typography>

                <ListItem
                  className={`mx-1 ${
                    LightModeState == LightMode().type
                      ? 'tc-whiteTheme_T1'
                      : 'tc-darkTheme_T1'
                  } group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105`}
                >
                  <ListItemPrefix>
                    <i className="fa-solid fa-location-dot"></i>
                  </ListItemPrefix>
                  <TranslatedText TranslationPath="Contact.Address" />
                  <ListItemSuffix className="text-current">
                    {' '}
                    Rte de Gabes KM 0.5 Immeuble Elfrikha Sfax - Tunisie
                  </ListItemSuffix>
                </ListItem>
                <ListItem
                  className={`mx-1 ${
                    LightModeState == LightMode().type
                      ? 'tc-whiteTheme_T1'
                      : 'tc-darkTheme_T1'
                  } group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105`}
                >
                  <ListItemPrefix>
                    <i className="fa-solid fa-phone"></i>
                  </ListItemPrefix>
                  <TranslatedText TranslationPath="Contact.Phone" />
                  <ListItemSuffix className="text-current">
                    (+216) 74 21 18 76
                  </ListItemSuffix>
                </ListItem>

                <ListItem
                  className={`mx-1 ${
                    LightModeState == LightMode().type
                      ? 'tc-whiteTheme_T1'
                      : 'tc-darkTheme_T1'
                  } group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105`}
                >
                  <ListItemPrefix>
                    <i className="fa-solid fa-fax"></i>
                  </ListItemPrefix>
                  <TranslatedText TranslationPath="Contact.Fax" />
                  <ListItemSuffix className="text-current">
                    (+216) 74 22 66 09
                  </ListItemSuffix>
                </ListItem>

                <ListItem
                  className={`mx-1 ${
                    LightModeState == LightMode().type
                      ? 'tc-whiteTheme_T1'
                      : 'tc-darkTheme_T1'
                  } group hover:bg-opacity-80 rounded-xl py-1.5 px-3 text-sm font-normal hover:scale-105`}
                >
                  <ListItemPrefix>
                    <i className="fa-solid fa-at"></i>
                  </ListItemPrefix>
                  <TranslatedText TranslationPath="Contact.Email" />
                  <ListItemSuffix className="text-current">
                    sph@sph-tn.com
                  </ListItemSuffix>
                </ListItem>
              </List>

            </CardBody>
          </Card>
        </div>
        <div className=" mt-6 md:mt-[20vh]">
          <Card
            className={`
              animate-QuickRightToLeft
                ${
              LightModeState == LightMode().type
                ? 'bg-whiteTheme_T3'
                : 'bg-darkTheme_T1'
            } w-[90vw] sm:[40vw]  md:w-[40vw] lg:w-[40vw]  ExtraShadowed-div  backdrop-blur-sm `}
          >
            <CardHeader
              variant="gradient"
              color="red"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                <i className="fa-solid fa-envelope mx-2 "></i>
                <TranslatedText TranslationPath="Contact.Title2" />
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
                labelProps={{
                  style: {
                    color:
                      LightModeState == LightMode().type ? 'black' : 'white',
                  },
                }}
                label={<TranslatedText TranslationPath="Contact.Email" />}
                size="lg"
                
                required
              />
              <Input
                labelProps={{
                  style: {
                    color:
                      LightModeState == LightMode().type ? 'black' : 'white',
                  },
                }}
                label={<TranslatedText TranslationPath="Contact.FName" />}
                
                size="lg"
                required
              />
              <Input
                labelProps={{
                  style: {
                    color:
                      LightModeState == LightMode().type ? 'black' : 'white',
                  },
                }}
                label={<TranslatedText TranslationPath="Contact.LName" />}
                
                size="lg"
                required
              />
              <PhoneInput />
              <Textarea
                labelProps={{
                  style: {
                    color:
                      LightModeState == LightMode().type ? 'black' : 'white',
                  },
                }}
                label={<TranslatedText TranslationPath="Contact.Message" />}
                
                required
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                variant="gradient"
                className=" hover:scale-105 "
                color="red"
                fullWidth
              >
                Send Message
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
