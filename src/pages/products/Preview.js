import {
  Typography,
  Button,
  Rating,
  Chip
} from '@material-tailwind/react';
import React from 'react';
import Navbar from '../../components/NavBar';
import { TranslateString } from '../../utils/Translation';
import AnimatedTab from '../../components/Tab';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Footer from '../../components/footer';
import Gallery from '../../components/Gallery';
import Breadcrump from '../../components/Breadcrump';
import useCart from '../../utils/hooks/Cart';

import TranslatedText from '../../utils/Translation';
export default function Products() {
  const {OrderCart,AddProduct,SetQuantity,RemoveProduct}=useCart()
  const ProductInfo = JSON.parse(localStorage.getItem('ProductPreviewProps'));

  const Product={ProductID:ProductInfo.ProductID,
    ProductBrand:ProductInfo.ProductBrand,
    ProductName:ProductInfo.ProductName, 
    ProductCategory:ProductInfo.ProductCategory,
    ProductImages:ProductInfo.ProductImages,
    ProductPrice:ProductInfo.ProductPrice,
    ProductQuantity:1
    }
  const Tabs=[
    {
      TabID:1,
      TabName:TranslateString("Product.Description"),
      TabLogo:<i className="fa-solid fa-circle-info mx-2"></i>,
    },
    {
      TabID:2,
      TabName:TranslateString("Product.AddInfo"),
      TabLogo:<i className="fa-solid fa-info mx-2"></i>,
    },
    {
      TabID:3,
      TabName:TranslateString("Product.Shipping"),
      TabLogo:<i className="fa-solid fa-truck-fast mx-2"></i>,
    }
  ]
  const LightModeState = useSelector((state) => state.lightMode);
  return (
    <React.Fragment>
      <Navbar />
      <div className="pt-[20vh] md:pt-[15vh] ">
        <Breadcrump
          List={false}
          Parent={{ PageUrl: '/Products', PageName: <TranslatedText TranslationPath="Product.Shop" /> }}
          Child={{ PageUrl: '/ProductDetails', PageName: <TranslatedText TranslationPath="Product.Product" /> }}
        />
      </div>
      <div className="mb-[1rem]  grid grid-cols-2 w-full justify-center items-center gap-3 ">
        <div className="col-span-2 md:col-span-1">
          <Gallery Addable={false} Deletable={false} Images={ProductInfo.ProductImages} />
        </div>

        <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center w-full">
        <Typography variant="h5" className=" font-semibold">
            {ProductInfo.ProductCategory}
          </Typography>

          <Typography variant="h6" className=" font-thin">
           {ProductInfo.ProductBrand}
          </Typography>

          <Typography variant="h6" className=" font-thin">
            {ProductInfo.ProductName}
          </Typography>
          <Rating />
          <Typography variant="h6" color="green" className=" font-serif">
            {ProductInfo.ProductPrice} TND
          </Typography>
          <Typography variant="paragraph" className=" font-thin m-4 md:m-0">
        {ProductInfo.ProductShortDescription}
          </Typography>

            <Button
              className=" my-2 flex items-center justify-center gap-1 w-[50%] hover:scale-110 "
              onClick={()=>AddProduct(Product)}
            >
              <i className="fa-solid fa-cart-plus"></i>
              <TranslatedText TranslationPath="Global.Actions.AddCart" />
            </Button>

          <div className=' mt-2 flex gap-1 justify-center items-center flex-wrap'>
    { 
      ProductInfo.ProductSubCategory.map((SubCategory,index)=>{
    return(
      <Chip key={"Subcategory"+index} value={SubCategory.SubCategoryName} />
    )
      })
    }
</div>
        </div>
      </div>

      <AnimatedTab
        data={(() => {
          const TempTabs = Tabs.map((tab, index) => ({
            label: tab.TabName,
            value: tab.TabName,
            icon: tab.TabLogo,
            desc: (
              <Typography key={index === 0 ? "Tab0" : index === 1 ? "Tab1" : "Tab2"} variant="paragraph" className="font-extralight">
                {index === 0 ? ProductInfo.ProductLongDesc : index === 1 ? ProductInfo.ProductInformation : ProductInfo.ProductShipping}
              </Typography>
            ),
          }));
          
          return TempTabs;
        })()


        }
        DefaultSelectValue={TranslateString("Product.Description")}
      />

      <Footer />
    </React.Fragment>
  );
}
