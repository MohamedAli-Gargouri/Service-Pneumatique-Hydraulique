import { Input, Button, Select, Option, Textarea } from '@material-tailwind/react';
import React from 'react';
import TranslatedText, { TranslateString } from '../../utils/Translation';
import AnimatedTab from '../../components/Tab';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Gallery from '../../components/Gallery';
import { LightMode } from '../../redux/actions/LightActions';
import { Notify } from '../../utils/Toast/toast';
import MultiSelect from '../Input/MultiSelect';
import { getCategories } from '../../services/category';
import { getSubCategoryValuesByCategory } from '../../services/category';
import { getFileNameFromBlobUrl, convertBlobUrlToFile } from '../../utils/file';
import { readBinaryData } from '../../utils/file';
import { arrayBufferToBase64, getFileExtensionFromArrayBuffer } from '../../utils/file';
import { post_Product } from '../../services/products';
import { VerifyInputs } from '../../utils/others/VerifyInputs';
import { useTranslation } from 'react-i18next';
export default function Product() {
  const LightModeState = useSelector((state) => state.lightMode);
  const accessToken = useSelector((state) => state.userAccessToken);
  const AddedImages = React.useRef([]);
  const [SubCategories, setSubCategories] = React.useState([]);
  const { t, i18n } = useTranslation();
  var isLightMode = LightModeState == LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState == LightMode().type;
  }, [LightModeState]);
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
  const MultiSelect_SelectData = React.useRef([]);

  const [SelectedCategory, SetSelectedCategory] = React.useState('NOT_SELECTED');
  const [Categories, setCategories] = React.useState([]);

  /*=======Input Refs========*/
  const BrandRef = React.useRef(null);
  const ProductNameRef = React.useRef(null);
  const ProductPriceRef = React.useRef(null);
  const ProductCodeRef = React.useRef(null);
  const StoreQuantityRef = React.useRef(null);
  const StockQuantityRef = React.useRef(null);
  const BriefDescriptionRef = React.useRef(null);
  const LongDescRef = React.useRef();
  const InformationRef = React.useRef();
  const ShippingRef = React.useRef();

  //This useEffect Gets the SubCategories based on the selected Value
  React.useEffect(() => {
    async function LoadSubCategories() {
      const result = await getSubCategoryValuesByCategory(SelectedCategory, accessToken);
      const Temp_SubCategories = [];
      result.data.map((subCategoryValue) => {
        Temp_SubCategories.push({
          SubCategory: subCategoryValue.subCategory.name + ', ' + subCategoryValue.value,
          id: subCategoryValue.id,
        });
      });
      setSubCategories(Temp_SubCategories);
    }

    //Test if it should fetch the data or not.
    if (SelectedCategory != 'NOT_SELECTED') {
      LoadSubCategories();
    }
  }, [SelectedCategory]);

  //This useEffect initliaze the Category List
  React.useEffect(() => {
    async function LoadCategories() {
      const result = await getCategories(0, 0, true, accessToken);
      const Temp_Categories = [];
      result.data.map((category) => {
        Temp_Categories.push({
          categoryID: category.id,
          CategoryName: category.name,
        });
      });
      setCategories(Temp_Categories);
    }
    LoadCategories();
  }, []);

  //This function handles adding a product
  const HandleAddProduct = () => {
    try {
      const Brand = BrandRef.current.value;
      const ProductName = ProductNameRef.current.value;
      const ProductPrice = ProductPriceRef.current.value;
      const ProductCode = ProductCodeRef.current.value;
      const StoreQuantity = StoreQuantityRef.current.value;
      const StockQuantity = StockQuantityRef.current.value;
      const BriefDescription = BriefDescriptionRef.current.querySelector('textarea').value;
      const LongDesc = LongDescRef.current.querySelector('textarea').value;
      const Information = InformationRef.current.querySelector('textarea').value;
      const Shipping = ShippingRef.current.querySelector('textarea').value;
      const Category = SelectedCategory;
      //intializing the formated values
      const SubCategoryValues = [];
      const Images = [];

      //Formating the Selected CategoryValues
      MultiSelect_SelectData.current.map((SubCategoryValue) => {
        SubCategoryValues.push(SubCategoryValue.id);
      });

      if (
        VerifyInputs(
          [Brand, ProductName, BriefDescription, LongDesc, Information, Shipping, Category],
          [],
          [],
          [ProductPrice, ProductCode, StoreQuantity, StockQuantity],
          [],
          [],
          [],
          isLightMode,
        )
      ) {
        //Formating the blob Images to proper Files
        const FileConversionPromises = AddedImages.current.map(async (blob_ImgURL) => {
          const File = await convertBlobUrlToFile(blob_ImgURL, getFileNameFromBlobUrl(blob_ImgURL));
          const fileBinary = await readBinaryData(File);
          const fileBinaryBase64 = arrayBufferToBase64(fileBinary);
          const FileName = File.name.split('.')[0];
          const FileSize = File.size;
          const FileExtension = getFileExtensionFromArrayBuffer(fileBinary);
          Images.push({
            name: FileName,
            extension: FileExtension,
            size: FileSize,
            fileBinary: fileBinaryBase64,
          });
        });
        //Wait for all the file conversation
        Promise.all(FileConversionPromises).then(() => {
          const promise = post_Product(
            ProductCode,
            Brand,
            ProductName,
            ProductPrice,
            StoreQuantity,
            StockQuantity,
            BriefDescription,
            LongDesc,
            Information,
            Shipping,
            Images,
            Category,
            SubCategoryValues,
            accessToken,
          );

          Notify.displayPromiseNotification(
            promise,
            [t('UCP.DialogMessages.Products.AddProduct_ProductCodeExist_Error')],
            ['PRODUCT_ERROR01'],
            isLightMode,
          );
        });
      }
    } catch (e) {
      /**Catch logic here */
    }
  };
  return (
    <React.Fragment>
      <div className="h-full w-full  grid grid-cols-2 gap-2 justify-center items-center ">
        <div className="h-full w-full ImageGallery col-span-2 md:col-span-1 ">
          <Gallery Images={[]} AddedImages={AddedImages} Deletable={true} Addable={true} />
        </div>

        <div className="mt-4 h-full gap-2 w-full Description col-span-2 md:col-span-1 flex flex-col items-center  justify-center">
          <Input
            type="text"
            inputMode="text"
            inputRef={BrandRef}
            labelProps={{
              style: {
                color: isLightMode ? 'black' : 'white',
              },
            }}
            label={'Brand'}
            icon={<i className="fa-solid fa-info"></i>}
          />

          <Input
            type="text"
            inputMode="text"
            inputRef={ProductNameRef}
            labelProps={{
              style: {
                color: isLightMode ? 'black' : 'white',
              },
            }}
            label={t('UCP.AddProduct.TabInputs.PName')}
            icon={<i className="fa-solid fa-info"></i>}
          />

          <Select
            label={t('UCP.AddProduct.TabInputs.PCategory')}
            defaultValue={SelectedCategory}
            onChange={(e) => {
              console.log(e);
              SetSelectedCategory(e);
            }}
          >
            {Categories.map((Category) => {
              return (
                <Option key={Category.categoryID} value={Category.categoryID}>
                  {Category.CategoryName}
                </Option>
              );
            })}
          </Select>

          <div className=" w-full">
            <MultiSelect Data={SubCategories} DataLabelName="SubCategory" SelectData={MultiSelect_SelectData} />
          </div>

          <Input
            type="number"
            inputMode="numeric"
            inputRef={ProductPriceRef}
            labelProps={{
              style: {
                color: isLightMode ? 'black' : 'white',
              },
            }}
            label={t('UCP.AddProduct.TabInputs.PPrice')}
            icon={<i className="fa-solid fa-dollar-sign"></i>}
          />
          <Input
            type="number"
            inputMode="numeric"
            inputRef={ProductCodeRef}
            labelProps={{
              style: {
                color: isLightMode ? 'black' : 'white',
              },
            }}
            label={t('UCP.AddProduct.TabInputs.PCode')}
            icon={<i className="fa-solid fa-barcode"></i>}
          />

          <Input
            type="number"
            inputMode="numeric"
            inputRef={StoreQuantityRef}
            labelProps={{
              style: {
                color: isLightMode ? 'black' : 'white',
              },
            }}
            label={t('UCP.AddProduct.TabInputs.StoreQuantity')}
            icon={<i className="fa-solid fa-store"></i>}
          />
          <Input
            type="number"
            inputMode="numeric"
            inputRef={StockQuantityRef}
            labelProps={{
              style: {
                color: isLightMode ? 'black' : 'white',
              },
            }}
            label={t('UCP.AddProduct.TabInputs.StockQuantity')}
            icon={<i className="fa-solid fa-warehouse"></i>}
          />
          <Textarea
            type="text"
            inputMode="text"
            ref={BriefDescriptionRef}
            labelProps={{
              style: {
                color: isLightMode ? 'black' : 'white',
              },
            }}
            size="lg"
            label={t('UCP.AddProduct.TabInputs.SDescription')}
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
                  type="text"
                  inputMode="text"
                  key={index === 0 ? 'Tab0' : index === 1 ? 'Tab1' : 'Tab2'}
                  ref={index === 0 ? LongDescRef : index === 1 ? InformationRef : ShippingRef}
                  size="lg"
                  label={
                    index === 0
                      ? t('UCP.AddProduct.TabFilter.LDescription')
                      : index === 1
                      ? t('UCP.AddProduct.TabFilter.Additonalinfo')
                      : t('UCP.AddProduct.TabFilter.Shipping')
                  }
                  defaultValue=""
                />
              ),
            }));

            return TempTabs;
          })()}
          DefaultSelectValue={t('Product.Description')}
        />
      </div>

      <div className=" flex justify-center">
        <Button className=" flex items-center gap-3" onClick={HandleAddProduct}>
          <i className="fa-solid fa-plus"></i>
          {t('UCP.AddProduct.TabActions.CreateProduct')}
        </Button>
      </div>
    </React.Fragment>
  );
}
