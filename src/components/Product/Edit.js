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
  Textarea,
} from '@material-tailwind/react';
import React from 'react';
import TranslatedText,{TranslateString} from '../../utils/Translation';
import AnimatedTab from '../../components/Tab';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Gallery from '../../components/Gallery';
import { CreateToast } from '../../utils/Toast';
import ReactDOMServer from 'react-dom/server';
import ProductImg1 from '../../assets/images/products/product_1.png';
import ProductImg2 from '../../assets/images/products/product_2.png';
import ProductImg3 from '../../assets/images/products/product_3.png';
import { LightMode, DarkMode } from '../../redux/actions/LightActions';
import MultiSelect from '../Input/MultiSelect';
export default function Product() {
  const LightModeState = useSelector((state) => state.lightMode);
  const AddedImages = React.useRef([]);
  const [SelectedCategory,SetSelectedCategory]=React.useState("Comp")
  const Categories=[
    {categoryID:1,CategoryName:"Compressors",CategoryValue:"Comp"},
    {categoryID:2,CategoryName:"Tubes",CategoryValue:"Tub"},
    {categoryID:3,CategoryName:"Secheurs",CategoryValue:"Secheur"}
  ]

  const SubCategories = [
    { SubCategory: 'Size, 100ML', id: 1 },
    { SubCategory: 'Size, 400ML', id: 2 },
    { SubCategory: 'Power, 7cv', id: 3 },
    { SubCategory: 'Power, 10cv', id: 4 },
  ];
  const MultiSelect_SelectData = React.useRef([
    { SubCategory: 'Power, 7cv', id: 3 },
    { SubCategory: 'Power, 10cv', id: 4 },
  ]);


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

  const LongDescRef=React.useRef();
  const InformationRef=React.useRef();
  const ShippingRef=React.useRef()
  const HandleEditProduct = () => {
    try {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('API Fetch is done!');
        }, 3000);
      });

      CreateToast(
        promise,
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Products.EditProduct_Success" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Products.EditProduct_Success" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Promise.Pending" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Products.EditProduct_Error" />,
        ),
        'promise',
        LightModeState == LightMode().type,
      );
    } catch (e) {}
  };

  return (
    <React.Fragment>
      <div className="h-full w-full mb-[1rem]  grid grid-cols-2 justify-center items-center ">
        <div className="h-full w-full ImageGallery col-span-2 md:col-span-1">
          <Gallery
            AddedImages={AddedImages}
            Deletable={true}
            Addable={true}
            Images={[ProductImg1, ProductImg2, ProductImg3]}
          />
        </div>

        <div className="mt-4 h-full gap-2 w-full Description col-span-2 md:col-span-1 flex flex-col items-center  justify-center">
          <Input
            labelProps={{
              style: {
                color: LightModeState == LightMode().type ? 'black' : 'white',
              },
            }}
            label={'Brand'}
            defaultValue={'Hertz'}
            icon={<i className="fa-solid fa-info"></i>}
          />

          <Input
            defaultValue="MX-15648679"
            labelProps={{
              style: {
                color: LightModeState == LightMode().type ? 'black' : 'white',
              },
            }}
            label={
              <TranslatedText TranslationPath="UCP.EditProduct.TabInputs.PName" />
            }
            icon={<i className="fa-solid fa-info"></i>}
          />



          <Select
          label={TranslateString ("UCP.AddProduct.TabInputs.PCategory")}
          value={SelectedCategory}
          onChange={(e)=>SetSelectedCategory(e)}
        >
          {
            Categories.map((Category)=>{
              return(
                <Option key={Category.categoryID} value={Category.CategoryValue}>{Category.CategoryName}</Option>
              )

            })
          }
        </Select>

          <div className=" w-full">
            <MultiSelect
              Data={SubCategories}
              DataLabelName="SubCategory"
              SelectData={MultiSelect_SelectData}
            />
          </div>

          <Input
            defaultValue="500TND"
            labelProps={{
              style: {
                color: LightModeState == LightMode().type ? 'black' : 'white',
              },
            }}
            label={
              <TranslatedText TranslationPath="UCP.EditProduct.TabInputs.PPrice" />
            }
            icon={<i className="fa-solid fa-dollar-sign"></i>}
          />

          <Input
            defaultValue="25648497889"
            labelProps={{
              style: {
                color: LightModeState == LightMode().type ? 'black' : 'white',
              },
            }}
            label={
              <TranslatedText TranslationPath="UCP.EditProduct.TabInputs.PCode" />
            }
            icon={<i className="fa-solid fa-barcode"></i>}
          />

          <Input
            defaultValue="20"
            labelProps={{
              style: {
                color: LightModeState == LightMode().type ? 'black' : 'white',
              },
            }}
            label={
              <TranslatedText TranslationPath="UCP.EditProduct.TabInputs.StoreQuantity" />
            }
            icon={<i className="fa-solid fa-store"></i>}
          />
          <Input
            defaultValue="500"
            labelProps={{
              style: {
                color: LightModeState == LightMode().type ? 'black' : 'white',
              },
            }}
            label={
              <TranslatedText TranslationPath="UCP.EditProduct.TabInputs.StockQuantity" />
            }
            icon={<i className="fa-solid fa-warehouse"></i>}
          />
          <Textarea
            labelProps={{
              style: {
                color: LightModeState == LightMode().type ? 'black' : 'white',
              },
            }}
            size="lg"
            label={
              TranslateString("UCP.EditProduct.TabInputs.SDescription")
            }
            defaultValue="Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing. Sed lectus."
          />

          <hr className="m-1" />
        </div>
      </div>
      <div className="w-full">

      <AnimatedTab
        data={(() => {
          const TempTabs = Tabs.map((tab, index) => ({
            label: tab.TabName,
            value: tab.TabName,
            icon: tab.TabLogo,
            desc: (
            <Textarea
            key={index === 0 ? "Tab0" : index === 1 ? "Tab1" : "Tab2"}
            ref={index === 0 ? LongDescRef : index === 1 ? InformationRef : ShippingRef}
            size="lg"
            label={
              index === 0 ? TranslateString("UCP.EditProduct.TabFilter.LDescription") : index === 1 ? TranslateString("UCP.EditProduct.TabFilter.Additonalinfo") : TranslateString("UCP.EditProduct.TabFilter.Shipping")
              
            }
            defaultValue={index === 0 ? "Best Product Description" : index === 1 ? "Best Product Additional Information" : "Best Product Shipping policies"}
            />
            ),
          }));
          
          return TempTabs;
        })()


        }
        DefaultSelectValue={'Description'}
      />
      </div>

      <div className=" flex justify-center">
        <Button
          className=" flex items-center gap-3"
          onClick={HandleEditProduct}
        >
          <i className="fa-solid fa-floppy-disk"></i>
          <TranslatedText TranslationPath="UCP.EditProduct.TabActions.SaveProduct" />
        </Button>
      </div>
    </React.Fragment>
  );
}
