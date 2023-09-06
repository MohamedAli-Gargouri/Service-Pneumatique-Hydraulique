import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Rating,
  IconButton,
} from '@material-tailwind/react';
import './ProductCard.css';
import productSample1 from '../../assets/images/products/product_1.png';
import productSample2 from '../../assets/images/products/product_2.png';
import React from 'react';
import QuantityInput from '../Input/Quantity';
export default function ProductCard({
  text,
  ProductImage,
  ProductName,
  ProductPrice,
}) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div className="w-full  shadow-lg">
      <div className=" grid grid-row grid-cols-6 justify-center items-center">
        <div className=" col-span-1">
          <IconButton
            size="sm"
            variant="text"
            className=" ml-4 rounded-full hover:scale-150"
          >
            <i class="fa-solid fa-trash"></i>
          </IconButton>
        </div>

        <div className=" col-span-2 flex flex-col justify-center items-center">
          <Typography variant="h6" className={`font-light`}>
            Compressor
          </Typography>

          <Typography variant="p" className={`font-body`}>
            MX-74070
          </Typography>
          <Typography variant="p" color="green" className={`font-bold`}>
            2x 1000TND
          </Typography>
        </div>
        <div className=" col-span-3 relative w-full flex flex-wrap justify-center items-center">
          <QuantityInput />
        </div>
      </div>
    </div>
  );
}
