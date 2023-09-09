import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import { useSelector } from "react-redux/es/hooks/useSelector";
  import {LightMode} from "../../redux/actions/LightActions"
  import TranslatedText from '../../utils/Translation';
  import PropTypes from "prop-types"
  import React from "react";
  import NoProductImg from "../../assets/images/products/NoProductImg.webp"
  import useCart from "../../utils/hooks/Cart";
  ProductCarouselCard.propTypes={
    ProductShortDescription:PropTypes.string.isRequired,
    ProductImages:PropTypes.array.isRequired,
    ProductName:PropTypes.string.isRequired,
    ProductPrice:PropTypes.number.isRequired,
    ProductBrand:PropTypes.string.isRequired,
    ProductCategory:PropTypes.string.isRequired,
    ProductID:PropTypes.number.isRequired,
    ProductSubCategory:PropTypes.array.isRequired,
    ProductLongDesc:PropTypes.string.isRequired,
    ProductInformation:PropTypes.string.isRequired,
    ProductShipping:PropTypes.string.isRequired
  }
  export default  function ProductCarouselCard({
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
      ProductShipping
    }) {
    const LightModeState=useSelector(state=>state.lightMode)
    const [IsHovered,SetIsHovered]=React.useState(false)
    const {AddProduct,SetQuantity,RemoveProduct}=useCart()
    const DisplayedProductImg=ProductImages.length==0?NoProductImg:ProductImages.length>2?IsHovered?ProductImages[1]:ProductImages[0]:ProductImages[0]

    const Product={
      ProductID:ProductID,
      ProductBrand:ProductBrand,
      ProductName:ProductName, 
      ProductCategory:ProductCategory,
      ProductImages:ProductImages,
      ProductPrice:ProductPrice,
      ProductQuantity:1
      }

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
    return (
      <Card className={` p-2 m-2  max-h-[40rem] ${LightModeState==LightMode().type?"tc-whiteTheme_T1 bg-whiteTheme_T2  ":"tc-darkTheme_T1 bg-darkTheme_T2 "}`}>
        <CardHeader 
        onMouseEnter={()=>SetIsHovered(true)}
        onMouseLeave={()=>SetIsHovered(false)}
         shadow={false}
          floated={false}
           className=" bg-gray-300 rounded-md aspect-square  max-h-64 Selected shadow-lg img border mx-1 my-1  p-4 hover:cursor-pointer">
        <img
        key={DisplayedProductImg}
        className="animate-fade  w-full h-full aspect-square Imageshadow rounded-lg shadow-x"
        src={DisplayedProductImg}
        />

        </CardHeader>
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography  className="font-medium">
              {ProductName}
            </Typography>
            <Typography  className="font-medium">
              {ProductPrice} TND
            </Typography>
          </div>
          <Typography
            variant="small"
            
            className="font-normal opacity-75"
          >
            {ProductShortDescription}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
         
        <Button
          fullWidth={true}
          ripple={false}
          onClick={() => {
            localStorage.setItem('ProductPreviewProps', JSON.stringify(ProductDetails));
            window.location.href = '/ProductDetails';
          }}
           className=" bg-red-600 flex items-center m-2 gap-3 hover:scale-105 active:scale-100">
        <i className="fa-solid fa-eye"></i>


        <TranslatedText TranslationPath="Global.Actions.Discover" />
      </Button>
         <Button
         onClick={()=>AddProduct(Product)}
          fullWidth={true}
          ripple={false}
           className=" bg-red-600 flex items-center m-2 gap-3 hover:scale-105 active:scale-100">
      <i className="fa-solid fa-cart-shopping"></i>

      <TranslatedText TranslationPath="Global.Actions.AddCart" />
      </Button>

        

        </CardFooter>
      </Card>
    );
  }