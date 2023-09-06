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
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';
import { ChevronDownIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import React from 'react';
import TranslatedText from '../../utils/Translation';
import CustomTab from '../../components/Tab';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Gallery from '../../components/Gallery';
import { LightMode, DarkMode } from '../../redux/actions/LightActions';
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
  const MultiSelect_SelectData = React.useRef([]);
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
    } catch (e) {}
  };
  return (
    <React.Fragment>
      <div class="h-full w-full mb-[1rem]  grid grid-cols-2 justify-center items-center ">
        <div className="h-full w-full ImageGallery col-span-2 md:col-span-1">
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
            icon={<i class="fa-solid fa-info"></i>}
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
            icon={<i class="fa-solid fa-info"></i>}
          />

          <Select
            label={
              <TranslatedText TranslationPath="UCP.AddProduct.TabInputs.PCategory" />
            }
          >
            <Option value={1}>Max Dryer</Option>
            <Option value={2}>Tube</Option>
            <Option value={3}>Another Option</Option>
            <Option value={4}>Compressor</Option>
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
            icon={<i class="fa-solid fa-dollar-sign"></i>}
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
            icon={<i class="fa-solid fa-barcode"></i>}
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
            icon={<i class="fa-solid fa-store"></i>}
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
            icon={<i class="fa-solid fa-warehouse"></i>}
          />
          <Textarea
            labelProps={{
              style: {
                color: LightModeState == LightMode().type ? 'black' : 'white',
              },
            }}
            size="lg"
            label={
              <TranslatedText TranslationPath="UCP.AddProduct.TabInputs.SDescription" />
            }
            defaultValue=""
          />

          <hr className="m-1" />
        </div>
      </div>
      <div className="w-full">
        <CustomTab
          data={[
            {
              label: (
                <TranslatedText TranslationPath="UCP.AddProduct.TabFilter.LDescription" />
              ),
              value: 'Long Description',
              icon: <i class="fa-solid fa-circle-info mx-4"></i>,
              desc: (
                <div class="">
                  <Typography variant="h6" className="font-bold m-4">
                    {
                      <TranslatedText TranslationPath="UCP.AddProduct.TabFilter.LDescription" />
                    }
                  </Typography>

                  <Textarea
                    size="lg"
                    label={
                      <TranslatedText TranslationPath="UCP.AddProduct.TabFilter.LDescription" />
                    }
                    defaultValue=""
                  />
                </div>
              ),
            },
            {
              label: (
                <TranslatedText TranslationPath="UCP.AddProduct.TabFilter.Additonalinfo" />
              ),
              value: 'Additional Information',
              icon: <i class="fa-solid fa-info mx-4"></i>,
              desc: (
                <div class="">
                  <Typography variant="h6" className="font-bold m-4">
                    <TranslatedText TranslationPath="UCP.AddProduct.TabFilter.Additonalinfo" />
                  </Typography>
                  <Textarea
                    size="lg"
                    label={
                      <TranslatedText TranslationPath="UCP.AddProduct.TabFilter.Additonalinfo" />
                    }
                    defaultValue=""
                  />
                </div>
              ),
            },
            {
              label: (
                <TranslatedText TranslationPath="UCP.AddProduct.TabFilter.Shipping" />
              ),
              value: 'Shipping & returns',
              icon: <i class="fa-solid fa-truck-fast mx-4"></i>,
              desc: (
                <div class="">
                  <Typography variant="h5" className=" font-bold m-4">
                    <TranslatedText TranslationPath="UCP.AddProduct.TabFilter.Shipping" />
                  </Typography>

                  <Textarea
                    size="lg"
                    label={
                      <TranslatedText TranslationPath="UCP.AddProduct.TabFilter.Shipping" />
                    }
                    defaultValue=""
                  />
                </div>
              ),
            },
          ]}
          DefaultSelectValue={'Long Description'}
        />
      </div>

      <div className=" flex justify-center">
        <Button className=" flex items-center gap-3" onClick={HandleAddProduct}>
          <i class="fa-solid fa-plus"></i>
          <TranslatedText TranslationPath="UCP.AddProduct.TabActions.CreateProduct" />
        </Button>
      </div>
    </React.Fragment>
  );
}
