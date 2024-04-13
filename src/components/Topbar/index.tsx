import React from 'react';
import { Badge, IconButton, Avatar, Collapse, Card, Typography } from '@material-tailwind/react';
import Sidebar from '../SideBar';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode, DarkMode } from 'redux/actions/light-actions';
import { openCart } from 'redux/actions/cart-actions';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import Notification from '../Notification';
import LanguageSelect from '../NavBar/languageListSelect';
import PropTypes from 'prop-types';
import { RootState } from 'types/components/general';
UCP_TopBar.propTypes = {
  Icon: PropTypes.string.isRequired,
  SectionName: PropTypes.node.isRequired,
};
export default function UCP_TopBar({ Icon, SectionName }) {
  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => setOpen(!open);
  const XLBreakPoint = 1140;
  const updateWindowDimensions = () => {
    if (window.innerWidth > XLBreakPoint) {
      setOpen(false);
    }
  };

  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const dispatch = useDispatch();

  const toggleCart = () => {
    dispatch(openCart());
  };
  const HandleLightModeSwitch = () => {
    if (LightModeState === LightMode().type) {
      dispatch(DarkMode());
    }
    if (LightModeState === DarkMode().type) {
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
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <i className="fa-solid fa-bars"></i>
          </IconButton>
        </div>
        <div className="col-span-1 flex flex-row gap-1  w-full justify-end items-center">
          <div className=" text-white-c Cart mx-1">
            <Badge content="2" className="" color="red" placement="top-end">
              <IconButton
                variant="text"
                size="sm"
                color="white"
                className="rounded-full"
                onClick={() => {
                  toggleCart();
                }}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
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
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {LightModeState === LightMode().type ? (
                <MoonIcon className=" text-white-c h-4 w-4 md:h-6 md:w-6" />
              ) : (
                <SunIcon className="text-white-c h-6 w-6" />
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
            className="border ring-accent-primary ml-4 hover:scale-125"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>

        <Collapse style={{ position: 'absolute', top: '10vh', left: '0' }} className="z-50" open={open}>
          <Card
            className={`w-[95M] p-1 h-full`}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Sidebar />
          </Card>
        </Collapse>
      </div>
      <Typography
        variant="h3"
        className={` text-white-c text-center xl:text-left col-span-1 `}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <IconButton
          className="rounded-full"
          onClick={() => window.history.back()}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </IconButton>
        {Icon != undefined ? <span className="mr-4" dangerouslySetInnerHTML={{ __html: Icon }}></span> : null}
        {SectionName}
      </Typography>
    </div>
  );
}
