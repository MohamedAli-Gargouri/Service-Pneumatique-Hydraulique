import React from "react";
import {
    Collapse,
    Typography,
    ListItem,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Chip,
  } from "@material-tailwind/react";
  import {
    ChevronDownIcon,
    FlagIcon,
    ChatBubbleOvalLeftIcon,
    UsersIcon,
    FolderIcon,
    Square3Stack3DIcon,
    RocketLaunchIcon,
    FaceSmileIcon,
    PuzzlePieceIcon,
    GiftIcon,
    CircleStackIcon
  } from "@heroicons/react/24/outline";
  import Translate from "../../utils/Translation"
  import  Fittings_and_accessories from "../../assets/images/productNavMenu/Fittings_and_accessories.png"
  import  Tubes from "../../assets/images/productNavMenu/Tubes.png"
  import  Distributors_and_accessories from "../../assets/images/productNavMenu/Distributors_and_accessories.png"
  import  Filters_and_accessories from "../../assets/images/productNavMenu/Filters_and_accessories.png"
  import  Cylinders_and_accessories from "../../assets/images/productNavMenu/Cylinders_and_accessories.png"
  import  sensors from "../../assets/images/productNavMenu/sensors.png"
  import  compressors from "../../assets/images/productNavMenu/compressors.png"
  import  Dryer_tank_and_drain from "../../assets/images/productNavMenu/Dryer_tank_and_drain.png"
  import  Wika_pressure_gauge_and_thermometer_regulation from "../../assets/images/productNavMenu/Wika_pressure_gauge_and_thermometer_regulation.png"
  import  valves from "../../assets/images/productNavMenu/valves.png"
  import  Maxdryer from "../../assets/images/productNavMenu/Maxdryer.png"
  import  solenoid_valve from "../../assets/images/productNavMenu/solenoid_valve.png"
  import  actuators from "../../assets/images/productNavMenu/actuators.png"

  import { useSelector } from "react-redux/es/hooks/useSelector";
import {LightMode,DarkMode} from "../../redux/actions/LightActions"

  const colors = {
    blue: "bg-blue-50 text-blue-500",
    orange: "bg-orange-50 text-orange-500",
    green: "bg-green-50 text-green-500",
    "blue-gray": "bg-blue-gray-50 text-blue-gray-500",
    purple: "bg-purple-50 text-purple-500",
    teal: "bg-teal-50 text-teal-500",
    cyan: "bg-cyan-50 text-cyan-500",
    pink: "bg-pink-50 text-pink-500",
    red: "bg-red-50 text-red-500",
  };



const navListMenuItems = [
    {
      color: "pink",
      icon: Fittings_and_accessories,
      title: <Translate TranslationPath="navbar.ProductsMenu.Fittings_and_accessories"/>,
      description:<Translate TranslationPath="navbar.ProductsMenuDescription.Fittings_and_accessories"/>
    },
    {
      color: "pink",
      icon: Tubes,
      title: <Translate TranslationPath="navbar.ProductsMenu.Tubes"/>,
      description:<Translate TranslationPath="navbar.ProductsMenuDescription.Tubes"/>
    },
    {
      color: "pink",
      icon: Distributors_and_accessories,
      title: <Translate TranslationPath="navbar.ProductsMenu.Distributors_and_accessories"/>,
      description:<Translate TranslationPath="navbar.ProductsMenuDescription.Distributors_and_accessories"/>
    },
    {
      color: "pink",
      icon: Filters_and_accessories,
      title: <Translate TranslationPath="navbar.ProductsMenu.Filters_and_accessories"/>,
      description:<Translate TranslationPath="navbar.ProductsMenuDescription.Filters_and_accessories"/>
    },
    {
      color: "pink",
      icon: Cylinders_and_accessories,
      title: <Translate TranslationPath="navbar.ProductsMenu.Cylinders_and_accessories"/>,
      description:<Translate TranslationPath="navbar.ProductsMenuDescription.Cylinders_and_accessories"/>
    },
    {
      color: "pink",
      icon: sensors,
      title: <Translate TranslationPath="navbar.ProductsMenu.sensors"/>,
      description:<Translate TranslationPath="navbar.ProductsMenuDescription.sensors"/>
    },
    {
      color: "pink",
      icon: compressors,
      title: <Translate TranslationPath="navbar.ProductsMenu.compressors"/>,
      description:<Translate TranslationPath="navbar.ProductsMenuDescription.compressors"/>
    },
    {
      color: "pink",
      icon: Dryer_tank_and_drain,
      title: <Translate TranslationPath="navbar.ProductsMenu.Dryer_tank_and_drain"/>,
      description:<Translate TranslationPath="navbar.ProductsMenuDescription.Dryer_tank_and_drain"/>
    },
    {
      color: "pink",
      icon: Wika_pressure_gauge_and_thermometer_regulation,
      title: <Translate TranslationPath="navbar.ProductsMenu.Wika_pressure_gauge_and_thermometer_regulation"/>,
      description:<Translate TranslationPath="navbar.ProductsMenuDescription.Wika_pressure_gauge_and_thermometer_regulation"/>
    },
    {
      color: "pink",
      icon: valves,
      title: <Translate TranslationPath="navbar.ProductsMenu.valves"/>,
      description:<Translate TranslationPath="navbar.ProductsMenuDescription.valves"/>
    },
    {
      color: "pink",
      icon: Maxdryer,
      title: <Translate TranslationPath="navbar.ProductsMenu.Maxdryer"/>,
      description:<Translate TranslationPath="navbar.ProductsMenuDescription.Maxdryer"/>
    },
    {
      color: "pink",
      icon: solenoid_valve,
      title: <Translate TranslationPath="navbar.ProductsMenu.solenoid_valve"/>,
      description:<Translate TranslationPath="navbar.ProductsMenuDescription.solenoid_valve"/>
    },
    {
      color: "pink",
      icon: actuators,
      title: <Translate TranslationPath="navbar.ProductsMenu.actuators"/>,
      description:<Translate TranslationPath="navbar.ProductsMenuDescription.actuators"/>
    },

  ];
   
  export default function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const LightModeState=useSelector(state=>state.lightMode)
    const renderItems = navListMenuItems.map(
      ({ icon, title, description, color }, key) => (
        <a href="#" key={key}>
          <MenuItem className="flex items-center gap-3 rounded-lg">
            <div className={`rounded-lg p-3 ${colors[color]}`}>
              <div>
              <img  strokeWidth="2" className="h-10 w-20"src={icon}/>
              </div>
              
            </div>
            <div>
              <Typography
                variant="h6"
                color="blue-gray"
                className={`flex items-center text-sm ${LightModeState==LightMode().type?"":"TextDarkMode"}`}
              >
                {title}
              </Typography>
              <Typography variant="small" color="gray" className={`font-normal ${LightModeState==LightMode().type?"":"TextDarkMode"}`}>
                {description}
              </Typography>
            </div>
          </MenuItem>
        </a>
      )
    );
   
    return (
      <React.Fragment>
        <Menu
          open={isMenuOpen}
          handler={setIsMenuOpen}
          offset={{ mainAxis: 20 }}
          placement="bottom"
          allowHover={true}
        >
          <MenuHandler>
            <Typography as="a" variant="small" href="/products" className={`font-normal ${LightModeState==LightMode().type?"":"TextDarkMode "}`}>
              <ListItem
                className={`flex items-center gap-2 py-2 pr-4 `}
                selected={isMenuOpen || isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((cur) => !cur)}
              >
                <Square3Stack3DIcon color={`${LightModeState==LightMode().type?"#263238":"white "}`} className={`h-[18px] w-[18px color`} />
                <Translate  TranslationPath="navbar.Menus.Products" className={` text-cyan-600`}/>
                <ChevronDownIcon
                color={`${LightModeState==LightMode().type?"#263238":"white "}`}
                  strokeWidth={2.5}
                  className={`hidden h-3 w-3 transition-transform lg:block ${
                    isMenuOpen ? "rotate-180" : ""
                  }`}
                />
                <ChevronDownIcon
                color={`${LightModeState==LightMode().type?"#263238":"white "}`}
                  strokeWidth={2.5}
                  className={`block h-3 w-3 transition-transform lg:hidden ${
                    isMobileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </ListItem>
            </Typography>
          </MenuHandler>
          <MenuList className={`hidden max-w-screen-xl rounded-xl lg:block ${LightModeState==LightMode().type?"":"ContainerDarkMode "}`}>
            <ul className="grid grid-cols-4 gap-y-2">{renderItems}</ul>
          </MenuList>
        </Menu>
        <div className={`block lg:hidden  ${LightModeState==LightMode().type?"":"ContainerDarkMode "}`}>
          <Collapse open={isMobileMenuOpen}>
          <div style={{ maxHeight: '350px', overflow: 'auto' }}>{renderItems}</div></Collapse>
        </div>
      </React.Fragment>
    );
  }