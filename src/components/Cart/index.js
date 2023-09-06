import React from 'react';
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from '@material-tailwind/react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { CLOSECART } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { disableScroll, enableScroll } from '../../utils/others/Scroll';
import CartCard from '../Card/CartCard';
import { LightMode, DarkMode } from '../../redux/actions/LightActions';

import TranslatedText from '../../utils/Translation';
import { CreateToast } from '../../utils/Toast';
import ReactDOMServer from 'react-dom/server';

export default function Cart() {
  const LightModeState = useSelector((state) => state.lightMode);
  const dispatch = useDispatch();
  const smBreakpoint = 540;
  const [openRight, setOpenRight] = React.useState(false);
  const closeDrawerRight = () => dispatch(CLOSECART());

  const CartStatus = useSelector((state) => state.cartStatus);
  if (CartStatus) {
    disableScroll();
  } else {
    enableScroll();
  }

  const HandleOrder = () => {
    try {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('API Fetch is done!');
        }, 3000);
      });

      CreateToast(
        promise,
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.MyOrders.CreateOrder_Success" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.MyOrders.CreateOrder_Success" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Promise.Pending" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.MyOrders.CreateOrder_Error" />,
        ),
        'promise',
        LightModeState == LightMode().type,
      );
      closeDrawerRight();
    } catch (e) {}
  };
  return (
    <React.Fragment>
      <Drawer
        placement="right"
        open={CartStatus}
        onClose={closeDrawerRight}
        className={`p-2 rounded-l-md enable-scroll ${
          LightModeState == LightMode().type
            ? 'bg-whiteTheme_T3'
            : 'bg-darkTheme_T1'
        }`}
        size={window.innerWidth < smBreakpoint ? 600 : 500}
      >
        {/*==========================S-Header========================== */}
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" className="text-center" color={'blue'}>
            <i className="fa-solid fa-bag-shopping m-4 "></i>
            <TranslatedText TranslationPath="Cart.Labels.Title" />
          </Typography>
          <IconButton variant="text" onClick={closeDrawerRight}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        {/*==========================E-Header========================== */}

        <div className="Total w-full flex justify-between items-center ">
          <Typography variant="h6" className="text-center">
            <i className="fa-solid fa-dollar-sign m-2"></i>
            <TranslatedText TranslationPath="Cart.Labels.Total" /> :
          </Typography>

          <Typography
            variant="paragraph"
            className="text-center  font-bold"
            color="green"
          >
            11000 TND
          </Typography>
        </div>

        <div className="Total  flex flex-col justify-stretch mx-4 my-4 items-stretch ">
          <Button className="flex items-center gap-3" onClick={HandleOrder}>
            <i className="fa-solid fa-cart-shopping"></i>
            <TranslatedText TranslationPath="Cart.Actions.Order" />
          </Button>
        </div>

        <div className=" flex flex-col flex-wrap justify-center items-center gap-1">
          <CartCard />

          <CartCard />
        </div>
      </Drawer>
    </React.Fragment>
  );
}
