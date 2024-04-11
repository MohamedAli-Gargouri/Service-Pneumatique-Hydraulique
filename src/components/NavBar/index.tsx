import React from 'react';
import SPHlogo from '../../assets/images/SPH Logo.webp';
import { Navbar, Collapse, Typography, IconButton, Badge } from '@material-tailwind/react';
import { Bars2Icon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import LanguageSelect from './languageListSelect';
import NavList from './navList';
import ProfileMenu from './profileMenu';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode, DarkMode } from 'redux/actions/light-actions';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './navbar.css';
import { RootState } from 'redux/reducers';
import { openCart } from 'redux/actions/cart-actions';
const Animations = {
  hidden: {
    opacity: 0,
    y: 0,
    x: 0,
    scale: 0.7,
    transition: {
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
};
export default function ComplexNavbar() {
  //=======Setting Mobile View-start=================//
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    const setNavOpen = () => {
      window.innerWidth >= 960 && setIsNavOpen(false);
    };
    window.addEventListener('resize', setNavOpen);

    return () => window.removeEventListener('resize', setNavOpen);
  }, []);

  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const CartList = useSelector((state: RootState) => state.cartList);
  const isLoggedState = useSelector((state: RootState) => state.isLogged);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  var isLightMode = LightModeState == LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState == LightMode().type;
  }, [LightModeState]);
  const toggleCart = () => {
    dispatch(openCart());
  };
  const HandleLightModeSwitch = () => {
    if (isLightMode) {
      dispatch(DarkMode());
    }
    if (LightModeState == DarkMode().type) {
      dispatch(LightMode());
    }
  };
  const [isNavbarVisible, setIsNavbarVisible] = React.useState(true);

  React.useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = debounce(() => {
      const currentScrollPos = window.pageYOffset;
      const scrollDown = currentScrollPos > prevScrollPos;

      if (scrollDown && isNavbarVisible) {
        setIsNavbarVisible(false);
      } else if (!scrollDown && !isNavbarVisible) {
        setIsNavbarVisible(true);
      }

      prevScrollPos = currentScrollPos;
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isNavbarVisible]);

  //=========Setting Dark and light mode states-end========//
  return (
    <header id="navbar" className=" z-50 fixed flex justify-center w-full items-center p-2 animate-NavSlideDown">
      <motion.div initial={'visible'} variants={Animations} animate={isNavbarVisible ? 'visible' : 'hidden'}>
        <Navbar
          className={`background-secondary lg:rounded-full`}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="flex items-center justify-between gap-1 ">
            <img
              loading="lazy"
              onClick={() => (window.location.href = './')}
              src={SPHlogo}
              alt="SPH Logo"
              className=" max-w-xs max-h-10 rounded-full animate-LogoRotate hover:scale-95"
            />
            <Typography className={`hidden xl:block mr-4 ml-4 cursor-pointer py-1.5 lg:ml-2`}>
              {t('navbar.companyname')}
            </Typography>

            <div className="hidden lg:block">
              <NavList />
            </div>

            <IconButton
              size="sm"
              variant="text"
              onClick={() => toggleIsNavOpen()}
              className={`ml-auto mr-2 lg:hidden text-current`}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Bars2Icon className="h-6 w-6" />
            </IconButton>

            <IconButton
              size="sm"
              variant="text"
              className="rounded-full"
              onClick={() => HandleLightModeSwitch()}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {isLightMode ? <MoonIcon className="h-4 w-4 md:h-6 md:w-6" /> : <SunIcon className="h-6 w-6" />}
            </IconButton>

            <LanguageSelect />

            {isLoggedState && (
              <Badge className="background-accent-primary" content={CartList.length} placement="top-end">
                <IconButton
                  variant="text"
                  size="sm"
                  className=" rounded-full"
                  onClick={() => toggleCart()}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <i className="fa-solid fa-bag-shopping"></i>
                </IconButton>
              </Badge>
            )}

            {isLoggedState && <ProfileMenu />}
          </div>
          <Collapse open={isNavOpen}>
            <NavList />
          </Collapse>
        </Navbar>
      </motion.div>
    </header>
  );
}
