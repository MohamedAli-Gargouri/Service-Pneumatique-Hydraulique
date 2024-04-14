import { Select, Option, Drawer, IconButton } from '@material-tailwind/react';
import React from 'react';
import Navbar from 'components/NavBar';
import { LightMode } from 'redux/actions/light-actions';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Footer from 'components/footer';
import Productcard from 'components/Card/ProductCard';
import FilterMenu from 'components/FilterMenu';
import Breadcrump from 'components/Breadcrump';
import ProductImage1 from 'assets/images/products/product_1.webp';
import ProductImage2 from 'assets/images/products/product_2.webp';
import ProductImage3 from 'assets/images/products/product_3.webp';
import Pagination from 'utils/Table/Pagination';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';
import { RootState } from 'types/components/general';
Select.propTypes = {
  label: PropTypes.any,
};
const AllData = [
  {
    ProductID: 1,
    ProductShortDesc: 'Best compressor with 200ML Capacity',
    ProductImages: [ProductImage1, ProductImage2, ProductImage3],
    ProductCategory: 'Compressors',
    ProductSubCategory: [
      { id: 51, SubCategoryName: 'Size,200ML', ParentCategory: 2 },
      { id: 52, SubCategoryName: 'Power,10CV', ParentCategory: 1 },
    ],
    ProductBrand: 'Hertz',
    ProductName: 'X1564',
    ProductPrice: 1500,
    ProductLongDesc:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
    ProductInformation:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
    ProductShipping:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
  },
  {
    ProductID: 2,
    ProductShortDesc: 'Shit compressor with 500ML Capacity',
    ProductImages: [ProductImage1, ProductImage2, ProductImage3],
    ProductCategory: 'Compressors',
    ProductSubCategory: [
      { id: 51, SubCategoryName: 'Size,200ML', ParentCategory: 2 },
      { id: 52, SubCategoryName: 'Power,15CV', ParentCategory: 1 },
    ],
    ProductBrand: 'Maxo',
    ProductName: 'B9',
    ProductPrice: 2500,
    ProductLongDesc:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
    ProductInformation:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
    ProductShipping:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
  },
  {
    ProductID: 3,
    ProductShortDesc: 'Shit compressor with 600ML Capacity',
    ProductImages: [ProductImage1, ProductImage2, ProductImage3],
    ProductCategory: 'Tubes',
    ProductSubCategory: [
      { id: 51, SubCategoryName: 'Size,600ML', ParentCategory: 2 },
      { id: 52, SubCategoryName: 'Power,50CV', ParentCategory: 1 },
    ],
    ProductBrand: 'MM',
    ProductName: 'Caddy',
    ProductPrice: 3500,
    ProductLongDesc:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
    ProductInformation:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
    ProductShipping:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
  },
  {
    ProductID: 4,
    ProductShortDesc: 'Shit compressor with 600ML Capacity',
    ProductImages: [ProductImage1, ProductImage2, ProductImage3],
    ProductCategory: 'Tubes',
    ProductSubCategory: [
      { id: 51, SubCategoryName: 'Size,600ML', ParentCategory: 2 },
      { id: 52, SubCategoryName: 'Power,50CV', ParentCategory: 1 },
    ],
    ProductBrand: 'MM',
    ProductName: 'Caddy',
    ProductPrice: 3500,
    ProductLongDesc:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
    ProductInformation:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
    ProductShipping:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
  },
  {
    ProductID: 5,
    ProductShortDesc: 'Shit compressor with 600ML Capacity',
    ProductImages: [ProductImage1, ProductImage2, ProductImage3],
    ProductCategory: 'Tubes',
    ProductSubCategory: [
      { id: 51, SubCategoryName: 'Size,600ML', ParentCategory: 2 },
      { id: 52, SubCategoryName: 'Power,50CV', ParentCategory: 1 },
    ],
    ProductBrand: 'MM',
    ProductName: 'Caddy',
    ProductPrice: 3500,
    ProductLongDesc:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
    ProductInformation:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
    ProductShipping:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
  },
  {
    ProductID: 6,
    ProductShortDesc: 'Shit compressor with 600ML Capacity',
    ProductImages: [ProductImage1, ProductImage2, ProductImage3],
    ProductCategory: 'Tubes',
    ProductSubCategory: [
      { id: 51, SubCategoryName: 'Size,600ML', ParentCategory: 2 },
      { id: 52, SubCategoryName: 'Power,50CV', ParentCategory: 1 },
    ],
    ProductBrand: 'MM',
    ProductName: 'Caddy',
    ProductPrice: 3500,
    ProductLongDesc:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
    ProductInformation:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
    ProductShipping:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
  },
  {
    ProductID: 7,
    ProductShortDesc: 'Shit compressor with 600ML Capacity',
    ProductImages: [ProductImage1, ProductImage2, ProductImage3],
    ProductCategory: 'Tubes',
    ProductSubCategory: [
      { id: 51, SubCategoryName: 'Size,600ML', ParentCategory: 2 },
      { id: 52, SubCategoryName: 'Power,50CV', ParentCategory: 1 },
    ],
    ProductBrand: 'MM',
    ProductName: 'Caddy',
    ProductPrice: 3500,
    ProductLongDesc:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
    ProductInformation:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
    ProductShipping:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
  },
  {
    ProductID: 8,
    ProductShortDesc: 'Shit compressor with 600ML Capacity',
    ProductImages: [ProductImage1, ProductImage2, ProductImage3],
    ProductCategory: 'Tubes',
    ProductSubCategory: [
      { id: 51, SubCategoryName: 'Size,600ML', ParentCategory: 2 },
      { id: 52, SubCategoryName: 'Power,50CV', ParentCategory: 1 },
    ],
    ProductBrand: 'MM',
    ProductName: 'Caddy',
    ProductPrice: 3500,
    ProductLongDesc:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
    ProductInformation:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
    ProductShipping:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
  },
];

export default function Products() {
  const [VisibleData, SetVisibleData] = React.useState([]);
  const [CurrentPage, setCurrentPage] = React.useState(1);
  const smBreakpoint = 540;
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const [DisplayVariant, setDisplayVariant] = React.useState(window.innerWidth < smBreakpoint ? 0 : 1);
  const [MobileDraweropen, SetMobileDraweropen] = React.useState(false);
  const { t } = useTranslation();
  var isLightMode = LightModeState === LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState === LightMode().type;
  }, [LightModeState]);
  const HandleDisplayVariantChange = (type) => {
    setDisplayVariant(type);
  };
  const openMobileDrawer = () => SetMobileDraweropen(true);
  const closeMobileDrawer = () => SetMobileDraweropen(false);
  React.useEffect(() => {
    const handleResize = debounce(() => {
      if (window.innerWidth < smBreakpoint) {
        setDisplayVariant(0);
      } else {
        setDisplayVariant(1);
      }
    }, 50);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className={`Products w-full h-full`}>
      <Drawer
        open={MobileDraweropen}
        onClose={closeMobileDrawer}
        className={`md:hidden overflow-scroll`}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {MobileDraweropen && <FilterMenu IsMobile={true} />}
      </Drawer>

      <Navbar />
      <div className=" w-full pt-[20vh] md:pt-[15vh] ">
        <Breadcrump
          List={true}
          /*Parent={{PageUrl:"/Home",PageName:"Home"}}*/ Child={{
            PageUrl: '/Products',
            PageName: t('Products.Shop'),
          }}
        />
      </div>
      <div className="mb-[1rem] pt-1 w-full grid grid-cols-8 sm:grid-cols-8 md:grid-cols-8 lg:grid-cols-8  ">
        <div className={`hidden md:block  col-span-2 `}>
          <div className="flex justify-center h-full w-full">
            <div className=" p-2  w-full h-full overflow-scroll">
              <FilterMenu IsMobile={false} />
            </div>
          </div>
        </div>

        <div className="fixed z-40 left-0 top-[50vh] Filter md:hidden">
          <IconButton
            onClick={openMobileDrawer}
            size="lg"
            className=" rounded-none rounded-r-full  hover:scale-105"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <i className="fa-solid fa-filter"></i>
          </IconButton>
        </div>

        <div className=" background-secondary col-span-8 md:col-span-6 mt-2 w-full pr-1">
          <div className="flex flex-col justify-center items-stretch ">
            <div className=" flex justify-center items-center gap-1 m-2">
              <div className="Order">
                <Select
                  labelProps={{
                    style: {
                      color: isLightMode ? 'black' : 'white',
                    },
                  }}
                  variant="outlined"
                  size="md"
                  defaultValue={0}
                  label={t('Products.Label.Sortby')}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <Option index={0}>{t('Products.Filter.Default')}</Option>
                  <Option index={1}>{t('Products.Filter.Date')}</Option>
                  <Option index={2}>{t('Products.Filter.Rate')}</Option>
                </Select>
              </div>
              <div>
                <IconButton
                  variant="text"
                  className="md:hidden rounded-full "
                  onClick={() => {
                    HandleDisplayVariantChange(0);
                  }}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <i className="fa-solid fa-square"></i>
                </IconButton>
              </div>

              <div>
                <IconButton
                  variant="text"
                  className="rounded-full "
                  onClick={() => {
                    HandleDisplayVariantChange(1);
                  }}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <i className="fa-solid fa-list"></i>
                </IconButton>
              </div>

              <div className="hidden sm:block">
                <IconButton
                  variant="text"
                  className="rounded-full "
                  onClick={() => {
                    HandleDisplayVariantChange(2);
                  }}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <i className="fa-solid fa-grip-vertical"></i>
                </IconButton>
              </div>

              <div className="hidden lg:block">
                <IconButton
                  variant="text"
                  className=" rounded-full "
                  onClick={() => {
                    HandleDisplayVariantChange(3);
                  }}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <i className="fa-solid fa-grip"></i>
                </IconButton>
              </div>
            </div>

            <div
              className={` p-2 grid gap-4  ${
                DisplayVariant === 1 || DisplayVariant === 0
                  ? 'grid-cols-1'
                  : DisplayVariant === 2
                    ? 'grid-cols-2'
                    : 'grid-cols-3'
              }`}
            >
              {VisibleData.map((Product) => {
                return (
                  <div key={Product.ProductID} className=" col-span-1">
                    <Productcard
                      ProductID={Product.ProductID}
                      ProductShortDescription={Product.ProductShortDesc}
                      ProductImages={Product.ProductImages}
                      ProductCategory={Product.ProductCategory}
                      ProductBrand={Product.ProductBrand}
                      ProductName={Product.ProductName}
                      ProductPrice={Product.ProductPrice}
                      ProductSubCategory={Product.ProductSubCategory}
                      variant={DisplayVariant}
                      ProductLongDesc={Product.ProductLongDesc}
                      ProductInformation={Product.ProductInformation}
                      ProductShipping={Product.ProductShipping}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className=" col-span-8 Pagination flex justify-center items-center mt-4">
          <div>
            <Pagination
              AllData={AllData}
              VisibleData={VisibleData}
              SetVisibleData={SetVisibleData}
              currentPage={CurrentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
