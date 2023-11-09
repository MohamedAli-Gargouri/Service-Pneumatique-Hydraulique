import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/LightActions';
import ConfirmDeleteDialog from '../../components/Dialog/Confirm';
import Product_1 from '../../assets/images/products/product_1.webp';
import Product_2 from '../../assets/images/products/product_2.webp';
import Product_3 from '../../assets/images/products/product_3.webp';
import React from 'react';
import {
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Spinner
} from '@material-tailwind/react';
import SortData from '../../utils/Table/SortRows';
import TabFilter from '../../utils/Table/TabFilter';
import SearchRow from '../../utils/Table/Search';
import TranslatedText from '../../utils/Translation';
import CategoryDialog from '../../components/Dialog/Category';
import CustomTooltip from '../../components/ToolTip';
import { CreateToast } from '../../utils/Toast';
import ReactDOMServer from 'react-dom/server';
import Pagination from '../../utils/Table/tablePagination';
import {getProducts} from "../../services/products/index"
import {getImageBlobUrl} from "../../utils/file"
import noImgProduct from "../../assets/images/products/noImgProduct.webp"
const TABLE_HEAD = [
  {
    label: (
      <TranslatedText TranslationPath="UCP.Products.TabHeader.ProductCode" />
    ),
    value: 'Product Code',
  },
  {
    label: <TranslatedText TranslationPath="UCP.Products.TabHeader.Product" />,
    value: 'Product',
  },
  {
    label: <TranslatedText TranslationPath="UCP.Products.TabHeader.Price" />,
    value: 'Price',
  },
  {
    label: <TranslatedText TranslationPath="UCP.Products.TabHeader.Status" />,
    value: 'Status',
  },
  {
    label: <TranslatedText TranslationPath="UCP.Products.TabHeader.Quantity" />,
    value: 'Category',
  },
  {
    label: (
      <TranslatedText TranslationPath="UCP.Products.TabHeader.ShopQuantity" />
    ),
    value: 'Shop Quantity',
  },
  {
    label: (
      <TranslatedText TranslationPath="UCP.Products.TabHeader.StockQuantity" />
    ),
    value: 'Stock Quantity',
  },
  {
    label: (
      <TranslatedText TranslationPath="UCP.Products.TabHeader.ShortDescription" />
    ),
    value: 'Short Description',
  },
  {
    label: (
      <TranslatedText TranslationPath="UCP.Products.TabHeader.LongDescription" />
    ),
    value: 'Long Description',
  },
  {
    label: (
      <TranslatedText TranslationPath="UCP.Products.TabHeader.Information" />
    ),
    value: 'Information',
  },
  {
    label: <TranslatedText TranslationPath="UCP.Products.TabHeader.Shipping" />,
    value: 'Shipping',
  },
  { label: '', value: '' },
];

const TABLE_ROWS = [
  {
    ProductCode: '501',
    img: Product_1,
    Brand: 'Hertz',
    Model: 'X478897 200ML X1',
    Price: '705',
    Category: 'Compressors',
    Shop_Quantity: '20',
    StockRoom_Quantity: '100',
    SDescription: 'Impressive Compressor',
    LDescription: 'Very impressive Compressor',
    Information: 'You need X to do Y and Z',
    Shipping: 'VW Caddy 2008 will deliver it to u',
    Status: 'Low Stock',
  },
  {
    ProductCode: '502',
    img: Product_2,
    Brand: 'Hertz',
    Model: 'ABSQD4 200ML X1',
    Price: '250',
    Category: 'Compressors',
    Shop_Quantity: '100',
    StockRoom_Quantity: '10',
    SDescription: 'Impressive Compressor',
    LDescription: 'Very impressive Compressor',
    Information: 'You need X to do Y and Z',
    Shipping: 'VW Caddy 2008 will deliver it to u',
    Status: 'Low Stock',
  },
  {
    ProductCode: '503',
    img: Product_3,
    Brand: 'Hertz',
    Model: 'X478897 200ML X1',
    Price: '500',
    Category: 'Compressors',
    Shop_Quantity: '16',
    StockRoom_Quantity: '100',
    SDescription: 'Impressive Compressor',
    LDescription: 'Very impressive Compressor',
    Information: 'You need X to do Y and Z',
    Shipping: 'VW Caddy 2008 will deliver it to u',
    Status: 'High Stock',
  },
  {
    ProductCode: '504',
    img: Product_3,
    Brand: 'Hertz',
    Model: 'X478897 200ML X1',
    Price: '500',
    Category: 'Compressors',
    Shop_Quantity: '16',
    StockRoom_Quantity: '100',
    SDescription: 'Impressive Compressor',
    LDescription: 'Very impressive Compressor',
    Information: 'You need X to do Y and Z',
    Shipping: 'VW Caddy 2008 will deliver it to u',
    Status: 'High Stock',
  },
  {
    ProductCode: '506',
    img: Product_3,
    Brand: 'Hertz',
    Model: 'X478897 200ML X1',
    Price: '500',
    Category: 'Compressors',
    Shop_Quantity: '16',
    StockRoom_Quantity: '100',
    SDescription: 'Impressive Compressor',
    LDescription: 'Very impressive Compressor',
    Information: 'You need X to do Y and Z',
    Shipping: 'VW Caddy 2008 will deliver it to u',
    Status: 'High Stock',
  },
  {
    ProductCode: '507',
    img: Product_3,
    Brand: 'Hertz',
    Model: 'X478897 200ML X1',
    Price: '500',
    Category: 'Compressors',
    Shop_Quantity: '16',
    StockRoom_Quantity: '100',
    SDescription: 'Impressive Compressor',
    LDescription: 'Very impressive Compressor',
    Information: 'You need X to do Y and Z',
    Shipping: 'VW Caddy 2008 will deliver it to u',
    Status: 'High Stock',
  },
  {
    ProductCode: '508',
    img: Product_3,
    Brand: 'Hertz',
    Model: 'X478897 200ML X1',
    Price: '500',
    Category: 'Compressors',
    Shop_Quantity: '16',
    StockRoom_Quantity: '100',
    SDescription: 'Impressive Compressor',
    LDescription: 'Very impressive Compressor',
    Information: 'You need X to do Y and Z',
    Shipping: 'VW Caddy 2008 will deliver it to u',
    Status: 'High Stock',
  },
];

export default function Products_Table() {
  const accessToken = useSelector((state) => state.userAccessToken);
  const [OpenCategoryDialog, SetOpenCategoryDialog] = React.useState(false);
  const [OpenDeleteDialog, SetOpenDeleteDialog] = React.useState(false);
  const LightModeState = useSelector((state) => state.lightMode);

  const [data, setData] = React.useState([]);
  const [sortDirection, setSortDirection] = React.useState('asc'); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = React.useState(0); // 'asc' or 'desc'
  const [totalPages, setTotalPages] = React.useState(1);
  const [isLoadingTable, setIsLoadingTable] = React.useState(false);
  const TABS = [
    {
      label: <TranslatedText TranslationPath="UCP.Products.TabFilter.All" />,
      value: 'All',     
    },
    {
      label: <TranslatedText TranslationPath="UCP.Products.TabFilter.Low" />,
      value: 'Low',
    },
    {
      label: <TranslatedText TranslationPath="UCP.Products.TabFilter.High" />,
      value: 'High',
    },
  ];

//This function calls the backend and gets the filtered data based on the filter type
  async function filterData(filterName)
  {
    let newData=[]
    setIsLoadingTable(true)
    const requestResponse=await getProducts(5,currentPage,false,
      filterName=="All"?false:filterName=="Low"?true:false,
      filterName=="All"?false:filterName=="High"?true:false,accessToken)
      console.log(requestResponse)
    const promises=requestResponse.data.content.map(async(product)=>{
      
      let blobProductImg=noImgProduct
      if(product.productImages.length>0)
      {
        blobProductImg=await getImageBlobUrl(product.productImages[0].extension,product.productImages[0].fileBinary)
      }

      newData=[...newData,{
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
        Status: (product.stockQuantity+product.storeQuantity<10)?"Low Stock":"High Stock",
      }]
    
    
    })
    
    await Promise.all(promises)
    setData(newData)
    setTotalPages(requestResponse.data.totalPages)
    setIsLoadingTable(false)
  }
  React.useEffect(()=>{
    async function loadData()
    {
      let newData=[]
      setIsLoadingTable(true)
      const requestResponse=await getProducts(5,currentPage,false,false,false,accessToken)
      console.log(requestResponse)
      const promises=requestResponse.data.content.map(async(product)=>{
        
        let blobProductImg=noImgProduct
        if(product.productImages.length>0)
        {
          blobProductImg=await getImageBlobUrl(product.productImages[0].extension,product.productImages[0].fileBinary)
        }

        newData=[...newData,{
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
          Status: (product.stockQuantity+product.storeQuantity<10)?"Low Stock":"High Stock",
        }]
      
      
      })
      
      await Promise.all(promises)
      console.log(newData)
      setData(newData)
      setTotalPages(requestResponse.data.totalPages)
      setIsLoadingTable(false)
      
    }

    loadData()
  },[currentPage])
  const HandleProductDelete = () => {
    try {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('API Fetch is done!');
        }, 3000);
      });

      CreateToast(
        promise,
        "",
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Products.DeleteProduct_Success" />
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Promise.Pending" />
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Products.DeleteProduct_Error" />
        ),
        /*Custom request Errors message*/
        [],
        /*Custom Request Error codes */
        [],
        /*Default Connection Errors */
        [
        ReactDOMServer.renderToStaticMarkup(<TranslatedText TranslationPath="UCP.DialogMessages.Connection.ConnectionLost" />),
        ReactDOMServer.renderToStaticMarkup(<TranslatedText TranslationPath="UCP.DialogMessages.Connection.ServerLoaded" />),
        ReactDOMServer.renderToStaticMarkup(<TranslatedText TranslationPath="UCP.DialogMessages.Connection.ServiceUnavaiable" />)
        ],
        'promise',
        LightModeState == LightMode().type,
      );
    } catch (e) {/*Catch Logic here*/}
  };
  return (
    <>
      <CardHeader
        floated={false}
        shadow={false}
        className={`rounded-none bg-transparent ${
          LightModeState == LightMode().type
            ? 'tc-whiteTheme_T1 '
            : 'tc-darkTheme_T1 '
        }`}
      >
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5">
              <TranslatedText TranslationPath="UCP.Products.Title" />
            </Typography>
            <Typography className="mt-1 font-normal">
              <TranslatedText TranslationPath="UCP.Products.Description" />
            </Typography>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-3"
              size="sm"
              onClick={() => {
                window.location.href = '/UCP/AddProduct';
              }}
            >
              <i className="fa-solid fa-plus"></i>{' '}
              <TranslatedText TranslationPath="UCP.Products.TabActions.AddProduct" />
            </Button>
            <Button
              className="flex items-center gap-3"
              size="sm"
              onClick={() => {
                SetOpenCategoryDialog(true);
              }}
            >
              <i className="fa-solid fa-gear"></i>
              <TranslatedText TranslationPath="UCP.Products.TabActions.ManageCategory" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="All" className="w-full md:w-max">
            <TabsHeader className=" overflow-auto">
              {TABS.map(({ label, value }) => (
                <Tab
                  style={{ textWrap: 'nowrap' }}
                  key={value}
                  value={value}
                  onClick={() => {filterData(value)}}
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label={<TranslatedText TranslationPath="Global.Actions.Search" />}
              onChange={(e) => {
                SearchRow(TABLE_ROWS, data, setData, e);
              }}
              labelProps={{
                style: {
                  color: LightModeState == LightMode().type ? 'black' : 'white',
                },
              }}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
      {isLoadingTable?<div className=' w-full flex justify-center items-center'>
            <Spinner color="red" className=" m-2 h-5 w-5" />  
            </div>
            :
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  onClick={() => {
                    if (index !== TABLE_HEAD.length - 1)
                      SortData(
                        head.value,
                        sortDirection,
                        setSortDirection,
                        data,
                        setData,
                        'Products',
                      );
                  }}
                  key={head.value}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head.label}{' '}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {
            data.map(
              (
                {
                  ProductCode,
                  img,
                  Brand,
                  Model,
                  Price,
                  Category,
                  Shop_Quantity,
                  StockRoom_Quantity,
                  SDescription,
                  LDescription,
                  Information,
                  Shipping,
                  Status,
                },
                index,
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50';

                return (
                  <tr key={ProductCode}>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography variant="small" className="font-normal">
                          #{ProductCode}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={img} alt={Brand} size="sm" />
                        <div className="flex flex-col">
                          <Typography variant="small" className="font-normal">
                            {Brand}
                          </Typography>
                          <Typography
                            variant="small"
                            className="font-normal opacity-70"
                          >
                            {Model}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography variant="small" className="font-normal">
                          {Price}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          size="sm"
                          variant="filled"
                          value={Status}
                          color={
                            Status === 'High Stock'
                              ? 'green'
                              : Status === 'Low Stock'
                              ? 'amber'
                              : 'red'
                          }
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography variant="small" className="font-normal">
                          {Category}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography variant="small" className="font-normal">
                          {Shop_Quantity}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography variant="small" className="font-normal">
                          {StockRoom_Quantity}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography variant="small" className="font-normal">
                          <CustomTooltip
                            Header="Short Description"
                            Content={SDescription}
                          />
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      <div className="flex flex-col">
                        <CustomTooltip
                          Header="Short Description"
                          Content={LDescription}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <CustomTooltip
                          Header="Short Description"
                          Content={Information}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <CustomTooltip
                          Header="Short Description"
                          Content={Shipping}
                        />
                      </div>
                    </td>

                    <td className={classes}>
                      <Tooltip content="Edit Product">
                        <IconButton
                          variant="text"
                          onClick={() => {
                            window.location.href = '/UCP/Product';
                          }}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </IconButton>
                      </Tooltip>

                      <Tooltip content="Delete Product">
                        <IconButton
                          variant="text"
                          onClick={() => {
                            SetOpenDeleteDialog(true);
                          }}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>}
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </CardFooter>
      <ConfirmDeleteDialog
        color="red"
        Open={OpenDeleteDialog}
        Action={HandleProductDelete}
        HandleOpen={() => {
          SetOpenDeleteDialog(!OpenDeleteDialog);
        }}
        Icon={'<i className="fa-solid fa-trash h-5 w-5 mx-1"></i>'}
        Title={
          <TranslatedText TranslationPath="UCP.DialogMessages.Products.DeleteProduct_Title" />
        }
        Content={
          <TranslatedText TranslationPath="UCP.DialogMessages.Products.DeleteProduct_Confirm" />
        }
      />
      <CategoryDialog
        Open={OpenCategoryDialog}
        Action={() => {
        }}
        HandleOpen={() => {
          SetOpenCategoryDialog(!OpenCategoryDialog);
        }}
        Icon={'<i className="fa-solid fa-gear"></i>'}
        Title={
          <TranslatedText TranslationPath="UCP.DialogMessages.Category.Category_Title" />
        }
        Content=""
      />
    </>
  );
}
