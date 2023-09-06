import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
  ListItemSuffix,
  ListItem,
  List,
  Select,
  Option,
  IconButton,
  Rating,
  Chip
} from '@material-tailwind/react';
import React from 'react';
import Navbar from '../../components/NavBar';
import Pagination from '../../components/Pagination';
import { TranslateString } from '../../utils/Translation';
import AnimatedTab from '../../components/Tab';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Footer from '../../components/footer';
import Gallery from '../../components/Gallery';
import QuantityInput from '../../components/Input/Quantity';
import Breadcrump from '../../components/Breadcrump';
import ProductImg1 from '../../assets/images/products/product_1.png';
import ProductImg2 from '../../assets/images/products/product_2.png';
import ProductImg3 from '../../assets/images/products/product_3.png';

import TranslatedText from '../../utils/Translation';
export default function Products() {
  const ProductInfo={
    ProductID:1,
    ProductcategoryName:"Compressors",
    ProductBrand:"Hertz",
    ProductName:"X15648",
    ProductPrice:1500,
    ProductShortDesc:"Sed egestas, ante et vulputate volutpat, eros pede semper est, vitaeluctus metus libero eu augue. Morbi purus libero, faucibusadipiscing. Sed lectus.",
    ProductSubCategories:[
      {SubCategoryID:1,SubCategoryName:"Size,100ML",CategoryID:1},
      {SubCategoryID:2,SubCategoryName:"Power,4cv",CategoryID:1},
      {SubCategoryID:3,SubCategoryName:"Consomation,7L",CategoryID:1}
    ],
    ProductLongDesc:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit",
    ProductInformation:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit",
    ProductShipping:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit" 
  }

  const Tabs=[
    {
      TabID:1,
      TabName:TranslateString("Product.Description"),
      TabLogo:<i className="fa-solid fa-circle-info"></i>,
    },
    {
      TabID:2,
      TabName:TranslateString("Product.AddInfo"),
      TabLogo:<i className="fa-solid fa-info"></i>,
    },
    {
      TabID:3,
      TabName:TranslateString("Product.Shipping"),
      TabLogo:<i className="fa-solid fa-truck-fast"></i>,
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
      <div className="mb-[1rem]  grid grid-cols-2 justify-center items-center gap-3 ">
        <div className="col-span-2 md:col-span-1">
          <Gallery Images={[ProductImg1, ProductImg2, ProductImg3]} />
        </div>

        <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start  justify-center">
        <Typography variant="h5" className=" font-semibold">
            {ProductInfo.ProductcategoryName}
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
        {ProductInfo.ProductShortDesc}
          </Typography>
          <QuantityInput />

          <div className="md:ml-3">
            <Button
              className="flex items-center gap-1 w-full hover:scale-110"
            >
              <i className="fa-solid fa-cart-plus"></i>
              <TranslatedText TranslationPath="Global.Actions.Discover" />
            </Button>
          </div>
          <div className=' mt-2 flex gap-1 justify-center items-center flex-wrap'>
    { 
      ProductInfo.ProductSubCategories.map((SubCategory,index)=>{
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
        DefaultSelectValue={'Description'}
      />

      <Footer />
    </React.Fragment>
  );
}
