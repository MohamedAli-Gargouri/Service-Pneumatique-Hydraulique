import React from 'react';
import { Collapse, Typography, ListItem, Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react';
import { ChevronDownIcon, Square3Stack3DIcon } from '@heroicons/react/24/outline';
import Fittings_and_accessories from '../../assets/images/productNavMenu/Fittings_and_accessories.webp';
import Tubes from '../../assets/images/productNavMenu/Tubes.webp';
import Distributors_and_accessories from '../../assets/images/productNavMenu/Distributors_and_accessories.webp';
import Filters_and_accessories from '../../assets/images/productNavMenu/Filters_and_accessories.webp';
import Cylinders_and_accessories from '../../assets/images/productNavMenu/Cylinders_and_accessories.webp';
import sensors from '../../assets/images/productNavMenu/sensors.webp';
import compressors from '../../assets/images/productNavMenu/compressors.webp';
import Dryer_tank_and_drain from '../../assets/images/productNavMenu/Dryer_tank_and_drain.webp';
import Wika_pressure_gauge_and_thermometer_regulation from '../../assets/images/productNavMenu/Wika_pressure_gauge_and_thermometer_regulation.webp';
import valves from '../../assets/images/productNavMenu/valves.webp';
import Maxdryer from '../../assets/images/productNavMenu/Maxdryer.webp';
import solenoid_valve from '../../assets/images/productNavMenu/solenoid_valve.webp';
import actuators from '../../assets/images/productNavMenu/actuators.webp';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/light-actions';
import { useTranslation } from 'react-i18next';
import { RootState } from 'types/components/general';

export default function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const { t } = useTranslation();
  var isLightMode = LightModeState === LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState === LightMode().type;
  }, [LightModeState]);
  const navListMenuItems = [
    {
      color: 'pink',
      icon: Fittings_and_accessories,
      title: t('navbar.ProductsMenu.Fittings_and_accessories'),
      description: t('navbar.ProductsMenuDescription.Fittings_and_accessories'),
    },
    {
      color: 'pink',
      icon: Tubes,
      title: t('navbar.ProductsMenu.Tubes'),
      description: t('navbar.ProductsMenuDescription.Tubes'),
    },
    {
      color: 'pink',
      icon: Distributors_and_accessories,
      title: t('navbar.ProductsMenu.Distributors_and_accessories'),
      description: t('navbar.ProductsMenuDescription.Distributors_and_accessories'),
    },
    {
      color: 'pink',
      icon: Filters_and_accessories,
      title: t('navbar.ProductsMenu.Filters_and_accessories'),
      description: t('navbar.ProductsMenuDescription.Filters_and_accessories'),
    },
    {
      color: 'pink',
      icon: Cylinders_and_accessories,
      title: t('navbar.ProductsMenu.Cylinders_and_accessories'),
      description: t('navbar.ProductsMenuDescription.Cylinders_and_accessories'),
    },
    {
      color: 'pink',
      icon: sensors,
      title: t('navbar.ProductsMenu.sensors'),
      description: t('navbar.ProductsMenuDescription.sensors'),
    },
    {
      color: 'pink',
      icon: compressors,
      title: t('navbar.ProductsMenu.compressors'),
      description: t('navbar.ProductsMenuDescription.compressors'),
    },
    {
      color: 'pink',
      icon: Dryer_tank_and_drain,
      title: t('navbar.ProductsMenu.Dryer_tank_and_drain'),
      description: t('navbar.ProductsMenuDescription.Dryer_tank_and_drain'),
    },
    {
      color: 'pink',
      icon: Wika_pressure_gauge_and_thermometer_regulation,
      title: t('navbar.ProductsMenu.Wika_pressure_gauge_and_thermometer_regulation'),
      description: t('navbar.ProductsMenuDescription.Wika_pressure_gauge_and_thermometer_regulation'),
    },
    {
      color: 'pink',
      icon: valves,
      title: t('navbar.ProductsMenu.valves'),
      description: t('navbar.ProductsMenuDescription.valves'),
    },
    {
      color: 'pink',
      icon: Maxdryer,
      title: t('navbar.ProductsMenu.Maxdryer'),
      description: t('navbar.ProductsMenuDescription.Maxdryer'),
    },
    {
      color: 'pink',
      icon: solenoid_valve,
      title: t('navbar.ProductsMenu.solenoid_valve'),
      description: t('navbar.ProductsMenuDescription.solenoid_valve'),
    },
    {
      color: 'pink',
      icon: actuators,
      title: t('navbar.ProductsMenu.actuators'),
      description: t('navbar.ProductsMenuDescription.actuators'),
    },
  ];
  const renderItems = navListMenuItems.map(({ icon, title, description, color }, key) => (
    <a href="products" key={key}>
      <MenuItem
        className="flex items-center gap-3 rounded-lg"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className={` aspect-square h-20 w-20 rounded-lg p-3  bg-gray-500`}>
          <img loading="lazy" className="Imageshadow w-full h-full" src={icon} />
        </div>
        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            className={`flex items-center text-sm`}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {title}
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className={`font-normal`}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {description}
          </Typography>
        </div>
      </MenuItem>
    </a>
  ));

  return (
    <React.Fragment>
      <Menu open={isMenuOpen} handler={setIsMenuOpen} offset={{ mainAxis: 20 }} placement="bottom" allowHover={true}>
        <MenuHandler>
          <ListItem
            className={`flex items-center gap-2 py-2 pr-4 `}
            selected={isMenuOpen || isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Square3Stack3DIcon className={`h-[18px] w-[18px`} />
            {t('navbar.Menus.Products')}
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? 'rotate-180' : ''}`}
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? 'rotate-180' : ''}`}
            />
          </ListItem>
        </MenuHandler>
        <MenuList
          className={`hidden max-w-screen-xl rounded-lg lg:block background-primary text-primary`}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="grid grid-cols-4 gap-y-2">{renderItems}</div>
        </MenuList>
      </Menu>
      <Collapse open={isMobileMenuOpen} className="lg:hidden">
        <div style={{ maxHeight: '34vh', overflow: 'auto' }}>{renderItems}</div>
      </Collapse>
    </React.Fragment>
  );
}
