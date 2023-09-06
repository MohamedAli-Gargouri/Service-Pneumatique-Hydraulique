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
import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import TranslatedText from '../../utils/Translation';
import { LightMode, DarkMode } from '../../redux/actions/LightActions';
export default function ProductCard({
  ProductShortDescription,
  ProductImages,
  ProductCategory,
  ProductBrand,
  ProductName,
  ProductPrice,
  ProductSubCategory,
  variant,
}) {
  const [isHovered, setIsHovered] = React.useState(false);
  const LightModeState = useSelector((state) => state.lightMode);
  if (variant == 1) {
    return (
      <Card
        className={`${
          LightModeState == LightMode().type
            ? 'tc-whiteTheme_T1 bg-whiteTheme_T2  '
            : 'tc-darkTheme_T1 bg-darkTheme_T2 '
        } rounded-none shadow-lg p-1 pr-4 m-1  `}
      >
        <div className="grid grid-cols-5  gap-0">
          <div
            className="w-full shadow-lg ProductImage bg-gray-300  col-span-2 sm:col-span-1 flex   justify-center items-center "
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={isHovered ? ProductImages[0] : ProductImages[1]}
              className="aspect-square  bg-cover Imageshadow"
            />
          </div>

          <div className="ProductDescription col-span-2 sm:col-span-3 ml-1">
            <div className="flex flex-col justify-center items-start">
              <div className="Product Catalog ">
                <Typography variant="h6" className={`font-light`}>
                  {ProductCategory}
                </Typography>
              </div>
              <div className="Product Title  ">
                <Typography variant="h5" className={`font-body`}>
                  {ProductBrand}
                </Typography>
                <Typography variant="h5" className={`font-body`}>
                  {ProductName}
                </Typography>
              </div>

              <div className="Price">
                <Typography
                  variant="paragraph"
                  color="green"
                  className={`font-bold`}
                >
                  {ProductPrice} TND
                </Typography>
              </div>

              <div className="Product Content  ">
                <Typography variant="paragraph" className={` font-light`}>
                  {ProductShortDescription}
                </Typography>
              </div>
            </div>
          </div>

          <div className=" Product Actions col-span-1 flex-col flex gap-2 items-center justify-center w-full">
            <Rating
              className={'flex-wrap justify-center items-center'}
              unratedColor="red"
            />

            <IconButton
              onClick={() => {
                window.location.href = '/ProductDetails';
              }}
              size="sm"
              variant="text"
              className=" rounded-full hover:scale-150"
            >
              <i class="fa-regular fa-eye fa-lg"></i>
            </IconButton>

            <Button
              size="sm"
              variant="filled"
              className="focus:ring-0 flex items-center gap-3 p-4 hover:scale-105"
            >
              <i class="fa-solid fa-cart-shopping fa-sm"></i>
              <span class="hidden md:inline">
                <TranslatedText TranslationPath="Cart.Actions.AddCart" />
              </span>
            </Button>
          </div>
        </div>
      </Card>
    );
  }
  if (variant == 2 || variant == 3 || variant == 0) {
    return (
      <Card
        className={`${
          LightModeState == LightMode().type
            ? 'tc-whiteTheme_T1 bg-whiteTheme_T2  '
            : 'tc-darkTheme_T1 bg-darkTheme_T2 '
        }  rounded-none shadow-lg p-1  m-1 flex flex-col flex-wrap items-center justify-center `}
      >
        <div
          className=" w-full shadow-lg  max-h-64 image-container  bg-gray-300 col-span-1 flex flex-col  justify-center items-center"
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            id="ProductImg"
            src={isHovered ? ProductImages[0] : ProductImages[1]}
            className="aspect-square max-h-64 bg-cover Imageshadow animate-fade"
          />

          <div class="hover-content p-4 w-full">
            <div className="Actions flex flex-wrap justify-center items-center">
              <div className="Preview mr-2">
                <IconButton
                  onClick={() => {
                    window.location.href = '/ProductDetails';
                  }}
                  size="sm"
                  variant="text"
                  className="rounded-full hover:scale-150"
                >
                  <i class="fa-regular fa-eye fa-lg"></i>
                </IconButton>
              </div>

              <div className="AddCart ml-2">
                <Button
                  size="sm"
                  variant="filled"
                  className="focus:ring-0 flex items-center gap-3 p-4 hover:scale-105"
                >
                  <i class="fa-solid fa-cart-shopping fa-sm"></i>
                  <span class="hidden md:inline">
                    <TranslatedText TranslationPath="Cart.Actions.AddCart" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="Description">
          <Typography variant="h6" className={`font-light text-center`}>
            {ProductCategory}
          </Typography>

          <Typography variant="h6" className={`font-body text-center`}>
            {ProductBrand}
          </Typography>
          <Typography variant="h6" className={`font-body text-center`}>
            {ProductName}
          </Typography>

          <div className="Price text-center">
            <Typography variant="h6" color={'green'} className={` font-body`}>
              {ProductPrice} TND
            </Typography>
          </div>
          <Typography variant="paragraph" className={` font-light text-center`}>
            {ProductShortDescription}
          </Typography>
        </div>

        <div className="Review text-center">
          <Rating
            className={'flex-wrap justify-center items-center'}
            unratedColor="red"
          />
        </div>
      </Card>
    );
  }
}
