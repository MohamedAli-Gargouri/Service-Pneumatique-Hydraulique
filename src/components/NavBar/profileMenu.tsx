import React from 'react';
import { Typography, Button, Menu, MenuHandler, MenuList, MenuItem, Avatar } from '@material-tailwind/react';
import { ChevronDownIcon, InboxArrowDownIcon, PowerIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/light-actions';
import { useDispatch } from 'react-redux';
import { RESET_ALL } from '../../redux/actions/GlobalActions';

import { useTranslation } from 'react-i18next';
import { RootState } from 'redux/reducers';
import { useNotify } from 'utils/hooks/useNotify';
const profileMenuItems = [
  {
    value: 'Control_Center',
    label: 'Control Center',
    icon: InboxArrowDownIcon,
    href: '/UCP/Home',
  },
  {
    value: 'Sign_Out',
    label: 'Sign Out',
    icon: PowerIcon,
    href: '/login',
  },
];

export default function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const dispatch = useDispatch();
  const { displayNotification, displayPromiseNotification } = useNotify();
  const { t, i18n } = useTranslation();
  var isLightMode = LightModeState == LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState == LightMode().type;
  }, [LightModeState]);
  const closeMenu = () => setIsMenuOpen(false);

  const HandleMenuItemClick = (value, path) => {
    closeMenu;
    if (value == 'Sign_Out') {
      dispatch(RESET_ALL());
      displayNotification(t('UCP.DialogMessages.Session.Logout'), 'info');
    }
    if (value == 'Control_Center') {
      //*ControlCenterLogic*//
      window.location.href = path;
    }
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom">
      <MenuHandler>
        <Button
          variant="text"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-blue-500 "
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
          />
        </Button>
      </MenuHandler>
      <MenuList
        className={`p-1 background-secondary text-primary`}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {profileMenuItems.map(({ label, icon, href, value }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                HandleMenuItemClick(value, href);
              }}
              className={`flex items-center gap-2 rounded`}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {React.createElement(icon, {
                className: `h-4 w-4}`,
                strokeWidth: 2,
                style: { color: `${isLastItem ? 'red' : 'inherit'}` },
              })}
              <Typography as="small" variant="small" className={`font-normal`} color={isLastItem ? 'red' : 'inherit'}>
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
