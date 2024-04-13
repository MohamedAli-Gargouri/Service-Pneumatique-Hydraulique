import React from 'react';
import { Drawer, Button, Typography, IconButton } from '@material-tailwind/react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { closeCart } from '../../redux/actions/cart-actions';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { disableScroll, enableScroll } from '../../utils/others/scroll';
import CartCard from '../Card/CartCard';
import { LightMode } from '../../redux/actions/light-actions';
import useCart from '../../utils/hooks/useCart';
import { useTranslation } from 'react-i18next';
import { RootState } from 'types/components/general';
export default function Cart() {
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const dispatch = useDispatch();
  const smBreakpoint = 540;
  const [openRight, setOpenRight] = React.useState(false);
  const closeDrawerRight = () => dispatch(closeCart());
  const CartList = useSelector((state: RootState) => state.cartList);
  const { OrderCart, AddProduct, SetQuantity, RemoveProduct } = useCart();
  const CartStatus = useSelector((state: RootState) => state.cartStatus);
  const { t } = useTranslation();
  var isLightMode = LightModeState === LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState === LightMode().type;
  }, [LightModeState]);
  if (CartStatus) {
    disableScroll();
  } else {
    enableScroll();
  }

  const CartTotal = (cartList) => {
    var total = 0;
    cartList.map((product) => {
      total += parseInt(product.ProductPrice, 10) * parseInt(product.ProductQuantity, 10);
    });
    return total;
  };
  return (
    <React.Fragment>
      <Drawer
        overlay={false}
        placement="right"
        open={CartStatus}
        onClose={closeDrawerRight}
        className={`p-2 rounded-l-md enable-scroll background-secondary text-primary `}
        size={window.innerWidth < smBreakpoint ? 600 : 500}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {/*==========================S-Header========================== */}
        <div className="mb-6 flex items-center justify-between">
          <Typography
            variant="h5"
            className="text-center"
            color={'blue'}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <i className="fa-solid fa-bag-shopping m-4 "></i>
            {t('Cart.Labels.Title')}
          </Typography>
          <IconButton
            variant="text"
            onClick={closeDrawerRight}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </IconButton>
        </div>
        {/*==========================E-Header========================== */}

        <div className="Total w-full flex justify-between items-center ">
          <Typography
            variant="h6"
            className="text-center"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <i className="fa-solid fa-dollar-sign m-2"></i>
            {t('Cart.Labels.Total')}:
          </Typography>

          <Typography
            variant="paragraph"
            className="text-center  font-bold"
            color="green"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {CartTotal(CartList)} TND
          </Typography>
        </div>

        <div className="Total  flex flex-col justify-stretch mx-4 my-4 items-stretch ">
          <Button
            className="flex items-center gap-3 text-white-c"
            onClick={() => OrderCart(closeDrawerRight)}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <i className="fa-solid fa-cart-shopping"></i>
            {t('Cart.Actions.Order')}
          </Button>
        </div>

        <div className=" flex flex-col flex-wrap justify-center items-center gap-1">
          {CartList.map((selectedProduct, index) => {
            return (
              <div key={'CART_ITEM' + index}>
                <CartCard
                  ProductID={selectedProduct.ProductID}
                  ProductBrand={selectedProduct.ProductBrand}
                  ProductName={selectedProduct.ProductName}
                  ProductPrice={selectedProduct.ProductPrice}
                  ProductQuantity={selectedProduct.ProductQuantity}
                  ProductImages={selectedProduct.ProductImages}
                />
              </div>
            );
          })}
          {CartList.length === 0 && (
            <Typography
              variant="h6"
              className="text-center font-thin"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {' '}
              {t('UCP.DialogMessages.Cart.NoProducts')}
            </Typography>
          )}
        </div>
      </Drawer>
    </React.Fragment>
  );
}
