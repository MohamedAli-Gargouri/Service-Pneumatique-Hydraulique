import React from 'react';
import { addProduct, removeProduct, setProductQuantity } from '../../redux/actions/cart-actions';
import { useDispatch } from 'react-redux';
import { useNotify } from './useNotify';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from 'types/components/general';
import { useTranslation } from 'react-i18next';
//This hook handle the add, remove and quantity update for the cart//
const useCart = () => {
  const { displayNotification, displayPromiseNotification } = useNotify();
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const CartList = useSelector((state: RootState) => state.cartList);
  const RemoveProduct = (ProductID: any) => {
    dispatch(removeProduct(ProductID));
    displayNotification(t('UCP.DialogMessages.Cart.RemoveProduct'), 'info');
  };
  const SetQuantity = (ProductID: number | string, NewQuantity: string) => {
    if (NewQuantity != '') {
      if (parseInt(NewQuantity) >= 1 && parseInt(NewQuantity) <= 100) {
        dispatch(setProductQuantity(ProductID, NewQuantity));
      } else {
        displayNotification(t('UCP.DialogMessages.Cart.QuantityError'), 'info');
      }
    } else {
      if (NewQuantity == '') {
        dispatch(setProductQuantity(ProductID, 1));
      }
    }
  };

  const AddProduct = (Product: any) => {
    dispatch(addProduct(Product));
    displayNotification(t('UCP.DialogMessages.Cart.AddProduct'), 'info');
  };

  const OrderCart = (closeDrawerRight: any) => {
    if (CartList.length > 0) {
      try {
        const promise = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('API Fetch is done!');
          }, 3000);
        });

        displayPromiseNotification(promise, [], []);
        closeDrawerRight();
      } catch (e) {
        /*Catch logic here */
      }
    } else {
      displayNotification(t('UCP.DialogMessages.Cart.NoProducts'), 'info');
    }
  };

  return { OrderCart, AddProduct, SetQuantity, RemoveProduct };
};

export default useCart;
