import { Typography, IconButton } from '@material-tailwind/react';
import './ProductCard.css';
import React from 'react';
import QuantityInput from '../Input/Quantity';
import { useSelector } from 'react-redux';
import useCart from '../../utils/hooks/useCart';
import PropTypes from 'prop-types';
import { RootState } from 'types/components/general';
CartCard.propTypes = {
  ProductID: PropTypes.number.isRequired,
  ProductImages: PropTypes.array.isRequired,
  ProductBrand: PropTypes.string.isRequired,
  ProductName: PropTypes.string.isRequired,
  ProductPrice: PropTypes.number.isRequired,
  ProductQuantity: PropTypes.number.isRequired,
};
export default function CartCard({
  ProductID,
  ProductImages,
  ProductBrand,
  ProductName,
  ProductPrice,
  ProductQuantity,
}) {
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const { AddProduct, SetQuantity, RemoveProduct } = useCart();
  return (
    <div className="w-full  shadow-lg">
      <div className=" grid grid-row grid-cols-10 justify-center items-center">
        <div className=" col-span-2">
          <IconButton
            onClick={() => RemoveProduct(ProductID)}
            size="sm"
            variant="text"
            className=" ml-4 rounded-full hover:scale-150"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <i className="fa-solid fa-trash"></i>
          </IconButton>
        </div>

        <div className="hidden md:flex  col-span-1 justify-center items-center">
          {ProductImages.length > 0 && (
            <img
              loading="lazy"
              className="p-1 rounded-full ring-1 ring-accent-primary aspect-square h-8 w-8"
              src={ProductImages[0]}
            />
          )}
        </div>
        <div className=" col-span-3 flex flex-col justify-center items-center">
          <div className=" flex  justify-evenly gap-1 items-start">
            <Typography
              variant="h6"
              className={` font-thin`}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {ProductBrand}
            </Typography>

            <Typography
              variant="paragraph"
              className={`font-thin`}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {ProductName}
            </Typography>
          </div>
          <Typography
            variant="paragraph"
            color="green"
            className={` self-center font-semibold`}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {ProductQuantity}x {ProductPrice} ({parseInt(ProductQuantity, 10) * parseInt(ProductPrice, 10)}) TND
          </Typography>
        </div>
        <div className=" col-span-5 md:col-span-4 relative w-full flex flex-wrap justify-center items-center">
          <QuantityInput
            quantity={ProductQuantity}
            ProductID={ProductID}
            incrementHandler={SetQuantity}
            decrementHandler={SetQuantity}
            onchangeHandler={SetQuantity}
          />
        </div>
      </div>
    </div>
  );
}