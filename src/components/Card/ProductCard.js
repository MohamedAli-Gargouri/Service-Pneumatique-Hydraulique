import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Rating,
  IconButton,
  Chip,
} from '@material-tailwind/react';
import './ProductCard.css';
import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import TranslatedText from '../../utils/Translation';
import { LightMode, DarkMode } from '../../redux/actions/LightActions';
import { addProduct } from '../../redux/actions/MyCartActions';
import { useDispatch } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { CreateToast } from '../../utils/Toast';
import useCart from '../../utils/hooks/Cart';
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
  ProductShipping 
}) {
  const [isHovered, setIsHovered] = React.useState(false);
  const LightModeState = useSelector((state) => state.lightMode);
  const {AddProduct,SetQuantity,RemoveProduct}=useCart()
  const ProductDetails={
    ProductID:ProductID,
    ProductShortDescription:ProductShortDescription,
    ProductImages:ProductImages,
    ProductCategory:ProductCategory,
    ProductBrand:ProductBrand,
    ProductName:ProductName,
    ProductPrice:ProductPrice,
    ProductSubCategory:ProductSubCategory,
    ProductLongDesc:ProductLongDesc,
    ProductInformation:ProductInformation,
    ProductShipping:ProductShipping,
  }

  const Product={ProductID:ProductID,
    ProductBrand:ProductBrand,
    ProductName:ProductName, 
    ProductCategory:ProductCategory,
    ProductImages:ProductImages,
    ProductPrice:ProductPrice,
    ProductQuantity:1
    }


  if (variant == 1) {
    return (
      <Card
        className={` animate-fade ${
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
              key={isHovered ? "Image2" : "Image1"}
              src={isHovered ? ProductImages[0] : ProductImages[1]}
              className="aspect-square  bg-cover Imageshadow animate-Quickfade"
            />
          </div>

          <div className="col-span-2 sm:col-span-3 mx-2 flex flex-col justify-center items-start text-center ">
 
                <Typography variant="h6" className={` font-semibold`}>
                  {ProductCategory}
                </Typography>
                <Typography variant="h6" className={` font-thin`}>
                  {ProductBrand}
                </Typography>
                <Typography variant="h6" className={` font-thin`}>
                  {ProductName}
                </Typography>

                <Typography
                  variant="h6"
                  color="green"
                  className={` font-serif`}
                >
                  {ProductPrice} TND
                </Typography>

                <Typography variant="small" className={`font-thin`}>
                  {ProductShortDescription}
                </Typography>


                <div className=' my-2 flex gap-1 justify-center items-center flex-wrap'>
              { 
                ProductSubCategory.map((SubCategory,index)=>{
              return(
                <Chip key={"Subcategory"+index} value={SubCategory.SubCategoryName} />
              )
                })
              }
            </div>

          </div>

          <div className="col-span-1 flex-col flex gap-2 items-center justify-center w-full text-center">
            <Rating
              className={'flex-wrap justify-center items-center'}
              unratedColor="red"
            />

            <IconButton
              onClick={() => {
                localStorage.setItem('ProductPreviewProps', JSON.stringify(ProductDetails));
                window.location.href = '/ProductDetails';
              }}
              size="sm"
              variant="text"
              className=" rounded-full hover:scale-150"
            >
              <i className="fa-regular fa-eye fa-lg"></i>
            </IconButton>

            <Button
            onClick={()=>AddProduct(Product)}
              size="sm"
              variant="outlined"
              className="focus:ring-0 flex items-center rounded-sm justify-center gap-1 p-2 hover:scale-105"
            >
              <i className="fa-solid fa-cart-shopping fa-sm"></i>
                <TranslatedText TranslationPath="Cart.Actions.AddCart" />

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
           key={isHovered ? "Image2" : "Image1"}
            src={isHovered ? ProductImages[0] : ProductImages[1]}
            className={`aspect-square max-h-64 bg-cover Imageshadow animate-Quickfade`}
          />

          <div className="hover-content p-4 w-full">
            <div className="flex flex-wrap justify-center items-center">

                <IconButton
                  onClick={() => {
                    window.location.href = '/ProductDetails';
                  }}
                  size="sm"
                  variant="text"
                  className="rounded-full hover:scale-150 mr-2"
                >
                  <i className="fa-regular fa-eye fa-lg"></i>
                </IconButton>


                <Button
                onClick={()=>AddProduct(Product)}
                  size="sm"
                  variant="outlined"
                  className="focus:ring-0 flex items-center gap-3 p-2 rounded-sm hover:scale-105 mr-2"
                >
                  <i className="fa-solid fa-cart-shopping fa-sm"></i>
                    <TranslatedText TranslationPath="Cart.Actions.AddCart" />
                </Button>

            </div>
          </div>
        </div>

        <div className=' text-center'>
          <Typography variant="h6" className={`font-semibold `}>
            {ProductCategory}
          </Typography>

          <Typography variant="h6" className={` font-thin `}>
            {ProductBrand}
          </Typography>
          <Typography variant="h6" className={`font-thin `}>
            {ProductName}
          </Typography>

            <Typography variant="h6" color={'green'} className={`font-serif`}>
              {ProductPrice} TND
            </Typography>

          <Typography variant="paragraph" className={`font-thin`}>
            {ProductShortDescription}
          </Typography>
          <Rating
            className={'flex-wrap justify-center items-center'}
            unratedColor="red"
          />
          <div className=' my-2 flex gap-1 justify-center items-center flex-wrap'>
              { 
                ProductSubCategory.map((SubCategory,index)=>{
              return(
                <Chip key={"Subcategory"+index} value={SubCategory.SubCategoryName} />
              )
                })
              }
            </div>
        </div>




      </Card>
    );
  }
}
