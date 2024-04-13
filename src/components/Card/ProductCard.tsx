import { Card, Typography, Button, Rating, IconButton, Chip } from '@material-tailwind/react';
import './ProductCard.css';
import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/light-actions';
import useCart from '../../utils/hooks/useCart';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { RootState } from 'types/components/general';
ProductCard.propTypes = {
  ProductID: PropTypes.number.isRequired,
  ProductShortDescription: PropTypes.string.isRequired,
  ProductImages: PropTypes.array.isRequired,
  ProductCategory: PropTypes.string.isRequired,
  ProductBrand: PropTypes.string.isRequired,
  ProductName: PropTypes.string.isRequired,
  ProductPrice: PropTypes.number.isRequired,
  ProductSubCategory: PropTypes.arrayOf(PropTypes.object).isRequired,
  variant: PropTypes.number.isRequired,
  ProductLongDesc: PropTypes.string.isRequired,
  ProductInformation: PropTypes.string.isRequired,
  ProductShipping: PropTypes.string.isRequired,
};

const Animations = {
  hidden: {
    opacity: 0,
    y: 0,
    x: 0,
    scale: 0.5,
  },
  hiddenRight: {
    opacity: 0,
    y: 0,
    x: 200,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
};

export default function ProductCard({
  ProductID,
  ProductShortDescription,
  ProductImages,
  ProductCategory,
  ProductBrand,
  ProductName,
  ProductPrice,
  ProductSubCategory,
  variant,
  ProductLongDesc,
  ProductInformation,
  ProductShipping,
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const [isHovered, setIsHovered] = React.useState(false);
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const { AddProduct, SetQuantity, RemoveProduct } = useCart();
  const { t } = useTranslation();
  var isLightMode = LightModeState === LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState === LightMode().type;
  }, [LightModeState]);
  const ProductDetails = {
    ProductID: ProductID,
    ProductShortDescription: ProductShortDescription,
    ProductImages: ProductImages,
    ProductCategory: ProductCategory,
    ProductBrand: ProductBrand,
    ProductName: ProductName,
    ProductPrice: ProductPrice,
    ProductSubCategory: ProductSubCategory,
    ProductLongDesc: ProductLongDesc,
    ProductInformation: ProductInformation,
    ProductShipping: ProductShipping,
  };

  const Product = {
    ProductID: ProductID,
    ProductBrand: ProductBrand,
    ProductName: ProductName,
    ProductCategory: ProductCategory,
    ProductImages: ProductImages,
    ProductPrice: ProductPrice,
    ProductQuantity: 1,
  };

  if (variant === 1) {
    return (
      <motion.div initial={'hidden'} variants={Animations} animate={inView ? 'visible' : 'hidden'} ref={ref}>
        <Card
          className={` background-secondary bg animate-fade rounded-none shadow-lg  `}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="grid grid-cols-5  gap-0">
            <div
              className="w-full shadow-lg ProductImage bg-gray-300  col-span-2 sm:col-span-1 flex   justify-center items-center "
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.img
                whileHover={{ opacity: 0.5 }}
                transition={{ duration: 0.3 }}
                loading="lazy"
                key={isHovered ? 'Image2' : 'Image1'}
                src={isHovered ? ProductImages[0] : ProductImages[1]}
                className="aspect-square  bg-cover Imageshadow"
              />
            </div>

            <div className="col-span-2 sm:col-span-3 mx-2 flex flex-col justify-center items-start text-center ">
              <Typography
                variant="h6"
                className={` font-semibold`}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {ProductCategory}
              </Typography>
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
                variant="h6"
                className={` font-thin`}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {ProductName}
              </Typography>

              <Typography
                variant="h6"
                color="green"
                className={` font-serif`}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {ProductPrice} TND
              </Typography>

              <Typography
                variant="small"
                className={`font-thin`}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {ProductShortDescription}
              </Typography>

              <div className=" my-2 flex gap-1 justify-center items-center flex-wrap">
                {ProductSubCategory.map((SubCategory, index) => {
                  return (
                    <Chip
                      className=" background-accent-primary"
                      key={'Subcategory' + index}
                      color="red"
                      value={SubCategory.SubCategoryName}
                    />
                  );
                })}
              </div>
            </div>

            <div className="col-span-1 flex-col flex gap-2 items-center justify-center w-full text-center">
              <Rating
                className={'flex-wrap justify-center items-center'}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />

              <IconButton
                onClick={() => {
                  localStorage.setItem('ProductPreviewProps', JSON.stringify(ProductDetails));
                  window.location.href = '/ProductDetails';
                }}
                size="sm"
                variant="text"
                className=" rounded-full hover:scale-150"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <i className="fa-regular fa-eye fa-lg"></i>
              </IconButton>

              <Button
                onClick={() => AddProduct(Product)}
                size="sm"
                variant="outlined"
                className="background-accent-primary focus:ring-0 flex items-center rounded-sm justify-center gap-1 p-2 hover:scale-105"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <i className="fa-solid fa-cart-shopping fa-sm"></i>
                {t('Cart.Actions.AddCart')}
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }
  if (variant === 2 || variant === 3 || variant === 0) {
    return (
      <motion.div initial={'hidden'} variants={Animations} animate={inView ? 'visible' : 'hidden'} ref={ref}>
        <Card
          className={`background-secondary rounded-none shadow-lg  flex flex-col flex-wrap items-center justify-center `}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div
            className=" w-full shadow-lg  max-h-64 image-container  bg-gray-300 col-span-1 flex flex-col  justify-center items-center"
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.img
              loading="lazy"
              whileHover={{ opacity: 0.5 }}
              transition={{ duration: 0.3 }}
              key={isHovered ? 'Image2' : 'Image1'}
              src={isHovered ? ProductImages[0] : ProductImages[1]}
              className={`aspect-square max-h-64 bg-cover Imageshadow`}
            />

            <div className="hover-content p-4 w-full">
              <div className="flex flex-wrap justify-center items-center">
                <IconButton
                  onClick={() => {
                    localStorage.setItem('ProductPreviewProps', JSON.stringify(ProductDetails));
                    window.location.href = '/ProductDetails';
                  }}
                  size="sm"
                  variant="text"
                  className="rounded-full hover:scale-150 mr-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <i className="fa-regular fa-eye fa-lg"></i>
                </IconButton>

                <Button
                  onClick={() => AddProduct(Product)}
                  size="sm"
                  variant="outlined"
                  className="background-accent-primary focus:ring-0 flex items-center gap-3 p-2 rounded-sm hover:scale-105 mr-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <i className="fa-solid fa-cart-shopping fa-sm"></i>
                  {t('Cart.Actions.AddCart')}
                </Button>
              </div>
            </div>
          </div>

          <div className=" text-center">
            <Typography
              variant="h6"
              className={`font-semibold `}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {ProductCategory}
            </Typography>

            <Typography
              variant="h6"
              className={` font-thin `}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {ProductBrand}
            </Typography>
            <Typography
              variant="h6"
              className={`font-thin `}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {ProductName}
            </Typography>

            <Typography
              variant="h6"
              color={'green'}
              className={`font-serif`}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {ProductPrice} TND
            </Typography>

            <Typography
              variant="paragraph"
              className={`font-thin`}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {ProductShortDescription}
            </Typography>
            <Rating
              className={'flex-wrap justify-center items-center'}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
            <div className=" my-2 flex gap-1 justify-center items-center flex-wrap">
              {ProductSubCategory.map((SubCategory, index) => {
                return (
                  <Chip
                    className=" background-accent-primary"
                    key={'Subcategory' + index}
                    color="red"
                    value={SubCategory.SubCategoryName}
                  />
                );
              })}
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }
}
