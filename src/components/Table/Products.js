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
  import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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
   
  import CustomTooltip from "../../components/ToolTip"
  const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Low",
      value: "Low",
    },
    {
      label: "High",
      value: "High",
    },
  ];
   
  const TABLE_HEAD = ["Product Code", "Product", "Price", "Category","Shop Quantity","Stock Quantity" ,"Short Description", "Long Description","Information","Shipping","Status",""];
   
  const TABLE_ROWS = [
    {
      ProductCode: "501",
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
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
    }
    
    
  ];
   
  export default function Products() {
    const LightModeState=useSelector(state=>state.lightMode)
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
              <Button className="flex items-center gap-3" size="sm">
              <i class="fa-solid fa-plus"></i> Add Category
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72">
              <Input
                label="Search"
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
              {TABLE_ROWS.map(
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
                      <Tooltip content="Edit Product">
                        <IconButton variant="text" onClick={()=>{window.location.href="/UCP/Product"}}>
                        <i class="fa-solid fa-pen-to-square"></i>
                        </IconButton>
                      </Tooltip>
                     
                      <Tooltip content="Delete Product">
                        <IconButton variant="text">
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
          <Typography variant="small"  className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </>
    );
  }