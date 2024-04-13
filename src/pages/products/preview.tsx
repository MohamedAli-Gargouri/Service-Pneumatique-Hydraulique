import { Typography, Button, Rating, Chip } from '@material-tailwind/react';
import React from 'react';
import Navbar from '../../components/NavBar';
import AnimatedTab from '../../components/Tab';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Footer from '../../components/footer';
import Gallery from '../../components/Gallery';
import Breadcrump from '../../components/Breadcrump';
import useCart from '../../utils/hooks/useCart';
import { useTranslation } from 'react-i18next';
import { LightMode } from '../../redux/actions/light-actions';
import { RootState } from 'types/components/general';
export default function PreviewProductComponent() {
  const { OrderCart, AddProduct, SetQuantity, RemoveProduct } = useCart();
  const ProductInfo = JSON.parse(localStorage.getItem('ProductPreviewProps'));
  const { t } = useTranslation();
  const Product = {
    ProductID: ProductInfo.ProductID,
    ProductBrand: ProductInfo.ProductBrand,
    ProductName: ProductInfo.ProductName,
    ProductCategory: ProductInfo.ProductCategory,
    ProductImages: ProductInfo.ProductImages,
    ProductPrice: ProductInfo.ProductPrice,
    ProductQuantity: 1,
  };
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
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  var isLightMode = LightModeState === LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState === LightMode().type;
  }, [LightModeState]);
  return (
    <React.Fragment>
      <Navbar />
      <div className="pt-[20vh] md:pt-[15vh] ">
        <Breadcrump
          List={false}
          Parent={{ PageUrl: '/Products', PageName: t('Product.Shop') }}
          Child={{ PageUrl: '/ProductDetails', PageName: t('Product.Product') }}
        />
      </div>
      <div className="mb-[1rem]  grid grid-cols-2 w-full justify-center items-center gap-3 ">
        <div className="col-span-2 md:col-span-1">
          <Gallery Addable={false} Deletable={false} Images={ProductInfo.ProductImages} />
        </div>

        <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center w-full">
          <Typography
            variant="h5"
            className=" font-semibold"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {ProductInfo.ProductCategory}
          </Typography>

          <Typography
            variant="h6"
            className=" font-thin"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {ProductInfo.ProductBrand}
          </Typography>

          <Typography
            variant="h6"
            className=" font-thin"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {ProductInfo.ProductName}
          </Typography>
          <Rating placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
          <Typography
            variant="h6"
            color="green"
            className=" font-serif"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {ProductInfo.ProductPrice} TND
          </Typography>
          <Typography
            variant="paragraph"
            className=" font-thin m-4 md:m-0"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {ProductInfo.ProductShortDescription}
          </Typography>

          <Button
            className=" my-2 flex items-center justify-center gap-1 w-[50%] hover:scale-110 "
            onClick={() => AddProduct(Product)}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <i className="fa-solid fa-cart-plus"></i> {t('Global.Actions.AddCart')}
          </Button>

          <div className=" mt-2 flex gap-1 justify-center items-center flex-wrap">
            {ProductInfo.ProductSubCategory.map((SubCategory, index) => {
              return <Chip key={'Subcategory' + index} value={SubCategory.SubCategoryName} />;
            })}
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
              <Typography
                key={index === 0 ? 'Tab0' : index === 1 ? 'Tab1' : 'Tab2'}
                variant="paragraph"
                className="font-extralight"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {index === 0
                  ? ProductInfo.ProductLongDesc
                  : index === 1
                    ? ProductInfo.ProductInformation
                    : ProductInfo.ProductShipping}
              </Typography>
            ),
          }));

          return TempTabs;
        })()}
        DefaultSelectValue={t('Product.Description')}
      />

      <Footer />
    </React.Fragment>
  );
}
