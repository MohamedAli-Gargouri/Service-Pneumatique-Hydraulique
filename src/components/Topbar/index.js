import React from 'react';
import {
  Badge,
  IconButton,
  Avatar,
  Collapse,
  Card,
  Typography,
  CardBody,
} from '@material-tailwind/react';
import Sidebar from '../SideBar';
import SPHLOGO from '../../assets/images/SPH Logo.png';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode, DarkMode } from '../../redux/actions/LightActions';
import { OPENCART } from '../../redux/actions/cartActions';
import { Bars2Icon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import Notification from '../Notification';
import LanguageSelect from '../NavBar/languageListSelect';
export default function UCP_TopBar(props) {
  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => setOpen(!open);
  const XLBreakPoint = 1140;
  const updateWindowDimensions = () => {
    if (window.innerWidth > XLBreakPoint) {
      setOpen(false);
    }
  };

  const LightModeState = useSelector((state) => state.lightMode);
  const dispatch = useDispatch();

  const toggleCart = () => {
    dispatch(OPENCART());
  };
  const HandleLightModeSwitch = () => {
    if (LightModeState == LightMode().type) {
      dispatch(DarkMode());
    }
    if (LightModeState == DarkMode().type) {
      dispatch(LightMode());
    }
  };

  React.useEffect(() => {
    // Add an event listener for the window resize event
    window.addEventListener('resize', updateWindowDimensions);

    // Remove the event listener when the component unmounts to prevent memory leaks
    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    };
  }, []);
  return (
    <div className=" grid grid-cols-1 TopNav">
      <div className="grid col-span-1 grid-cols-2">
        <div className=" flex justify-start col-span-1">
          <IconButton
            className="rounded-full xl:hidden"
            onClick={() => toggleOpen()}
          >
            <i className="fa-solid fa-bars"></i>
          </IconButton>
        </div>
        <div className="col-span-1 flex flex-row gap-1  w-full justify-end items-center">
          <div className="Cart mx-1">
            <Badge content="2" className="" placement="top-end">
              <IconButton
                variant="text"
                size="sm"
                color="white"
                className="rounded-full"
                onClick={() => {
                  toggleCart();
                }}
              >
                <i className="fa-solid fa-bag-shopping"></i>
              </IconButton>
            </Badge>
          </div>
          <div className="LightMode mx-1">
            <IconButton
              size="sm"
              color="white"
              variant="text"
              className="rounded-full"
              onClick={HandleLightModeSwitch}
            >
              {LightModeState == LightMode().type ? (
                <MoonIcon className="h-4 w-4 md:h-6 md:w-6" />
              ) : (
                <SunIcon className="h-6 w-6" />
              )}
            </IconButton>
          </div>

          <div>
            <LanguageSelect />
          </div>

          <Notification />

          <Avatar
            variant="circular"
            size="sm"
            alt="User"
            className="border border-blue-500 ml-4 hover:scale-125"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
        </div>

        <Collapse
          style={{ position: 'absolute', top: '10vh', left: '0' }}
          className="z-50"
          open={open}
        >
          <Card
            className={`${
              LightModeState == LightMode().type
                ? 'tc-whiteTheme_T1 bg-whiteTheme_T3'
                : 'tc-darkTheme_T1 bg-darkTheme_T1'
            } w-[95M] p-1 h-full`}
          >
            <Sidebar />
          </Card>
        </Collapse>
      </div>
      <Typography
        color="red"
        variant="h3"
        className={`text-center xl:text-left col-span-1  tc-darkTheme_T1 `}
      >
        {props.Icon != undefined ? (
          <span
            className="mr-4"
            dangerouslySetInnerHTML={{ __html: props.Icon }}
          ></span>
        ) : null}
        {props.SectionName}
      </Typography>
    </div>
  );
}
