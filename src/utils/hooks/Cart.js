import React from 'react';
import {
  addProduct,
  removeProduct,
  setProductQuantity,
} from '../../redux/actions/MyCartActions';
import { useDispatch } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { Notify } from '../../utils/Toast/toast';
import TranslatedText from '../../utils/Translation';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/LightActions';
//This hook handle the add, remove and quantity update for the cart//
const useCart = () => {
  const LightModeState = useSelector((state) => state.lightMode);
  const dispatch = useDispatch();
  const CartList = useSelector((state) => state.cartList);
  const RemoveProduct = (ProductID) => {
    dispatch(removeProduct(ProductID));

    Notify.displayNotification(
      ReactDOMServer.renderToStaticMarkup(
        <TranslatedText TranslationPath="UCP.DialogMessages.Cart.RemoveProduct" />,
      ),
      'info',
      LightModeState == LightMode().type,
    );
  };
  const SetQuantity = (ProductID, NewQuantity) => {
    if (!isNaN(parseInt(NewQuantity))) {
      if (NewQuantity >= 1 && NewQuantity <= 100) {
        dispatch(setProductQuantity(ProductID, NewQuantity));
      } else {
        Notify.displayNotification(
          ReactDOMServer.renderToStaticMarkup(
            <TranslatedText TranslationPath="UCP.DialogMessages.Cart.QuantityError" />,
          ),
          'info',
          LightModeState == LightMode().type,
        );
      }
    } else {
      if (NewQuantity == '') {
        dispatch(setProductQuantity(ProductID, 1));
      }
    }
  };

  const AddProduct = (Product) => {
    dispatch(addProduct(Product));
    Notify.displayNotification(
      ReactDOMServer.renderToStaticMarkup(
        <TranslatedText TranslationPath="UCP.DialogMessages.Cart.AddProduct" />,
      ),
      'info',
      LightModeState == LightMode().type,
    );
  };

  const OrderCart = (closeDrawerRight) => {
    if (CartList.length > 0) {
      try {
        const promise = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('API Fetch is done!');
          }, 3000);
        });

        Notify.displayPromiseNotification(
          promise,
          [],
          [],
          LightModeState == LightMode().type,
        );
        closeDrawerRight();
      } catch (e) {
        /*Catch logic here */
      }
    } else {
      Notify.displayNotification(
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Cart.NoProducts" />,
        ),
        'info',
        LightModeState == LightMode().type,
      );
    }
  };

  return { OrderCart, AddProduct, SetQuantity, RemoveProduct };
};

export default useCart;
