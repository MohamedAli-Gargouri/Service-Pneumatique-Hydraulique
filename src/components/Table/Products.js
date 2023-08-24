import {
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
    EyeIcon,
    XMarkIcon,
    PauseIcon
    ,CurrencyDollarIcon,
    ChevronUpDownIcon
  } from "@heroicons/react/24/outline";
  import { useSelector } from "react-redux/es/hooks/useSelector";
import {LightMode,DarkMode} from "../../redux/actions/LightActions"
import ConfirmDeleteDialog from "../../components/Dialog/Confirm"
import Product_1 from "../../assets/images/products/product_1.png"
import Product_2 from "../../assets/images/products/product_2.png"
import Product_3 from "../../assets/images/products/product_3.png"
import React from "react";
  import {
    Card,
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
  } from "@material-tailwind/react";
  import Pagination from "../../utils/Table/Pagination";
  import SortData from "../../utils/Table/SortRows"
  import TabFilter from "../../utils/Table/TabFilter"
  import SearchRow from "../../utils/Table/Search"

  import CategoryDialog from "../../components/Dialog/Category" 
  import CustomTooltip from "../../components/ToolTip"

   
  const TABLE_HEAD = ["Product Code", "Product", "Price","Status", "Category","Shop Quantity","Stock Quantity" ,"Short Description", "Long Description","Information","Shipping",""];
   
  const TABLE_ROWS = [
    {
      ProductCode: "501",
      img: Product_1,
      Brand: "Hertz",
      Model: "X478897 200ML X1",
      Price: "705",
      Category: "Compressors",
      Shop_Quantity: "20",
      StockRoom_Quantity: "100",
      SDescription: "Impressive Compressor",
      LDescription: "Very impressive Compressor",
      Information: "You need X to do Y and Z",
      Shipping: "VW Caddy 2008 will deliver it to u",
      Status: "Low Stock",
    },
    {
      ProductCode: "650",
      img: Product_2,
      Brand: "Hertz",
      Model: "ABSQD4 200ML X1",
      Price: "250",
      Category: "Compressors",
      Shop_Quantity: "100",
      StockRoom_Quantity: "10",
      SDescription: "Impressive Compressor",
      LDescription: "Very impressive Compressor",
      Information: "You need X to do Y and Z",
      Shipping: "VW Caddy 2008 will deliver it to u",
      Status: "Low Stock",
    },
    {
      ProductCode: "700",
      img: Product_3,
      Brand: "Hertz",
      Model: "X478897 200ML X1",
      Price: "500",
      Category: "Compressors",
      Shop_Quantity: "16",
      StockRoom_Quantity: "100",
      SDescription: "Impressive Compressor",
      LDescription: "Very impressive Compressor",
      Information: "You need X to do Y and Z",
      Shipping: "VW Caddy 2008 will deliver it to u",
      Status: "High Stock",
    }
    ,
    {
      ProductCode: "700",
      img: Product_3,
      Brand: "Hertz",
      Model: "X478897 200ML X1",
      Price: "500",
      Category: "Compressors",
      Shop_Quantity: "16",
      StockRoom_Quantity: "100",
      SDescription: "Impressive Compressor",
      LDescription: "Very impressive Compressor",
      Information: "You need X to do Y and Z",
      Shipping: "VW Caddy 2008 will deliver it to u",
      Status: "High Stock",
    },
    {
      ProductCode: "700",
      img: Product_3,
      Brand: "Hertz",
      Model: "X478897 200ML X1",
      Price: "500",
      Category: "Compressors",
      Shop_Quantity: "16",
      StockRoom_Quantity: "100",
      SDescription: "Impressive Compressor",
      LDescription: "Very impressive Compressor",
      Information: "You need X to do Y and Z",
      Shipping: "VW Caddy 2008 will deliver it to u",
      Status: "High Stock",
    },
    {
      ProductCode: "700",
      img: Product_3,
      Brand: "Hertz",
      Model: "X478897 200ML X1",
      Price: "500",
      Category: "Compressors",
      Shop_Quantity: "16",
      StockRoom_Quantity: "100",
      SDescription: "Impressive Compressor",
      LDescription: "Very impressive Compressor",
      Information: "You need X to do Y and Z",
      Shipping: "VW Caddy 2008 will deliver it to u",
      Status: "High Stock",
    },
    {
      ProductCode: "700",
      img: Product_3,
      Brand: "Hertz",
      Model: "X478897 200ML X1",
      Price: "500",
      Category: "Compressors",
      Shop_Quantity: "16",
      StockRoom_Quantity: "100",
      SDescription: "Impressive Compressor",
      LDescription: "Very impressive Compressor",
      Information: "You need X to do Y and Z",
      Shipping: "VW Caddy 2008 will deliver it to u",
      Status: "High Stock",
    }
    
  ];
   
  export default function Products() {
    const [OpenCategoryDialog,SetOpenCategoryDialog]=React.useState(false)
    const [OpenDeleteDialog,SetOpenDeleteDialog]=React.useState(false)
    const LightModeState=useSelector(state=>state.lightMode)

    const [AllData,SetAllData] = React.useState(TABLE_ROWS);
    const [VisibleData,SetVisibleData] = React.useState([]);
    const [sortDirection, setSortDirection] = React.useState('asc'); // 'asc' or 'desc'
    const [currentPage, setCurrentPage] = React.useState(1); // 'asc' or 'desc'

    const TABS = [
      {
        label: "All",
        value: "All",
        Filter_fn:()=>TabFilter("Status","All",TABLE_ROWS,SetAllData,currentPage)
      },
      {
        label: "Low",
        value: "Low",
        Filter_fn:()=>TabFilter("Status","Low Stock",TABLE_ROWS,SetAllData,currentPage)
      },
      {
        label: "High",
        value: "High",
        Filter_fn:()=>TabFilter("Status","High Stock",TABLE_ROWS,SetAllData,currentPage)
      },
    ];
    return (
      <>
      <CardHeader floated={false} shadow={false} className={`rounded-none bg-transparent ${LightModeState==LightMode().type?"tc-whiteTheme_T1 ":"tc-darkTheme_T1 "}`}>
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" >
                Products list
              </Typography>
              <Typography  className="mt-1 font-normal">
                See information about all Products
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button className="flex items-center gap-3" size="sm" onClick={()=>{window.location.href="/UCP/AddProduct"}}>
              <i class="fa-solid fa-plus"></i> Add Product
              </Button>
              <Button className="flex items-center gap-3" size="sm" onClick={()=>{SetOpenCategoryDialog(true)}}>
              <i class="fa-solid fa-gear"></i> Manage Product Categories
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="All" className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value,Filter_fn }) => (
                  <Tab key={value} value={value} onClick={()=>{Filter_fn()}}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72">
            <Input
                label="Search"
                onChange={(e)=>{SearchRow(TABLE_ROWS,AllData,SetAllData,e)}}
                labelProps={{style:{color:LightModeState==LightMode().type?"black":"white"}}}
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    onClick={()=>{if(index !== TABLE_HEAD.length - 1)SortData(head,sortDirection,setSortDirection,VisibleData,SetVisibleData,"Products")}}
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {VisibleData.map(
                ({ ProductCode,img,Brand,Model,Price,Category,Shop_Quantity,StockRoom_Quantity,SDescription,LDescription,Information,Shipping,Status}, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
   
                  return (
                    <tr key={index}>
  
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            className="font-normal"
                          >
                            #{ProductCode}
                          </Typography>
                        </div>
                      </td>
  
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={img} alt={Brand} size="sm" />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              className="font-normal"
                            >
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
                          <Typography
                            variant="small"
                            className="font-normal"
                          >
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
                                Status === "High Stock"
                                ? "green"
                                : Status === "Low Stock"
                                ? "amber"
                                : "red"
                            }
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            className="font-normal"
                          >
                            {Category}
                          </Typography>
  
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            className="font-normal"
                          >
                            {Shop_Quantity}
                          </Typography>
  
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            className="font-normal"
                          >
                            {StockRoom_Quantity}
                          </Typography>
  
                        </div>
                      </td>

                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            className="font-normal"
                          >
                            <CustomTooltip Header="Short Description" Content={SDescription} />
                          </Typography>
  
                        </div>
                      </td>

                      <td className={classes}>
                        <div className="flex flex-col">
                            <CustomTooltip Header="Short Description" Content={LDescription} />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                            <CustomTooltip Header="Short Description" Content={Information} />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                        <CustomTooltip Header="Short Description" Content={Shipping} />  
                        </div>
                      </td>
                      
                      
                      
                      <td className={classes}>
                      <Tooltip content="Edit Product">
                        <IconButton variant="text" onClick={()=>{window.location.href="/UCP/Product"}}>
                        <i class="fa-solid fa-pen-to-square"></i>
                        </IconButton>
                      </Tooltip>
                     
                      <Tooltip content="Delete Product">
                        <IconButton variant="text" onClick={()=>{SetOpenDeleteDialog(true)}}>
                        <i class="fa-solid fa-trash"></i>
                        </IconButton>
                      </Tooltip>
  
                      
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Pagination
            AllData={AllData}
            VisibleData={VisibleData}
            SetVisibleData={SetVisibleData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}/>
        </CardFooter>
        <ConfirmDeleteDialog  Open={OpenDeleteDialog} Action={()=>{console.log("Deleting Product")}} HandleOpen={()=>{SetOpenDeleteDialog(!OpenDeleteDialog)}} Icon={'<i class="fa-solid fa-trash h-5 w-5 mx-1"></i>'} Title={"Delete Product"} Content="Are you sure you want to delete this product?" />
        <CategoryDialog  Open={OpenCategoryDialog} Action={()=>{console.log("Opening the Catalog")}} HandleOpen={()=>{SetOpenCategoryDialog(!OpenCategoryDialog)}} Icon={'<i class="fa-solid fa-gear"></i>'} Title={"Category Management"} Content="" />
      </>
    );
  }