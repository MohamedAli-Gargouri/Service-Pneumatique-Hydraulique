import React from 'react';
import { LightMode } from '../../redux/actions/LightActions';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Checkbox,
  Input,
  Button,
} from '@material-tailwind/react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Notify } from '../../utils/Toast/toast';
import { enableScroll, disableScroll } from '../../utils/others/Scroll';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
Products_FilterMenu.propTypes = {
  IsMobile: PropTypes.bool.isRequired,
};
const ListAnimations = {
  hidden: { opacity: 0, y: 0, x: -200 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      delay: 0.5 + index * 0.2,
    },
  }),
};
export default function Products_FilterMenu({ IsMobile }) {
  const LightModeState = useSelector((state) => state.lightMode);
  const { t, i18n } = useTranslation();
  var isLightMode = LightModeState == LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState == LightMode().type;
  }, [LightModeState]);

  const Menus = [
    {
      MenuID: 1,
      MenuName: t('Products.Category'),
      icon: <i className="fa-solid fa-arrow-up-wide-short fa-2xs"></i>,
      MenuItems: [
        {
          MenuItemID: 1,
          MenuItemName: 'Compressors',
        },
        {
          MenuItemID: 2,
          MenuItemName: 'Secheur',
        },
        {
          MenuItemID: 3,
          MenuItemName: 'Tube',
        },
        {
          MenuItemID: 4,
          MenuItemName: 'Cylinder',
        },
      ],
    },
    {
      MenuID: 2,
      MenuName: t('Products.Brand'),
      icon: <i className="fa-solid fa-star fa-2xs"></i>,
      MenuItems: [
        {
          MenuItemID: 1,
          MenuItemName: 'Hertz',
        },
        {
          MenuItemID: 2,
          MenuItemName: 'OMI',
        },
        {
          MenuItemID: 3,
          MenuItemName: 'MM',
        },
        {
          MenuItemID: 4,
          MenuItemName: 'BOSCH',
        },
      ],
    },
    {
      MenuID: 3,
      MenuName: t('Products.SubCategory'),
      icon: <i className="fa-solid fa-arrow-down-short-wide fa-2xs"></i>,
      MenuItems: [
        {
          MenuItemID: 1,
          MenuItemName: 'Compressors,100ML',
        },
        {
          MenuItemID: 2,
          MenuItemName: 'Compressors,200ML',
        },
        {
          MenuItemID: 3,
          MenuItemName: 'Compressors,10cv',
        },
        {
          MenuItemID: 4,
          MenuItemName: 'Compressors,50cv',
        },
      ],
    },
  ];
  const [OpenAccordions, SetAccordions] = React.useState(() => {
    const initialState = Array(Menus.length).fill(false);
    initialState[0] = true;
    initialState[1] = true;
    return initialState;
  });
  const handleOpen = (index) => {
    const OpenAccordionsCopy = [...OpenAccordions];
    OpenAccordionsCopy[index] = !OpenAccordionsCopy[index];
    SetAccordions(OpenAccordionsCopy);
  };

  const HandleApplyFilter = () => {
    Notify.displayNotification(t('Products.ApplyProductFilter_Info'), 'info', isLightMode);
  };

  React.useEffect(() => {
    //Disabling Scroll for Mobile phones to avoid buggy screen.
    const md = 720;
    if (IsMobile) {
      disableScroll();
    }

    return () => {
      if (IsMobile) {
        enableScroll();
      }
    };
  }, []);
  return (
    <div className="background-secondary p-2">
      {Menus.map((Menu, index) => {
        return (
          <motion.div
            key={'MENU' + Menu.MenuID}
            initial="hidden"
            animate={'visible'}
            variants={ListAnimations}
            custom={index}
          >
            <Accordion open={OpenAccordions[index]} icon={Menu.icon}>
              <AccordionHeader onClick={() => handleOpen(index)}>{Menu.MenuName}</AccordionHeader>
              <AccordionBody>
                <List>
                  {Menu.MenuItems.map((MenuItem) => {
                    return (
                      <ListItem key={'MENUITEM' + MenuItem.MenuItemID}>
                        <ListItemPrefix className="mr-3 p-0">
                          <Checkbox
                            key={'MENUITEM_CB' + MenuItem.MenuItemID}
                            ripple={false}
                            className="hover:before:opacity-0"
                            containerProps={{
                              className: 'p-0',
                            }}
                          />
                        </ListItemPrefix>
                        <Typography className="font-medium">{MenuItem.MenuItemName}</Typography>
                      </ListItem>
                    );
                  })}
                </List>
              </AccordionBody>
            </Accordion>
          </motion.div>
        );
      })}

      <div className="mt-4 Price Range flex justify-start w-full flex-wrap">
        <div className="MinPrice my-4 w-full">
          <Input
            type="number"
            label={t('Products.MinPrice')}
            containerProps={{
              style: {
                maxWidth: '400px',
                minWidth: '10px',
              },
            }}
          />
        </div>

        <div className="MaxPrice my-4 w-full">
          <Input
            containerProps={{
              style: {
                maxWidth: '400px',
                minWidth: '10px',
              },
            }}
            type="number"
            label={t('Products.MaxPrice')}
          />
        </div>

        <div className=" my-4 w-full flex justify-center">
          <Button onClick={HandleApplyFilter} className="background-accent-primary flex items-center gap-3">
            <i className="fa-solid fa-filter"></i>
            {t('Products.Actions.ApplyFilter')}
          </Button>
        </div>
      </div>
    </div>
  );
}
