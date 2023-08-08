
import NavListMenu from "./navListMenu"
import LanguageSelect from './languageListSelect';
import React from "react";
import {
  Typography,
  MenuItem,
} from "@material-tailwind/react";
import {
  HomeIcon,
  PhoneIcon,
  InformationCircleIcon,
  CircleStackIcon
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {LightMode,DarkMode} from "../../redux/actions/LightActions"

import Translate from "../../utils/Translation"
const navListItems = [
    {
      label: <Translate TranslationPath="navbar.Menus.Home"/>,
      icon: HomeIcon,
      route:"/"
    },
    {
      label: <Translate TranslationPath="navbar.Menus.Contact"/>,
      icon: PhoneIcon,
      route:"/Contact"
    },
  ];
  
  export default function NavList() {
    const LightModeState=useSelector(state=>state.lightMode)
    return (
      <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
        
        {navListItems.map(({ label, icon,route }, key) =>
        {
        return (
          <Typography
          key={key}
            as="a"
            href={route}
            variant="small"
            color="blue-gray"
            className={`font-normal ${LightModeState==LightMode().type?"":"TextDarkMode"}`}
          >
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
              {label}
            </MenuItem>
          </Typography>
        )})}
          <NavListMenu />
          <LanguageSelect/>
      </ul>
    );
  }