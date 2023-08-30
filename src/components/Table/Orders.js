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
import { useSelector } from "react-redux/es/hooks/useSelector";
import {LightMode,DarkMode} from "../../redux/actions/LightActions"
import React from "react";
import ConfirmDialog from "../Dialog/Confirm"
import Pagination from "../../utils/Table/Pagination";
import SortData from "../../utils/Table/SortRows"
import TabFilter from "../../utils/Table/TabFilter"
import SearchRow from "../../utils/Table/Search"

 
const TABLE_HEAD = ["Order ID", "Client", "Number", "Status", "Date","Total",""];
 
const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "A",
    email: "john@creative-tim.com",
    number: "567052031",
    OrderID: "1",
    Total: "500",
    status: "Cancelled",
    date: "15/04/2018",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "B",
    email: "john@creative-tim.com",
    number: "5670520314",
    OrderID: "2",
    Total: "50",
    status: "Paid",
    date: "01/04/2018",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "C",
    email: "john@creative-tim.com",
    number: "5670520",
    OrderID: "3",
    Total: "5",
    status: "Pending",
    date: "23/04/2018",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "D",
    email: "john@creative-tim.com",
    number: "567052",
    OrderID: "4",
    Total: "5000",
    status: "Cancelled",
    date: "02/04/2018",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "G",
    email: "john@creative-tim.com",
    number: "56705",
    OrderID: "6",
    Total: "50000",
    status: "Ready",
    date: "04/04/2018",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "E",
    email: "john@creative-tim.com",
    number: "567",
    OrderID: "5",
    Total: "500000",
    status: "Paused",
    date: "05/04/2018",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "F",
    email: "john@creative-tim.com",
    number: "5",
    OrderID: "7",
    Total: "50000000",
    status: "Paused",
    date: "06/04/2018",
  },
  
];

export default function OrdersTable() {
  const LightModeState=useSelector(state=>state.lightMode)
  const [OpenConfirmDialog_Cancel,SetOpenConfirmDialog_Cancel]=React.useState(false)
  const [OpenConfirmDialog_Pause,SetOpenConfirmDialog_Pause]=React.useState(false)
  const [OpenConfirmDialog_Resume,SetOpenConfirmDialog_Resume]=React.useState(false)
  const [OpenConfirmDialog_Ready,SetOpenConfirmDialog_Ready]=React.useState(false)
  const [OpenConfirmDialog_Pay,SetOpenConfirmDialog_Pay]=React.useState(false)
  
  const [AllData,SetAllData] = React.useState(TABLE_ROWS);
  const [VisibleData,SetVisibleData] = React.useState([]);
  const [sortDirection, setSortDirection] = React.useState('asc'); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = React.useState(1);

  const TABS = [
    {
      label: "All",
      value: "All",
      Filter_fn:()=>TabFilter("status","All",TABLE_ROWS,SetAllData,currentPage)
    },
    {
      label: "Paid",
      value: "Paid",
      Filter_fn:()=>TabFilter("status","Paid",TABLE_ROWS,SetAllData,currentPage)
    },
    {
      label: "Ready",
      value: "Ready",
      Filter_fn:()=>TabFilter("status","Ready",TABLE_ROWS,SetAllData,currentPage)
    },
    {
      label: "Pending",
      value: "Pending",
      Filter_fn:()=>TabFilter("status","Pending",TABLE_ROWS,SetAllData,currentPage)
    },
    {
      label: "Paused",
      value: "Paused",
      Filter_fn:()=>TabFilter("status","Paused",TABLE_ROWS,SetAllData,currentPage)
    },
    {
      label: "Cancelled",
      value: "Cancelled",
      Filter_fn:()=>TabFilter("status","Cancelled",TABLE_ROWS,SetAllData,currentPage)
    },
  ];
  return (
    <>
      <CardHeader floated={false} shadow={false} className={`rounded-none bg-transparent ${LightModeState==LightMode().type?"tc-whiteTheme_T1 ":"tc-darkTheme_T1 "}`}>
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" >
              Orders list
            </Typography>
            <Typography  className="mt-1 font-normal">
              See information about all Orders
            </Typography>
          </div>
          
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Tabs value="All" className="w-full md:w-max">
              <TabsHeader className=" overflow-auto">
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
                  onClick={()=>{if(index !== TABLE_HEAD.length - 1)SortData(head,sortDirection,setSortDirection,VisibleData,SetVisibleData,"Orders")}}
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
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          className="font-normal"
                        >
                          {number}
                        </Typography>

                      </div>
                    </td>
                    <td className={classes}>
                    <div className="w-max">
                        <Chip
                          size="sm"
                          variant="filled"
                          value={status}
                          color={
                            (status === "Paid" ||status==="Ready")
                              ? "green"
                              : status === "Pending"
                              ? "amber"
                              : status === "Paused"
                              ?"pink"
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
                   
                    <Tooltip content="Mark Order as PAID">
                      <IconButton variant="text" onClick={()=>{SetOpenConfirmDialog_Pay(true)}}>
                        <CurrencyDollarIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Mark Order as READY">
                      <IconButton variant="text" onClick={()=>{SetOpenConfirmDialog_Ready(true)}}>
                      <i class="fa-solid fa-clipboard-check"></i>
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip content="Resume Order">
                      <IconButton variant="text" onClick={()=>{SetOpenConfirmDialog_Resume(true)}}>
                      <i class="fa-solid fa-play"></i>
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Pause Order">
                      <IconButton variant="text" onClick={()=>{SetOpenConfirmDialog_Pause(true)}}>
                        <PauseIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Cancel Order">
                      <IconButton variant="text" onClick={()=>{SetOpenConfirmDialog_Cancel(true)}}>
                        <XMarkIcon className="h-4 w-4" />
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
      <ConfirmDialog  Open={OpenConfirmDialog_Cancel} Action={()=>{console.log("Terminate Order")}} HandleOpen={()=>{SetOpenConfirmDialog_Cancel(!OpenConfirmDialog_Cancel)}} Icon={'<i class="fa-solid fa-ban h-5 w-5 mx-1"></i>'} Title={"Terminate Order"} Content="Are you sure you want to Terminate the order" />
      <ConfirmDialog color="yellow" Open={OpenConfirmDialog_Pause} Action={()=>{console.log("Pause Order")}} HandleOpen={()=>{SetOpenConfirmDialog_Pause(!OpenConfirmDialog_Pause)}} Icon={'<i class="fa-solid fa-circle-pause h-5 w-5 mx-1"></i>'} Title={"Pause Order"} Content="Are you sure you want to Pause the order?" />
      <ConfirmDialog color="green" Open={OpenConfirmDialog_Resume} Action={()=>{console.log("Resume Order")}} HandleOpen={()=>{SetOpenConfirmDialog_Resume(!OpenConfirmDialog_Resume)}} Icon={'<i class="fa-solid fa-play h-5 w-5 mx-1"></i>'} Title={"Resume Order"} Content="Are you sure you want to resume this order?" />
      <ConfirmDialog color="green" Open={OpenConfirmDialog_Ready} Action={()=>{console.log("Ready Order")}} HandleOpen={()=>{SetOpenConfirmDialog_Ready(!OpenConfirmDialog_Ready)}} Icon={'<i class="fa-solid fa-clipboard-check h-5 w-5 mx-1"></i>'} Title={"Ready Order"} Content="Are you sure you want to mark this order as ready?" />
      <ConfirmDialog color="green" Open={OpenConfirmDialog_Pay} Action={()=>{console.log("Confirm Payment")}} HandleOpen={()=>{SetOpenConfirmDialog_Pay(!OpenConfirmDialog_Pay)}} Icon={'<i class="fa-solid fa-money-bill-1-wave w-5 h-5 mx-1"></i>'} Title={"Confirm Payment"} Content="Are you sure you want to confirm the payment and close the order?" />
    </>
  );
}