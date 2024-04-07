import { Input, Button, Select, Option, Textarea } from '@material-tailwind/react';
import React from 'react';
import AnimatedTab from '../../components/Tab';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Gallery from '../../components/Gallery';
import { Notify } from '../../utils/Toast/toast';
import ProductImg1 from '../../assets/images/products/product_1.webp';
import ProductImg2 from '../../assets/images/products/product_2.webp';
import ProductImg3 from '../../assets/images/products/product_3.webp';
import { LightMode } from '../../redux/actions/LightActions';
import MultiSelect from '../Input/MultiSelect';
import { useTranslation } from 'react-i18next';
export default function Product() {
  const LightModeState = useSelector((state) => state.lightMode);
  const { t, i18n } = useTranslation();
  var isLightMode = LightModeState == LightMode().type;
  const AddedImages = React.useRef([]);
  const [SelectedCategory, SetSelectedCategory] = React.useState('Comp');
  const Categories = [
    { categoryID: 1, CategoryName: 'Compressors', CategoryValue: 'Comp' },
    { categoryID: 2, CategoryName: 'Tubes', CategoryValue: 'Tub' },
    { categoryID: 3, CategoryName: 'Secheurs', CategoryValue: 'Secheur' },
  ];

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

  const Tabs = [
    {
      TabID: 1,
      TabName: t('Product.Description'),
      TabLogo: <i className="fa-solid fa-circle-info mx-2"></i>,
    },
    {
      TabID: 2,
      TabName: t('Product.AddInfo'),
      TabLogo: <i className="fa-solid fa-info mx-2"></i>,
    },
    {
      TabID: 3,
      TabName: t('Product.Shipping'),
      TabLogo: <i className="fa-solid fa-truck-fast mx-2"></i>,
    },
  ];

  const LongDescRef = React.useRef();
  const InformationRef = React.useRef();
  const ShippingRef = React.useRef();
  const HandleEditProduct = () => {
    try {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('API Fetch is done!');
        }, 3000);
      });

      Notify.displayPromiseNotification(promise, [], [], LightModeState == LightMode().type);
    } catch (e) {
      /*Catch logic here */
    }
  };

  return (
    <React.Fragment>
      <div className="h-full w-full gap-2 grid grid-cols-2 justify-center items-center ">
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
            label={t('UCP.EditProduct.TabInputs.PName')}
            icon={<i className="fa-solid fa-info"></i>}
          />

          <Select
            label={t('UCP.AddProduct.TabInputs.PCategory')}
            value={SelectedCategory}
            onChange={(e) => SetSelectedCategory(e)}
          >
            {Categories.map((Category) => {
              return (
                <Option key={Category.categoryID} value={Category.CategoryValue}>
                  {Category.CategoryName}
                </Option>
              );
            })}
          </Select>

          <div className=" w-full">
            <MultiSelect Data={SubCategories} DataLabelName="SubCategory" SelectData={MultiSelect_SelectData} />
          </div>

          <Input
            defaultValue="500TND"
            labelProps={{
              style: {
                color: LightModeState == LightMode().type ? 'black' : 'white',
              },
            }}
            label={t('UCP.EditProduct.TabInputs.PPrice')}
            icon={<i className="fa-solid fa-dollar-sign"></i>}
          />

          <Input
            defaultValue="25648497889"
            labelProps={{
              style: {
                color: LightModeState == LightMode().type ? 'black' : 'white',
              },
            }}
            label={t('UCP.EditProduct.TabInputs.PCode')}
            icon={<i className="fa-solid fa-barcode"></i>}
          />

          <Input
            defaultValue="20"
            labelProps={{
              style: {
                color: LightModeState == LightMode().type ? 'black' : 'white',
              },
            }}
            label={t('UCP.EditProduct.TabInputs.StoreQuantity')}
            icon={<i className="fa-solid fa-store"></i>}
          />
          <Input
            defaultValue="500"
            labelProps={{
              style: {
                color: LightModeState == LightMode().type ? 'black' : 'white',
              },
            }}
            label={t('UCP.EditProduct.TabInputs.StockQuantity')}
            icon={<i className="fa-solid fa-warehouse"></i>}
          />
          <Textarea
            labelProps={{
              style: {
                color: LightModeState == LightMode().type ? 'black' : 'white',
              },
            }}
            size="lg"
            label={t('UCP.EditProduct.TabInputs.SDescription')}
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
                  key={index === 0 ? 'Tab0' : index === 1 ? 'Tab1' : 'Tab2'}
                  ref={index === 0 ? LongDescRef : index === 1 ? InformationRef : ShippingRef}
                  size="lg"
                  label={
                    index === 0
                      ? t('UCP.EditProduct.TabFilter.LDescription')
                      : index === 1
                      ? t('UCP.EditProduct.TabFilter.Additonalinfo')
                      : t('UCP.EditProduct.TabFilter.Shipping')
                  }
                  defaultValue={
                    index === 0
                      ? 'Best Product Description'
                      : index === 1
                      ? 'Best Product Additional Information'
                      : 'Best Product Shipping policies'
                  }
                />
              ),
            }));

            return TempTabs;
          })()}
          DefaultSelectValue={t('Product.Description')}
        />
      </div>

      <div className=" flex justify-center">
        <Button className=" flex items-center gap-3" onClick={HandleEditProduct}>
          <i className="fa-solid fa-floppy-disk"></i>
          {t('UCP.EditProduct.TabActions.SaveProduct')}
        </Button>
      </div>
    </React.Fragment>
  );
}
