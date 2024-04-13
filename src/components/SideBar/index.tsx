import React from 'react';
import { Typography, List, ListItem, ListItemPrefix, ListItemSuffix, Chip, Alert } from '@material-tailwind/react';
import { UserCircleIcon, InboxIcon, PowerIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/light-actions';
import SPHLOGO from '../../assets/images/SPH Logo.webp';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { RootState } from 'types/components/general';
const ListAnimations = {
  hidden: { opacity: 0, y: 0, x: -100, scale: 0.5 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      delay: 0.1 + index * 0.05,
    },
  }),
};

export default function UCP_SideNavbar() {
  const [openAlert, setOpenAlert] = React.useState(true);
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const { t } = useTranslation();
  var isLightMode = LightModeState === LightMode().type;
  const menuList = [
    {
      id: 1,
      icon: <i className="fa-solid fa-house h-5 w-5"></i>,
      name: t('UCP.SideBar.Home'),
      url: '/UCP/Home',
      chipValue: 0,
    },
    {
      id: 2,
      icon: <i className="fa-solid fa-cart-shopping h-5 w-5"></i>,
      name: t('UCP.SideBar.MyOrders'),
      url: '/UCP/MyOrders',
      chipValue: 0,
    },
    {
      id: 3,
      icon: <i className="fa-solid fa-file-invoice h-5 w-5"></i>,
      name: t('UCP.SideBar.Orders'),
      url: '/UCP/Orders',
      chipValue: 0,
    },
    {
      id: 4,
      icon: <i className="fa-solid fa-boxes-stacked h-5 w-5"></i>,
      name: t('UCP.SideBar.Products'),
      url: '/UCP/Products',
      chipValue: 0,
    },
    {
      id: 5,
      icon: <InboxIcon className="h-5 w-5" />,
      name: t('UCP.SideBar.Inbox'),
      url: '/UCP/Inbox',
      chipValue: 0,
    },
    {
      id: 6,
      icon: <i className="fa-solid fa-users h-5 w-5"></i>,
      name: t('UCP.SideBar.ManageAccounts'),
      url: '/UCP/Accounts',
      chipValue: 0,
    },
    {
      id: 7,
      icon: <i className="fa-solid fa-file-invoice"></i>,
      name: t('UCP.SideBar.InvoiceEstimate'),
      url: '/UCP/Invoice',
      chipValue: 0,
    },
    {
      id: 8,
      icon: <UserCircleIcon className="h-5 w-5" />,
      name: t('UCP.SideBar.Profil'),
      url: '/UCP/Profil',
      chipValue: 0,
    },
    {
      id: 9,
      icon: <i className="fa-solid fa-arrow-left"></i>,
      name: t('UCP.SideBar.Back'),
      url: '/',
      chipValue: 0,
    },
    {
      id: 10,
      icon: <PowerIcon className="h-5 w-5" />,
      name: t('UCP.SideBar.Logout'),
      url: '/login',
      chipValue: 0,
    },
  ];
  return (
    <React.Fragment>
      <div className="my-4 flex flex-col justify-center items-center">
        <img loading="lazy" src={SPHLOGO} className="Imageshadow w-22 h-12 m-1" />
        <Typography
          variant="h5"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {t('UCP.SideBar.Title')}
        </Typography>
      </div>
      <List placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        {menuList.map((menuItem, index) => {
          return (
            <motion.div key={menuItem.id} initial="hidden" animate={'visible'} variants={ListAnimations} custom={index}>
              <ListItem
                key={menuItem.id}
                onClick={() => {
                  window.location.href = menuItem.url;
                }}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ListItemPrefix
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {menuItem.icon}
                </ListItemPrefix>
                {menuItem.name}
                <ListItemSuffix
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {menuItem.chipValue > 0 ? (
                    <Chip
                      value={menuItem.chipValue}
                      size="sm"
                      color="green"
                      variant="ghost"
                      className={`rounded-full`}
                    />
                  ) : null}
                </ListItemSuffix>
              </ListItem>
            </motion.div>
          );
        })}
      </List>
      <Alert open={openAlert} className="mt-auto background-accent-primary" onClose={() => setOpenAlert(false)}>
        <div className=" flex justify-evenly items-center">
          <i className="fa-solid fa-arrows-rotate  h-6 w-6"></i>
          <Typography
            variant="h6"
            className="mb-1"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Available Update
          </Typography>
        </div>

        <Typography
          variant="small"
          className="font-normal opacity-80"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Version 0.0.0.2 is available.
        </Typography>
        <div className="mt-4 flex gap-3">
          <Typography
            as="a"
            href="#"
            variant="small"
            className="font-medium opacity-80"
            onClick={() => setOpenAlert(false)}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Dismiss
          </Typography>
          <Typography
            as="a"
            variant="small"
            className="font-medium"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Update now.
          </Typography>
        </div>
      </Alert>
    </React.Fragment>
  );
}
