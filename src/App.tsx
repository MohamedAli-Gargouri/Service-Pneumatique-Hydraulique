import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login/login';
import Contact from './pages/contact';
import Products from './pages/products/products';
import PreviewProductComponent from './pages/products/preview';
import { LightMode } from './redux/actions/light-actions';
import Dev from './pages/test';
import Cart from './components/Cart';
import Loading from './pages/loading';
import UCP_Profile from './pages/UCP/Profile';
import UCP_Orders from './pages/UCP/Orders';
import UCP_Order from './pages/UCP/Order';
import UCP_EditProduct from './pages/UCP/EditProduct';
import UCP_Products from './pages/UCP/Products';
import UCP_AddProduct from './pages/UCP/AddProduct';
import UCP_MyOrders from './pages/UCP/MyOrders';
import UCP_Accounts from './pages/UCP/Accounts';
import UCP_Inbox from './pages/UCP/Inbox';
import UCP_Invoice from './pages/UCP/Invoice';
import UCP_Home from './pages/UCP/Home';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { IsNotExpiredAccessToken } from './services/auth';
import React from 'react';
import { useNotify } from './utils/hooks/useNotify';
import { RESET_ALL } from './redux/actions/GlobalActions';
//import 'devextreme/dist/css/dx.fluent.blue.light.compact.css'; // or dx.dark.css for dark theme
//import 'devextreme/dist/css/dx.material.orange.dark.css';
import { refreshTheme } from 'devextreme/viz/themes';
import themes from 'devextreme/ui/themes';
import { useTranslation } from 'react-i18next';
import { RootState } from './redux/reducers';
export default function App() {
  const isLoggedState = useSelector((state: RootState) => state.isLogged);
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const AccessToken = useSelector((state: RootState) => state.userAccessToken);
  const { displayNotification } = useNotify();
  const dispatch = useDispatch();
  const isLightMode = LightModeState === LightMode().type;
  const { t, i18n } = useTranslation();
  React.useEffect(() => {
    if (isLightMode) {
      themes.current('material.light');
      refreshTheme();
    } else {
      themes.current('material.dark');
      refreshTheme();
    }
  }, [isLightMode]);

  const handleAccessTokenVerifying = async () => {
    try {
      const result = await IsNotExpiredAccessToken(AccessToken);
      //Test if the token expired
      if (result.data.tokenExpired || result.data == '') {
        throw new Error('UNVALID_ACCESS_TOKEN');
      }
    } catch (error: any) {
      //Access Token expired.
      if (error == 'UNVALID_ACCESS_TOKEN') {
        displayNotification(t('UCP.DialogMessages.Session.SessionExpired'), 'error');
      }
      if (error.code == 'ERR_NETWORK') {
        displayNotification(t('UCP.DialogMessages.Connection.ConnectionLost'), 'error');
      }
      dispatch(RESET_ALL());
    }
  };

  React.useEffect(() => {
    const currentLocation = window.location.href;
    const isLoginPage = currentLocation.includes('/Login') || currentLocation.includes('/login');
    const isRegisterPage = currentLocation.includes('/Register') || currentLocation.includes('/reegister');
    if (isLoggedState) {
      //checking if the access token is valid or not if the page is not login or register
      if (!isLoginPage && !isRegisterPage) {
        handleAccessTokenVerifying();
      }
    }
  }, []);

  // Define your routes in an array
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/Home', element: <Home /> },
    { path: '/Login', element: <Login /> },
    { path: '/Register', element: <Register /> },
    { path: '/Contact', element: <Contact /> },
    { path: '/Products', element: <Products /> },
    { path: '/ProductDetails', element: <PreviewProductComponent /> },
    { path: '/UCP/Profil', element: <UCP_Profile /> },
    { path: '/UCP/Orders', element: <UCP_Orders /> },
    { path: '/UCP/MyOrders', element: <UCP_MyOrders /> },
    { path: '/UCP/Order', element: <UCP_Order /> },
    { path: '/UCP/Product', element: <UCP_EditProduct /> },
    { path: '/UCP/Products', element: <UCP_Products /> },
    { path: '/UCP/AddProduct', element: <UCP_AddProduct /> },
    { path: '/UCP/Accounts', element: <UCP_Accounts /> },
    { path: '/UCP/Inbox', element: <UCP_Inbox /> },
    { path: '/UCP/Invoice', element: <UCP_Invoice /> },
    { path: '/UCP/Home', element: <UCP_Home /> },
    { path: '/Dev', element: <Dev /> },
    { path: '/Loading', element: <Loading /> },
  ];

  return (
    <>
      <ToastContainer closeOnClick rtl={false} pauseOnFocusLoss draggable />
      <Cart />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        {/*<Route path='*' key={routes.length+1}  element={<NotFound/>} />*/}
      </Routes>
    </>
  );
}
