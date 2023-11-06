import React from 'react';
import SPHlogo from '../../assets/images/SPH Logo.webp';
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Badge,
} from '@material-tailwind/react';
import { Bars2Icon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import LanguageSelect from './languageListSelect';
import NavList from './navList';
import ProfileMenu from './profileMenu';
import TranslatedText from '../../utils/Translation';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode, DarkMode } from '../../redux/actions/LightActions';
import { openCart } from '../../redux/actions/MyCartActions';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

Badge.propTypes = {
  placement: PropTypes.string.isRequired,
};
export default function ComplexNavbar() {
  //=======Setting Mobile View-start=================//
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    const setNavOpen=()=>
    {
      window.innerWidth >= 960 && setIsNavOpen(false)
    }
    window.addEventListener(
      'resize',
      setNavOpen,
    );

    return(()=>window.removeEventListener("resize",setNavOpen))
  }, []);
  //=======Setting Mobile View-end=================//

  //=========Setting Dark and light mode states-start========//
  const LightModeState = useSelector((state) => state.lightMode);
  const CartList=useSelector((state)=>state.cartList)
  const isLoggedState=useSelector((state)=>state.isLogged)
  const dispatch = useDispatch();

  const toggleCart = () => {
    dispatch(openCart());
  };
  const HandleLightModeSwitch = () => {
    if (LightModeState == LightMode().type) {
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
    },100)
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isNavbarVisible]);

  //=========Setting Dark and light mode states-end========//
  return (
    <header
      id="navbar"
      className="fixed flex justify-center items-center top-0 left-0 w-screen z-50 mt-4 animate-NavSlideDown"
    >
      <Navbar
        className={` backdrop-blur-md  lg:rounded-full mx-4 ${
          LightModeState == LightMode().type
            ? 'bg-whiteTheme_T2 tc-whiteTheme_T1'
            : 'bg-darkTheme_T2 tc-darkTheme_T1'
        }
        ${
          isNavbarVisible
          ? 'animate-NavSlideDown'
          : 'animate-NavSlideUp'
        }
        `}
      >
        <div className="flex items-center justify-center gap-1 ">
          <img loading="lazy"
            onClick={()=>window.location.href="./"}
            src={SPHlogo}
            alt="SPH Logo"
            className=" max-w-xs max-h-10 rounded-full animate-LogoRotate hover:scale-95"
          />
          <Typography
            
            className={`hidden xl:block mr-4 ml-4 cursor-pointer py-1.5 lg:ml-2`}
          >
            <TranslatedText TranslationPath="navbar.companyname" />
          </Typography>

          <div className="hidden lg:block">
            <NavList />
          </div>

          <IconButton
            size="sm"
            variant="text"
            onClick={() => toggleIsNavOpen()}
            className={`ml-auto mr-2 lg:hidden text-current`}
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>

          <IconButton
            size="sm"
            variant="text"
            className="rounded-full"
            onClick={() => HandleLightModeSwitch()}
          >
            {LightModeState == LightMode().type ? (
              <MoonIcon className="h-4 w-4 md:h-6 md:w-6" />
            ) : (
              <SunIcon className="h-6 w-6" />
            )}
          </IconButton>

          <LanguageSelect />

          {isLoggedState&&<Badge content={CartList.length}  placement="top-end">
            <IconButton
              variant="text"
              size="sm"
              className="rounded-full"
              onClick={() => toggleCart()}
            >
              <i className="fa-solid fa-bag-shopping"></i>
            </IconButton>
          </Badge>}

          {isLoggedState&&<div>
            <ProfileMenu />
          </div>}
        </div>
        <Collapse
          open={isNavOpen}
          className={`h-[80vh] w-[80vw] overflow-scroll`}
        >
          <NavList />
        </Collapse>
      </Navbar>
    </header>
  );
}
