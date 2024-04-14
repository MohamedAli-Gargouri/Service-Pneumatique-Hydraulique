import NavListMenu from './navListMenu';
import React from 'react';
import { Typography, MenuItem } from '@material-tailwind/react';
import { HomeIcon, PhoneIcon, ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/light-actions';
import { useTranslation } from 'react-i18next';
import { RootState } from 'types/components/general';
export default function NavList() {
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const isLoggedState = useSelector((state: RootState) => state.isLogged);
  const { t } = useTranslation();
  var isLightMode = LightModeState === LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState === LightMode().type;
  }, [LightModeState]);
  const navListItems = [
    {
      value: 'Home',
      label: t('navbar.Menus.Home'),
      icon: HomeIcon,
      route: '/',
    },
    {
      value: 'Contact',
      label: t('navbar.Menus.Contact'),
      icon: PhoneIcon,
      route: '/Contact',
    },
    {
      value: 'Login',
      label: t('navbar.Menus.Login'),
      icon: ArrowRightOnRectangleIcon,
      route: '/login',
    },
    {
      value: 'Register',
      label: t('navbar.Menus.Register'),
      icon: ArrowLeftOnRectangleIcon,
      route: '/register',
    },
  ];
  return (
    <ul className=" flex flex-col lg:flex-row justify-between items-stretch">
      {navListItems.map(({ label, icon, route, value }, key) => {
        if (value === 'Register' || value === 'Login') {
          if (isLoggedState) {
            return null;
          }
        }
        return (
          <Typography
            key={key}
            as="a"
            href={route}
            variant="small"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <MenuItem
              className="flex items-center gap-2"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {React.createElement(icon, { className: 'h-[18px] w-[18px]' })} {label}
            </MenuItem>
          </Typography>
        );
      })}
      <NavListMenu />
    </ul>
  );
}
