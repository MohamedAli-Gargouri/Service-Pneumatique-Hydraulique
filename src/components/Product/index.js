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
import TranslatedText from '../../utils/Translation';
import CustomTab from '../../components/Tab';
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
      <div class="h-full w-full mb-[1rem]  grid grid-cols-2 justify-center items-center ">
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
            icon={<i class="fa-solid fa-info"></i>}
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
            defaultValue="500TND"
            labelProps={{
              style: {
                color: LightModeState == LightMode().type ? 'black' : 'white',
              },
            }}
            label={
              <TranslatedText TranslationPath="UCP.EditProduct.TabInputs.PPrice" />
            }
            icon={<i class="fa-solid fa-dollar-sign"></i>}
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
            icon={<i class="fa-solid fa-barcode"></i>}
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
            icon={<i class="fa-solid fa-store"></i>}
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
              <TranslatedText TranslationPath="UCP.EditProduct.TabInputs.SDescription" />
            }
            defaultValue="Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing. Sed lectus."
          />

          <hr className="m-1" />
        </div>
      </div>
      <div className="w-full">
        <CustomTab
          data={[
            {
              label: (
                <TranslatedText TranslationPath="UCP.EditProduct.TabFilter.LDescription" />
              ),
              value: 'Long Description',
              icon: <i class="fa-solid fa-circle-info mx-4"></i>,
              desc: (
                <div class="">
                  <Typography variant="h6" className="font-bold m-4">
                    <TranslatedText TranslationPath="UCP.EditProduct.TabFilter.LDescription" />
                  </Typography>

                  <Textarea
                    size="lg"
                    label={
                      <TranslatedText TranslationPath="UCP.EditProduct.TabFilter.LDescription" />
                    }
                    defaultValue="    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus.
Nunc nec porttitor turpis. In eu risus enim. In vitae mollis elit.
Vivamus finibus vel mauris ut vehicula.
Nullam a magna porttitor, dictum risus nec, faucibus sapien.
Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus."
                  />
                </div>
              ),
            },
            {
              label: (
                <TranslatedText TranslationPath="UCP.EditProduct.TabFilter.Additonalinfo" />
              ),
              value: 'Additional Information',
              icon: <i class="fa-solid fa-info mx-4"></i>,
              desc: (
                <div class="">
                  <Typography variant="h6" className="font-bold m-4">
                    <TranslatedText TranslationPath="UCP.EditProduct.TabFilter.Additonalinfo" />
                  </Typography>
                  <Textarea
                    size="lg"
                    label={
                      <TranslatedText TranslationPath="UCP.EditProduct.TabFilter.Additonalinfo" />
                    }
                    defaultValue="    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus.
Nunc nec porttitor turpis. In eu risus enim. In vitae mollis elit.
Vivamus finibus vel mauris ut vehicula.
Nullam a magna porttitor, dictum risus nec, faucibus sapien.
Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus."
                  />
                </div>
              ),
            },
            {
              label: (
                <TranslatedText TranslationPath="UCP.EditProduct.TabFilter.Shipping" />
              ),
              value: 'Shipping & returns',
              icon: <i class="fa-solid fa-truck-fast mx-4"></i>,
              desc: (
                <div class="">
                  <Typography variant="h6" className=" font-bold m-4">
                    <TranslatedText TranslationPath="UCP.EditProduct.TabFilter.Shipping" />
                  </Typography>

                  <Textarea
                    size="lg"
                    label={
                      <TranslatedText TranslationPath="UCP.EditProduct.TabFilter.Shipping" />
                    }
                    defaultValue="    We deliver to over 100 countries around the world. For full details of the delivery options we offer, please view our Delivery information
We hope you’ll love every purchase, but if you ever need to return an item you can do so within a month of receipt. For full details of how to make a return, please view our"
                  />
                </div>
              ),
            },
          ]}
          DefaultSelectValue={'Long Description'}
        />
      </div>

      <div className=" flex justify-center">
        <Button
          className=" flex items-center gap-3"
          onClick={HandleEditProduct}
        >
          <i class="fa-solid fa-floppy-disk"></i>
          <TranslatedText TranslationPath="UCP.EditProduct.TabActions.SaveProduct" />
        </Button>
      </div>
    </React.Fragment>
  );
}
