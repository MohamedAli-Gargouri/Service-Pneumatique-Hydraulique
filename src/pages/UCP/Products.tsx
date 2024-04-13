import { Card } from '@material-tailwind/react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/light-actions';
import Footer from '../../components/footer';
import SideBar from '../../components/SideBar';
import React from 'react';
import TopBar from '../../components/Topbar';
import Topbarbg from '../../assets/images/Topbarbg.webp';
import Grid from '../../components/grid/grid';
import { productsGridColumns } from './Products.config';
import { GridBuilder } from '../../types/components/grid';
import { getProducts } from '../../services/products';
import getImageBlobUrl from '../../utils/file';
import noImgProduct from '../../assets/images/products/noImgProduct.webp';
import { productsGridHeaderWidgets } from './Products.config';
import { Binder } from '../../utils/binder';
import CategoryDialog from '../../components/Dialog/Category';
import { useTranslation } from 'react-i18next';
import { RootState } from 'types/components/general';
import { useNotify } from 'utils/hooks/useNotify';
export default function UCP_Products() {
  /****************************************************************************************************************************** */
  //-------------------------------------------------------------INITIALIZATION--------------------------------------------------//
  /******************************************************************************************************************************/
  const accessToken = useSelector((state: RootState) => state.userAccessToken);
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const { displayNotification, displayPromiseNotification } = useNotify();
  const [data, setData] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [OpenCategoryDialog, SetOpenCategoryDialog] = React.useState(false);
  const { t } = useTranslation();
  var isLightMode = LightModeState === LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState === LightMode().type;
  }, [LightModeState]);

  const gridConfiguration = new GridBuilder()
    .setDataField('ProductCode')
    .setNoDataMessage('No Products Found')
    .setGridTitle('List of Products')
    .setOnSelectionChangeCallBackMethod(onSelectionChange)
    .build();
  function onSelectionChange(event) {
    setSelectedRows(event.selectedRowsData);
  }
  /**
   * This function is responsible for binding the configuration functions to the component's functions.
   */
  function bindConfigurationToComponent() {
    var toolbarWidgets = [
      { id: 0, callbackfunction: handleAddProductClick },
      { id: 1, callbackfunction: handleEditProductClick },
      { id: 2, callbackfunction: handleDeleteProductClick },
      { id: 3, callbackfunction: handleManageCategoryClick },
    ];
    Binder(productsGridHeaderWidgets, toolbarWidgets, 'callbackfunction', 'id');
  }

  function handleAddProductClick() {
    window.location.href = '/UCP/AddProduct';
  }
  function handleEditProductClick() {
    window.location.href = '/UCP/AddProduct';
  }
  function handleDeleteProductClick() {
    try {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('API Fetch is done!');
        }, 3000);
      });

      displayPromiseNotification(promise, [], []);
    } catch (e) {
      /*Catch Logic here*/
    }
  }
  function handleManageCategoryClick() {
    SetOpenCategoryDialog(true);
  }
  React.useEffect(() => {
    async function loadData() {
      let newData = [];
      const requestResponse = await getProducts(5, 0, true, false, false, accessToken);
      const promises = requestResponse.data.map(async (product) => {
        let blobProductImg = noImgProduct;
        if (product.productImages.length > 0) {
          blobProductImg = await getImageBlobUrl(
            product.productImages[0].extension,
            product.productImages[0].fileBinary,
          );
        }

        newData = [
          ...newData,
          {
            ProductCode: product.productCode,
            img: blobProductImg,
            Brand: product.productBrand,
            Model: product.productName,
            Price: product.productPrice,
            Category: product.category.name,
            Shop_Quantity: product.storeQuantity,
            StockRoom_Quantity: product.stockQuantity,
            SDescription: product.shortDescription,
            LDescription: product.longDescription,
            Information: product.additionalInformation,
            Shipping: product.shippingInformation,
            Status: product.stockQuantity + product.storeQuantity < 10 ? 'Low Stock' : 'High Stock',
          },
        ];
      });

      await Promise.all(promises);
      console.log(newData);
      setData(newData);
    }

    loadData();
  }, []);

  bindConfigurationToComponent();
  return (
    <>
      <div className="flex flex-row items-stretch">
        <aside className={`background-secondary mb-2 rounded-b-xl p-4 shadow-lg hidden xl:block w-[20vw] `}>
          <SideBar />
        </aside>

        <main className="w-full min-h-screen flex flex-col justify-start items-center ">
          <section
            className=" flex flex-col justify-center items-stretch w-full text-center h-[17vh] p-4 shadow-xl shadow-blue-gray-900/ bg-cover"
            style={{ backgroundImage: `url(${Topbarbg})` }}
          >
            <TopBar
              SectionName={t('UCP.TopNav.TabTitles.Products')}
              Icon='<i className="fa-solid fa-boxes-stacked"></i>'
            />
          </section>

          <section className="w-full xl:max-w-[80vw] flex  justify-center  text-center">
            <Card
              className={`background-secondary  p-2 w-full  min-h-[82vh] m-2`}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Grid
                configuration={gridConfiguration}
                dataSource={data}
                columns={productsGridColumns}
                widgets={productsGridHeaderWidgets}
              />
            </Card>
          </section>
        </main>
        <CategoryDialog
          Open={OpenCategoryDialog}
          HandleOpen={() => {
            SetOpenCategoryDialog(!OpenCategoryDialog);
          }}
          Icon={'<i className="fa-solid fa-gear"></i>'}
          Title={t('UCP.DialogMessages.Category.Category_Title')}
          Content=""
        />
      </div>
      <Footer />
    </>
  );
}
