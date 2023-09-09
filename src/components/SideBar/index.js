import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Alert,
} from '@material-tailwind/react';
import {
  UserCircleIcon,
  InboxIcon,
  PowerIcon,
} from '@heroicons/react/24/solid';


import TranslatedText from '../../utils/Translation';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/LightActions';
import SPHLOGO from '../../assets/images/SPH Logo.webp';
export default function UCP_SideNavbar() {
  const [openAlert, setOpenAlert] = React.useState(true);
  const LightModeState = useSelector((state) => state.lightMode);

  return (
    <React.Fragment>
      <div className="my-4 flex flex-col justify-center items-center">
        <img src={SPHLOGO} className="Imageshadow w-22 h-12 m-1" />
        <Typography variant="h5">
          <TranslatedText TranslationPath="UCP.SideBar.Title" />
        </Typography>
      </div>
      <List
        className={`${
          LightModeState == LightMode().type
            ? 'tc-whiteTheme_T1 '
            : 'tc-darkTheme_T1 '
        }`}
      >
        <ListItem
          onClick={() => {
            window.location.href = '/UCP/Home';
          }}
        >
          <ListItemPrefix >
            <i className="fa-solid fa-house"></i>
          </ListItemPrefix>
          <TranslatedText TranslationPath="UCP.SideBar.Home" />
        </ListItem>

        <ListItem
          onClick={() => {
            window.location.href = '/UCP/MyOrders';
          }}
        >
          <ListItemPrefix>
            <i className="fa-solid fa-cart-shopping h-5 w-5"></i>
          </ListItemPrefix>
          <TranslatedText TranslationPath="UCP.SideBar.MyOrders" />
          <ListItemSuffix>
            <Chip
              value="5"
              size="sm"
              color="green"
              variant="ghost"
              className={`rounded-full ${
                LightModeState == LightMode().type
                  ? 'tc-whiteTheme_T1 '
                  : 'tc-darkTheme_T1 '
              }`}
            />
          </ListItemSuffix>
        </ListItem>

        <ListItem
          onClick={() => {
            window.location.href = '/UCP/Orders';
          }}
        >
          <ListItemPrefix>
            <i className="fa-solid fa-file-invoice h-5 w-5"></i>
          </ListItemPrefix>
          <TranslatedText TranslationPath="UCP.SideBar.Orders" />
          <ListItemSuffix>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              className={`rounded-full ${
                LightModeState == LightMode().type
                  ? 'tc-whiteTheme_T1 '
                  : 'tc-darkTheme_T1 '
              }`}
            />
          </ListItemSuffix>
        </ListItem>

        <ListItem
          onClick={() => {
            window.location.href = '/UCP/Products';
          }}
        >
          <ListItemPrefix>
            <i className="fa-solid fa-boxes-stacked h-5 w-5"></i>
          </ListItemPrefix>
          <TranslatedText TranslationPath="UCP.SideBar.Products" />
          <ListItemSuffix>
            <Chip
              value="50"
              size="sm"
              color="green"
              variant="ghost"
              className={`rounded-full ${
                LightModeState == LightMode().type
                  ? 'tc-whiteTheme_T1 '
                  : 'tc-darkTheme_T1 '
              }`}
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem
          onClick={() => {
            window.location.href = '/UCP/Inbox';
          }}
        >
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          <TranslatedText TranslationPath="UCP.SideBar.Inbox" />
          <ListItemSuffix>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              className={`rounded-full ${
                LightModeState == LightMode().type
                  ? 'tc-whiteTheme_T1 '
                  : 'tc-darkTheme_T1 '
              }`}
            />
          </ListItemSuffix>
        </ListItem>

        <ListItem
          onClick={() => {
            window.location.href = '/UCP/Accounts';
          }}
        >
          <ListItemPrefix>
            <i className="fa-solid fa-users h-5 w-5"></i>
          </ListItemPrefix>
          <TranslatedText TranslationPath="UCP.SideBar.ManageAccounts" />
        </ListItem>

        <ListItem
          onClick={() => {
            window.location.href = '/UCP/Invoice';
          }}
        >
          <ListItemPrefix>
            <i className="fa-solid fa-file-invoice"></i>
          </ListItemPrefix>
          <TranslatedText TranslationPath="UCP.SideBar.InvoiceEstimate" />
        </ListItem>

        <ListItem
          onClick={() => {
            window.location.href = '/UCP/Profil';
          }}
        >
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          <TranslatedText TranslationPath="UCP.SideBar.Profil" />
        </ListItem>
        <ListItem
          onClick={() => {
            window.location.href = '/';
          }}
        >
          <ListItemPrefix>
            <i className="fa-solid fa-arrow-left"></i>
          </ListItemPrefix>
          <TranslatedText TranslationPath="UCP.SideBar.Back" />
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          <TranslatedText TranslationPath="UCP.SideBar.Logout" />
        </ListItem>
      </List>
      <Alert
        open={openAlert}
        className="mt-auto"
        onClose={() => setOpenAlert(false)}
      >
        <div className=" flex justify-evenly items-center">
          <i className="fa-solid fa-arrows-rotate  h-6 w-6"></i>
          <Typography variant="h6" className="mb-1">
            Available Update
          </Typography>
        </div>

        <Typography variant="small" className="font-normal opacity-80">
          Version 0.0.0.2 is available.
        </Typography>
        <div className="mt-4 flex gap-3">
          <Typography
            as="a"
            href="#"
            variant="small"
            className="font-medium opacity-80"
            onClick={() => setOpenAlert(false)}
          >
            Dismiss
          </Typography>
          <Typography as="a" variant="small" className="font-medium">
            Update now.
          </Typography>
        </div>
      </Alert>
    </React.Fragment>
  );
}
