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

  const TABLE_HEAD2_ContactNotification = ["","Email","First Name","Last Name","Phone Number","Message",""];
  const TABLE_HEAD_OrderNotification = ["","Order","Message",""];
   
  const TABLE_ROWS_OrderNotifications = [
    {
      Notification_ID: "156154",
      OrderID: "2",
      NotificationType:"Normal",
      Notification_Message: "Your order is now set to Pending, this usually mean it's gonna take sometime to prepare your order, be patient..",
    },
    {
      Notification_ID: "1687",
      OrderID: "2",
      NotificationType:"Good",
      Notification_Message: "Your order is now ready !",
    }
    
  ];

  const TABLE_ROWS_ContactNofiications = [
    {
      Notification_ID: "1",
      Email: "Hassen@gmail.com",
      F_Name: "Hassen",
      L_Name: "Jeribi",
      PhoneNumber: "56705203",
      NotificationType:"Normal",
      Notification_Message: "Hey I'm looking for a job within your company!",
    },

    {
      Notification_ID: "156",
      Email: "Hassen@gmail.com",
      F_Name: "Hassen",
      L_Name: "Jeribi",
      PhoneNumber: "56705203",
      NotificationType:"Normal",
      Notification_Message: "Hey I'm looking for a job within your company!",
    },
    
  ];
   
  export default function Products() {
    const [OpenCategoryDialog,SetOpenCategoryDialog]=React.useState(false)
    const [OpenDeleteDialog,SetOpenDeleteDialog]=React.useState(false)
    const LightModeState=useSelector(state=>state.lightMode)
    const [SelectedTab,SetSelectedTab] = React.useState("Orders");

    const [AllData,SetAllData] = React.useState(SelectedTab=="Orders"?TABLE_ROWS_OrderNotifications:TABLE_ROWS_ContactNofiications);
    const [VisibleData,SetVisibleData] = React.useState([]);
    const [sortDirection, setSortDirection] = React.useState('asc'); // 'asc' or 'desc'
    const [currentPage, setCurrentPage] = React.useState(1); // 'asc' or 'desc'

    const TABS = [
      {
        label: "Orders",
        value: "Orders",
        Tab_fn:()=>{SetSelectedTab("Orders");SetAllData(TABLE_ROWS_OrderNotifications)}
      },
      {
        label: "Contacts",
        value: "Contacts",
        Tab_fn:()=>{SetSelectedTab("Contacts");SetAllData(TABLE_ROWS_ContactNofiications)}
      }
    ];
    return (
      <>
      <CardHeader floated={false} shadow={false} className={`rounded-none bg-transparent ${LightModeState==LightMode().type?"tc-whiteTheme_T1 ":"tc-darkTheme_T1 "}`}>
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" >
                Inbox
              </Typography>
              <Typography  className="mt-1 font-normal">
                See All your notifications
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value={SelectedTab} className="w-full md:w-max">
              <TabsHeader className=" overflow-auto">
                {TABS.map(({ label, value,Tab_fn }) => (
                  <Tab key={value} value={value} onClick={()=>{Tab_fn()}}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72">
            <Input
                label="Search"
                onChange={(e)=>{SearchRow(TABLE_ROWS_OrderNotifications,AllData,SetAllData,e)}}
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
                {
                SelectedTab=="Orders"?
                TABLE_HEAD_OrderNotification.map((head, index) => (
                  <th
                    onClick={()=>{if(index !== TABLE_HEAD_OrderNotification.length - 1)SortData(head,sortDirection,setSortDirection,VisibleData,SetVisibleData,"Inbox_Order")}} 
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {(index !== TABLE_HEAD_OrderNotification.length - 1 )&& (
                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                )):
                TABLE_HEAD2_ContactNotification.map((head, index) => (
                  <th
                    onClick={()=>{if(index !== TABLE_HEAD2_ContactNotification.length - 1)SortData(head,sortDirection,setSortDirection,VisibleData,SetVisibleData,"Inbox_Contact")}}
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {(index !== TABLE_HEAD2_ContactNotification.length - 1 )&& (
                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                ))
              }
              </tr>
            </thead>
            <tbody>
              {SelectedTab=="Orders"?VisibleData.map(
                ({Notification_ID,NotificationType,OrderID,Notification_Message }, index) => {
                  const isLast = index === TABLE_ROWS_OrderNotifications.length - 1;
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
                            #{Notification_ID}
                          </Typography>
                        </div>
                      </td>
  

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
                      <div className="w-max">
                          <Chip
                            size="sm"
                            variant="filled"
                            value={Notification_Message}
                            color={
                              NotificationType === "Good"
                                ? "green"
                                : NotificationType === "Normal"
                                ? "amber"
                                : "red"
                            }
                          />
                        </div>
                      </td>
                      

                      <td className={classes}>
                    
                      <Tooltip content="Delete Notification">
                        <IconButton variant="text" onClick={()=>{SetOpenDeleteDialog(true)}}>
                        <i class="fa-solid fa-trash"></i>
                        </IconButton>
                      </Tooltip>
  
                      
                      </td>
                    </tr>
                  );
                },
              )
            :VisibleData.map(
              ({Notification_ID,NotificationType,Email,F_Name,L_Name,PhoneNumber,Notification_Message }, index) => {
                const isLast = index === TABLE_ROWS_OrderNotifications.length - 1;
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
                          #{Notification_ID}
                        </Typography>
                      </div>
                    </td>


                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          className="font-normal"
                        >
                          {Email}
                        </Typography>

                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          className="font-normal"
                        >
                          {F_Name}
                        </Typography>

                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          className="font-normal"
                        >
                          {L_Name}
                        </Typography>

                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          className="font-normal"
                        >
                          {PhoneNumber}
                        </Typography>

                      </div>
                    </td>
                    <td className={classes}>
                    <div className="w-max">
                        <Chip
                          size="sm"
                          variant="filled"
                          value={Notification_Message}
                          color={
                            NotificationType === "Good"
                              ? "green"
                              : NotificationType === "Normal"
                              ? "amber"
                              : "red"
                          }
                        />
                      </div>
                    </td>
                    

                    <td className={classes}>
                  
                    <Tooltip content="Delete Notification">
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
        <ConfirmDeleteDialog  Open={OpenDeleteDialog} Action={()=>{console.log("Deleting Notification")}} HandleOpen={()=>{SetOpenDeleteDialog(!OpenDeleteDialog)}} Icon={'<i class="fa-solid fa-trash h-5 w-5 mx-1"></i>'} Title={"Delete Notification"} Content="Are you sure you want to delete this notification?" />
      </>
    );
  }