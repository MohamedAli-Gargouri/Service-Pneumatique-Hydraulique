import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from '@material-tailwind/react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/light-actions';
import PropTypes from 'prop-types';
import React from 'react';
import NoProductImg from '../../assets/images/products/NoProductImg.webp';
import useCart from '../../utils/hooks/useCart';
import { useTranslation } from 'react-i18next';
import { RootState } from 'types/components/general';
ProductCarouselCard.propTypes = {
  ProductShortDescription: PropTypes.string.isRequired,
  ProductImages: PropTypes.array.isRequired,
  ProductName: PropTypes.string.isRequired,
  ProductPrice: PropTypes.number.isRequired,
  ProductBrand: PropTypes.string.isRequired,
  ProductCategory: PropTypes.string.isRequired,
  ProductID: PropTypes.number.isRequired,
  ProductSubCategory: PropTypes.array.isRequired,
  ProductLongDesc: PropTypes.string.isRequired,
  ProductInformation: PropTypes.string.isRequired,
  ProductShipping: PropTypes.string.isRequired,
};
export default function ProductCarouselCard({
  ProductCategory,
  ProductID,
  ProductImages,
  ProductBrand,
  ProductName,
  ProductPrice,
  ProductShortDescription,
  ProductSubCategory,
  ProductLongDesc,
  ProductInformation,
  ProductShipping,
}) {
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const [IsHovered, SetIsHovered] = React.useState(false);
  const { AddProduct, SetQuantity, RemoveProduct } = useCart();
  const DisplayedProductImg =
    ProductImages.length === 0
      ? NoProductImg
      : ProductImages.length > 2
        ? IsHovered
          ? ProductImages[1]
          : ProductImages[0]
        : ProductImages[0];

  const Product = {
    ProductID: ProductID,
    ProductBrand: ProductBrand,
    ProductName: ProductName,
    ProductCategory: ProductCategory,
    ProductImages: ProductImages,
    ProductPrice: ProductPrice,
    ProductQuantity: 1,
  };

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
  const { t } = useTranslation();
  var isLightMode = LightModeState === LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState === LightMode().type;
  }, [LightModeState]);
  return (
    <Card
      className={`background-secondary text-primary p-2 m-2 max-w-[20rem]  max-h-[40rem] `}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <CardHeader
        onMouseEnter={() => SetIsHovered(true)}
        onMouseLeave={() => SetIsHovered(false)}
        shadow={false}
        floated={false}
        className=" bg-gray-300 rounded-md aspect-square  max-h-64 Selected shadow-lg img border mx-1 my-1  p-4 hover:cursor-pointer"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <img
          loading="lazy"
          key={DisplayedProductImg}
          className="animate-fade  w-full h-full aspect-square Imageshadow rounded-lg shadow-x"
          src={DisplayedProductImg}
        />
      </CardHeader>
      <CardBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <div className="mb-2 flex items-center justify-between">
          <Typography
            className="font-medium"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {ProductName}
          </Typography>
          <Typography
            className="font-medium"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {ProductPrice} TND
          </Typography>
        </div>
        <Typography
          variant="small"
          className="font-normal opacity-75"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {ProductShortDescription}
        </Typography>
      </CardBody>
      <CardFooter
        className="pt-0"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Button
          fullWidth={true}
          ripple={false}
          onClick={() => {
            localStorage.setItem('ProductPreviewProps', JSON.stringify(ProductDetails));
            window.location.href = '/ProductDetails';
          }}
          className=" background-accent-primary flex items-center m-2 gap-3 hover:scale-105 active:scale-100"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <i className="fa-solid fa-eye"></i>
          {t('Global.Actions.Discover')}
        </Button>
        <Button
          onClick={() => AddProduct(Product)}
          fullWidth={true}
          ripple={false}
          className=" background-accent-primary flex items-center m-2 gap-3 hover:scale-105 active:scale-100"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <i className="fa-solid fa-cart-shopping"></i>
          {t('Global.Actions.AddCart')}
        </Button>
      </CardFooter>
    </Card>
  );
}
