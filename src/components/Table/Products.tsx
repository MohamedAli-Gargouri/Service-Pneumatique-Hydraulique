import { MagnifyingGlassIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/light-actions';
import ConfirmDeleteDialog from '../Dialog/Confirm';
import React from 'react';
import { CardHeader, Typography, Button, CardBody, CardFooter, Spinner } from '@material-tailwind/react';
import CategoryDialog from '../Dialog/Category';
import { useNotify } from '../../utils/hooks/useNotify';
import { getProducts } from '../../services/products/index';
import { getImageBlobUrl } from '../../utils/file';
import noImgProduct from '../../assets/images/products/noImgProduct.webp';
import {
  DataGrid,
  Column,
  FilterRow,
  HeaderFilter,
  GroupPanel,
  Scrolling,
  Editing,
  Grouping,
  Lookup,
  MasterDetail,
  Summary,
  RangeRule,
  RequiredRule,
  StringLengthRule,
  GroupItem,
  Pager,
  Paging,
  TotalItem,
  ValueFormat,
  Export,
  Search,
  SearchPanel,
} from 'devextreme-react/data-grid';
import { RootState } from 'redux/reducers';
import { useTranslation } from 'react-i18next';

export default function Products_Table() {
  const allowedPageSizes: ('auto' | 'all' | number)[] = [1, 5, 10, 'all'];
  const displayMode = 'full';
  const accessToken = useSelector((state: RootState) => state.userAccessToken);
  const [OpenCategoryDialog, SetOpenCategoryDialog] = React.useState(false);
  const [OpenDeleteDialog, SetOpenDeleteDialog] = React.useState(false);
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const { displayNotification, displayPromiseNotification } = useNotify();
  const [data, setData] = React.useState([]);
  const [sortDirection, setSortDirection] = React.useState('asc'); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = React.useState(0); // 'asc' or 'desc'
  const [totalPages, setTotalPages] = React.useState(1);
  const [isLoadingTable, setIsLoadingTable] = React.useState(false);
  const exportFormats = ['pdf'];
  const { t, i18n } = useTranslation();
  React.useEffect(() => {
    async function loadData() {
      let newData = [];
      setIsLoadingTable(true);
      const requestResponse = await getProducts(5, currentPage, false, false, false, accessToken);
      console.log(requestResponse);
      const promises = requestResponse.data.content.map(async (product) => {
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
      setTotalPages(requestResponse.data.totalPages);
      setIsLoadingTable(false);
    }

    loadData();
  }, []);
  const HandleProductDelete = () => {
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
  };
  return (
    <>
      <CardHeader
        floated={false}
        shadow={false}
        className={`rounded-none bg-transparent `}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5">{t('UCP.Products.Title')}</Typography>
            <Typography className="mt-1 font-normal">{t('UCP.Products.Description')}</Typography>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-3"
              size="sm"
              onClick={() => {
                window.location.href = '/UCP/AddProduct';
              }}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <i className="fa-solid fa-plus"></i>
              {t('UCP.Products.TabActions.AddProduct')}
            </Button>
            <Button
              className="flex items-center gap-3"
              size="sm"
              onClick={() => {
                SetOpenCategoryDialog(true);
              }}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <i className="fa-solid fa-gear"></i>
              {t('UCP.Products.TabActions.ManageCategory')}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody
        className="overflow-scroll px-0"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {isLoadingTable ? (
          <div className=" w-full flex justify-center items-center">
            <Spinner
              color="red"
              className=" m-2 h-5 w-5"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          </div>
        ) : (
          <DataGrid dataSource={data} showBorders={true} width="100%" showColumnLines={true} showRowLines={true}>
            <Export enabled={true} formats={exportFormats} allowExportSelectedData={true} />
            <Paging defaultPageSize={10} />
            <GroupPanel visible={true} />
            <SearchPanel visible={true} />
            <Grouping autoExpandAll={true} />
            <Pager
              visible={true}
              allowedPageSizes={allowedPageSizes}
              displayMode={displayMode}
              showPageSizeSelector={true}
              showInfo={true}
              showNavigationButtons={true}
            />

            <FilterRow visible={true} />
            <HeaderFilter visible={true} />
            <GroupPanel visible={true} />
            <Scrolling mode="virtual" />
            <Grouping autoExpandAll={false} />

            <Column dataField="ProductCode" caption="CODE" dataType="number"></Column>
            <Column dataField="Brand" caption="BRAND" dataType="string"></Column>
            <Column dataField="Model" caption="MODEL" dataType="string"></Column>
            <Column dataField="Price" caption="PRICE" dataType="number"></Column>
            <Column dataField="Category" caption="CATEGORY" dataType="string"></Column>
            <Column dataField="Shop_Quantity" caption="SHOP QT" dataType="string"></Column>
            <Column dataField="StockRoom_Quantity" caption="STOCK QT" dataType="string"></Column>
            <Column dataField="SDescription" caption="SHORT DESC" dataType="string"></Column>
            <Column dataField="LDescription" caption="LONG DESC" dataType="string"></Column>
            <Column dataField="Information" caption="INFO" dataType="string"></Column>
            <Column dataField="Shipping" caption="SHIPPING" dataType="string"></Column>

            <Summary>
              <TotalItem column="StockRoom_Quantity" summaryType="sum">
                <ValueFormat type="decimal" precision={2} />
              </TotalItem>
              <TotalItem column="Shop_Quantity" summaryType="sum">
                <ValueFormat type="decimal" precision={2} />
              </TotalItem>
            </Summary>
          </DataGrid>
        )}
      </CardBody>
      <CardFooter
        className="flex items-center justify-between border-t border-blue-gray-50 p-4"
        children={''}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      ></CardFooter>
      <ConfirmDeleteDialog
        color="red"
        Open={OpenDeleteDialog}
        Action={HandleProductDelete}
        HandleOpen={() => {
          SetOpenDeleteDialog(!OpenDeleteDialog);
        }}
        Icon={'<i className="fa-solid fa-trash h-5 w-5 mx-1"></i>'}
        Title={t('UCP.DialogMessages.Products.DeleteProduct_Title')}
        Content={t('UCP.DialogMessages.Products.DeleteProduct_Confirm')}
      />
      <CategoryDialog
        Open={OpenCategoryDialog}
        HandleOpen={() => {
          SetOpenCategoryDialog(!OpenCategoryDialog);
        }}
        Icon={'<i className="fa-solid fa-gear"></i>'}
        Title={t('UCP.DialogMessages.Category.Category_Title')}
        Content=""
      />
    </>
  );
}
