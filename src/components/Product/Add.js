import {
  Input,
  Button,
  Select,
  Option,
  Textarea,
} from '@material-tailwind/react';
import React from 'react';
import TranslatedText,{TranslateString} from '../../utils/Translation';
import AnimatedTab from '../../components/Tab';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Gallery from '../../components/Gallery';
import { LightMode } from '../../redux/actions/LightActions';
import { CreateToast } from '../../utils/Toast';
import ReactDOMServer from 'react-dom/server';
import MultiSelect from '../Input/MultiSelect';

export default function Product() {
  const LightModeState = useSelector((state) => state.lightMode);
  const AddedImages = React.useRef([]);
  const SubCategories = [
    { SubCategory: 'Size, 100ML', id: 1 },
    { SubCategory: 'Size, 400ML', id: 2 },
    { SubCategory: 'Power, 7cv', id: 2 },
    { SubCategory: 'Power, 10cv', id: 2 },
  ];
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
  const MultiSelect_SelectData = React.useRef([]);
  const LongDescRef=React.useRef()
  const InformationRef=React.useRef()
  const ShippingRef=React.useRef()
  const [SelectedCategory,SetSelectedCategory]=React.useState("")
  const Categories=[
    {categoryID:1,CategoryName:"Compressors",CategoryValue:"Comp"},
    {categoryID:2,CategoryName:"Tubes",CategoryValue:"Tub"},
    {categoryID:3,CategoryName:"Secheurs",CategoryValue:"Secheur"}
  ]
  const HandleAddProduct = () => {
    try {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('API Fetch is done!');
        }, 3000);
      });

      CreateToast(
        promise,
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Products.AddProduct_Success" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Products.AddProduct_Success" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Promise.Pending" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Products.AddProduct_Error" />,
        ),
        'promise',
        LightModeState == LightMode().type,
      );
    } catch (e) {/**Catch logic here */}
  };
  return (
    <React.Fragment>
      <div className="h-full w-full  grid grid-cols-2 gap-2 justify-center items-center ">
        <div className="h-full w-full ImageGallery col-span-2 md:col-span-1 ">
          <Gallery
            Images={[]}
            AddedImages={AddedImages}
            Deletable={true}
            Addable={true}
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
            icon={<i className="fa-solid fa-info"></i>}
          />

          <Input
            labelProps={{
              style: {
                color: LightModeState == LightMode().type ? 'black' : 'white',
              },
            }}
            label={
              <TranslatedText TranslationPath="UCP.AddProduct.TabInputs.PName" />
            }
            icon={<i className="fa-solid fa-info"></i>}
          />


<Select
          label={
            <TranslatedText TranslationPath="UCP.AddProduct.TabInputs.PCategory" />
          }
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
            labelProps={{
              style: {
                color: LightModeState == LightMode().type ? 'black' : 'white',
              },
            }}
            label={
              <TranslatedText TranslationPath="UCP.AddProduct.TabInputs.PPrice" />
            }
            icon={<i className="fa-solid fa-dollar-sign"></i>}
          />
          <Input
            labelProps={{
              style: {
                color: LightModeState == LightMode().type ? 'black' : 'white',
              },
            }}
            label={
              <TranslatedText TranslationPath="UCP.AddProduct.TabInputs.PCode" />
            }
            icon={<i className="fa-solid fa-barcode"></i>}
          />

          <Input
            labelProps={{
              style: {
                color: LightModeState == LightMode().type ? 'black' : 'white',
              },
            }}
            label={
              <TranslatedText TranslationPath="UCP.AddProduct.TabInputs.StoreQuantity" />
            }
            icon={<i className="fa-solid fa-store"></i>}
          />
          <Input
            labelProps={{
              style: {
                color: LightModeState == LightMode().type ? 'black' : 'white',
              },
            }}
            label={
              <TranslatedText TranslationPath="UCP.AddProduct.TabInputs.StockQuantity" />
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
            label={TranslateString("UCP.AddProduct.TabInputs.SDescription")}
            defaultValue=""
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
              index === 0 ? TranslateString("UCP.AddProduct.TabFilter.LDescription") : index === 1 ? TranslateString("UCP.AddProduct.TabFilter.Additonalinfo"): TranslateString("UCP.AddProduct.TabFilter.Shipping")
              
            }
            defaultValue=""
            />
            ),
          }));
          
          return TempTabs;
        })()


        }
        DefaultSelectValue={TranslateString("Product.Description")}
      />

      </div>

      <div className=" flex justify-center">
        <Button className=" flex items-center gap-3" onClick={HandleAddProduct}>
          <i className="fa-solid fa-plus"></i>
          <TranslatedText TranslationPath="UCP.AddProduct.TabActions.CreateProduct" />
        </Button>
      </div>
    </React.Fragment>
  );
}
