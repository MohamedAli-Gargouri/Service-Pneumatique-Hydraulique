import {
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
    EyeIcon,
    XMarkIcon,
    PauseIcon
    ,CurrencyDollarIcon,
    ChevronUpDownIcon
  } from "@heroicons/react/24/outline";
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
  import { useDispatch } from "react-redux/es/hooks/useDispatch";
  import { useSelector } from "react-redux/es/hooks/useSelector";
  import {LightMode,DarkMode} from "../../redux/actions/LightActions"
  import {OPENCART} from "../../redux/actions/cartActions"
  import ConfirmDialog from "../Dialog/Confirm"
  import React from "react";
  import Pagination from "../../utils/Table/Pagination";
  import SortData from "../../utils/Table/SortRows"
  const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Pending",
      value: "Pending",
    },
    {
      label: "Paid",
      value: "Paid",
    },
  ];
   
  const TABLE_HEAD = ["Order", "Employee", "Status", "Date","Total",""];
   
  const TABLE_ROWS = [
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
      name: "A",
      email: "john@creative-tim.com",
      OrderID: "1",
      Total: "100",
      status: "paid",
      date: "01/04/18",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
      name: "C",
      email: "john@creative-tim.com",
      OrderID: "2",
      Total: "200",
      status: "paid",
      date: "2/04/2018",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
      name: "B",
      email: "john@creative-tim.com",
      OrderID: "3",
      Total: "5000",
      status: "paid",
      date: "3/04/2018",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
      name: "G",
      email: "john@creative-tim.com",
      OrderID: "4",
      Total: "700",
      status: "paid",
      date: "06/04/2018",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
      name: "E",
      email: "john@creative-tim.com",
      OrderID: "5",
      Total: "50",
      status: "paid",
      date: "08/04/2018",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
      name: "F",
      email: "john@creative-tim.com",
      OrderID: "6",
      Total: "250",
      status: "paid",
      date: "9/04/2018",
    },
    
    
  ];
   
  export default function MyOrdersTable() {

    const dispatch=useDispatch();
    const LightModeState=useSelector(state=>state.lightMode)
    const toggleCart = () =>{dispatch(OPENCART())};
    const [ConfirmCancelDialog,SetConfirmCancelDialog]=React.useState(false)
    const [Data,SetData] = React.useState([]);
    const [sortDirection, setSortDirection] = React.useState('asc'); // 'asc' or 'desc'



    return (
      <>
      <CardHeader floated={false} shadow={false} className={`rounded-none bg-transparent ${LightModeState==LightMode().type?"tc-whiteTheme_T1 ":"tc-darkTheme_T1 "}`}>
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" >
                My Orders list
              </Typography>
              <Typography  className="mt-1 font-normal">
                See information about all of my Orders
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button onClick={()=>{toggleCart()}} className="flex items-center gap-3" size="sm">
              <i class="fa-solid fa-cart-shopping"></i> Add Order
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
                  onClick={()=>{SortData(head,sortDirection,setSortDirection,Data,SetData,"MyOrders")}}
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
              {
              Data.map(
                ({ img, name, email, Total,status,number, OrderID, online, date }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
   
                  return (
                    <tr key={name}>
  
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            className="font-normal"
                          >
                            #{OrderID}
                          </Typography>
                        </div>
                      </td>
  
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={img} alt={name} size="sm" />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              className="font-normal"
                            >
                              {name}
                            </Typography>
                            <Typography
                              variant="small"
                              className="font-normal opacity-70"
                            >
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>

                      <td className={classes}>
                      <div className="w-max">
                          <Chip
                            size="sm"
                            variant="filled"
                            value={status}
                            color={
                              status === "paid"
                                ? "green"
                                : status === "pending"
                                ? "amber"
                                : "red"
                            }
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal"
                        >
                          {date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal"
                        >
                          {Total} TND
                        </Typography>
                      </td>
                      <td className={classes}>
                      <Tooltip content="Inspect Order">
                        <IconButton variant="text" onClick={()=>{window.location.href="/UCP/Order"}}>
                          <EyeIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Cancel Order" >
                        <IconButton variant="text" onClick={()=>{SetConfirmCancelDialog(true)}} >
                        <i class="fa-solid fa-xmark h-4 w-4"></i>
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
            Data={TABLE_ROWS}
            SetData={SetData}/>
        </CardFooter>
        <ConfirmDialog  Open={ConfirmCancelDialog} Action={()=>{console.log("Canceling order")}} HandleOpen={()=>{SetConfirmCancelDialog(!ConfirmCancelDialog)}} Icon={'<i class="fa-solid fa-store-slash h-4 w-4 m-1"></i>'} Title={"Cancel Order"} Content="Are you sure you wanna cancel your order?" />
      </>
    );
  }