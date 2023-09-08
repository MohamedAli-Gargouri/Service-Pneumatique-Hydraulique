import React, { useState, useEffect } from 'react';
import { addProduct,removeProduct,setProductQuantity } from '../../redux/actions/MyCartActions';
import { useDispatch } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { CreateToast } from '../../utils/Toast';
import TranslatedText from '../../utils/Translation';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode, DarkMode } from '../../redux/actions/LightActions';
//This hook handle the add, remove and quantity update for the cart//
const useCart = () => {
    const LightModeState = useSelector((state) => state.lightMode);
    const dispatch=useDispatch()
    const CartList=useSelector((state)=>state.cartList)
    const RemoveProduct=(ProductID)=>
{
  dispatch(removeProduct(ProductID))

  CreateToast(
    null,
    ReactDOMServer.renderToStaticMarkup(
      <TranslatedText TranslationPath="UCP.DialogMessages.Cart.RemoveProduct" />,
    ),
    ReactDOMServer.renderToStaticMarkup(
      <TranslatedText TranslationPath="UCP.DialogMessages.Cart.RemoveProduct" />,
    ),
    ReactDOMServer.renderToStaticMarkup(
      <TranslatedText TranslationPath="UCP.DialogMessages.Cart.RemoveProduct" />,
    ),
    ReactDOMServer.renderToStaticMarkup(
      <TranslatedText TranslationPath="UCP.DialogMessages.Cart.RemoveProduct" />,
    ),
    'info',
    LightModeState == LightMode().type,
  );
}
const SetQuantity=(ProductID,NewQuantity)=>
{
  if(!isNaN(parseInt(NewQuantity)))
  {
    if(NewQuantity>=1&&NewQuantity<=100)
    {
        dispatch(setProductQuantity(ProductID,NewQuantity))  
    }
    else
    {
      CreateToast(
        null,
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Cart.QuantityError" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Cart.QuantityError" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Cart.QuantityError" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Cart.QuantityError" />,
        ),
        'info',
        LightModeState == LightMode().type,
      );
    }
  }
  else
  {
    if(NewQuantity=="")
    {
      dispatch(setProductQuantity(ProductID,1))
    }
  }

  
}

const AddProduct=(Product)=>
{
  dispatch(addProduct(Product))
      CreateToast(
        null,
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Cart.AddProduct" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Cart.AddProduct" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Cart.AddProduct" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Cart.AddProduct" />,
        ),
        'info',
        LightModeState == LightMode().type,
      );
}

const OrderCart = (closeDrawerRight) => {

    if(CartList.length>0)
    {
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
    }else
    {
      CreateToast(
        null,
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Cart.NoProducts" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Cart.NoProducts" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Cart.NoProducts" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Cart.NoProducts" />,
        ),
        'info',
        LightModeState == LightMode().type,
      );
    }


  };


return {OrderCart,AddProduct,SetQuantity,RemoveProduct}
};

export default useCart;
