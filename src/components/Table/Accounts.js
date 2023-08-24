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
import ConfirmDialog from "../../components/Dialog/Confirm"
import Person_1 from "../../assets/images/Person 1.jpg"
import Person_2 from "../../assets/images/Person 2.jpg"
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
   
  const TABLE_HEAD = ["Account ID", "Username", "Full Name","privilege", "Total Spent",""];
   
  const TABLE_ROWS = [
    {
      AccountId: "1",
      Img: Person_1,
      UserName: "Housi",
      FirstName: "Hassen",
      LastName: "Jeribi",
      Privilege: "Client",
      TotalSpent: "10000",
    },
    {
      AccountId: "6",
      Img: Person_1,
      UserName: "DALI",
      FirstName: "Mohamed Ali",
      LastName: "Gargouri",
      Privilege: "Employee",
      TotalSpent: "0",
    },
    {
      AccountId: "2",
      Img: Person_2,
      UserName: "Loukka",
      FirstName: "Melek",
      LastName: "Hachicha",
      Privilege: "Admin",
      TotalSpent: "0",
    },
    
  ];
   
  export default function Products() {
    const [OpenDeleteDialog,SetOpenDeleteDialog]=React.useState(false)
    const [OpenConfirmAdminDialog,SetOpenConfirmAdminDialog]=React.useState(false)
    const [OpenConfirmEmployeeDialog,SetOpenConfirmEmployeeDialog]=React.useState(false)
    const [OpenConfirmRemovePermissionDialog,SetOpenConfirmRemovePermissionDialog]=React.useState(false)
    const LightModeState=useSelector(state=>state.lightMode)

    const [AllData,SetAllData] = React.useState(TABLE_ROWS);
    const [VisibleData,SetVisibleData] = React.useState([]);
    const [sortDirection, setSortDirection] = React.useState('asc'); // 'asc' or 'desc'
    const [currentPage, setCurrentPage] = React.useState(1);
    const TABS = [
      {
        label: "All",
        value: "All",
        Filter_fn:()=>TabFilter("Privilege","All",TABLE_ROWS,SetAllData,currentPage)
      },
      {
        label: "Admin",
        value: "Admin",
        Filter_fn:()=>TabFilter("Privilege","Admin",TABLE_ROWS,SetAllData,currentPage)
      },
      {
        label: "Employee",
        value: "Employee",
        Filter_fn:()=>TabFilter("Privilege","Employee",TABLE_ROWS,SetAllData,currentPage)
      },
    ];
    return (
      <>
      <CardHeader floated={false} shadow={false} className={`rounded-none bg-transparent ${LightModeState==LightMode().type?"tc-whiteTheme_T1 ":"tc-darkTheme_T1 "}`}>
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" >
                Accounts list
              </Typography>
              <Typography  className="mt-1 font-normal">
                See information about all platform Accounts
              </Typography>
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
                    onClick={()=>{if(index !== TABLE_HEAD.length - 1)SortData(head,sortDirection,setSortDirection,VisibleData,SetVisibleData,"Accounts")}}
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
                ({AccountId,Img,UserName,FirstName,LastName,Privilege,TotalSpent }, index) => {
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
                            #{AccountId}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            className="font-normal"
                          >
                            #{UserName}
                          </Typography>
                        </div>
                      </td>
  
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={Img}  size="sm" />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              className="font-normal"
                            >
                              {FirstName}
                            </Typography>
                            <Typography
                              variant="small"
                              className="font-normal opacity-70"
                            >
                              {LastName}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                      <div className="w-max">
                          <Chip
                            size="sm"
                            variant="filled"
                            value={Privilege}
                            color={
                              Privilege === "Client"
                                ? "green"
                                : Privilege === "Employee"
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
                            {TotalSpent}
                          </Typography>
  
                        </div>
                      </td>
                      
                      <td className={classes}>
                      <Tooltip content="Set Admin">
                        <IconButton variant="text" onClick={()=>{SetOpenConfirmAdminDialog(true)}} >
                        <i class="fa-solid fa-shield"></i>
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Set Employee">
                        <IconButton variant="text" onClick={()=>{SetOpenConfirmEmployeeDialog(true)}}>
                        <i class="fa-solid fa-shield-halved"></i>
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Remove Permissions">
                        <IconButton variant="text" onClick={()=>{SetOpenConfirmRemovePermissionDialog(true)}}>
                        <i class="fa-solid fa-handshake-slash w-5 h-5 mx-1"></i>
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Delete Account">
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
        <ConfirmDialog  Open={OpenDeleteDialog} Action={()=>{console.log("Deleting Account")}} HandleOpen={()=>{SetOpenDeleteDialog(!OpenDeleteDialog)}} Icon={'<i class="fa-solid fa-trash h-5 w-5 mx-1"></i>'} Title={"Delete Account"} Content="Are you sure you want to delete this Account?" />
        <ConfirmDialog  Open={OpenConfirmAdminDialog} Action={()=>{console.log("Setting user to admin")}} HandleOpen={()=>{SetOpenConfirmAdminDialog(!OpenConfirmAdminDialog)}} Icon={'<i class="fa-solid fa-shield h-5 w-5 mx-1"></i>'} Title={"Admin Permission"} Content="Are you sure you want to give this user an admin  permission?" />
        <ConfirmDialog  Open={OpenConfirmEmployeeDialog} Action={()=>{console.log("Setting user to employee")}} HandleOpen={()=>{SetOpenConfirmEmployeeDialog(!OpenConfirmEmployeeDialog)}} Icon={'<i class="fa-solid fa-shield-halved h-5 w-5 mx-1"></i>'} Title={"Employee Permission"} Content="Are you sure you want to give this user an employee permission?" />
        <ConfirmDialog  Open={OpenConfirmRemovePermissionDialog} Action={()=>{console.log("Setting user to employee")}} HandleOpen={()=>{SetOpenConfirmRemovePermissionDialog(!OpenConfirmRemovePermissionDialog)}} Icon={'<i class="fa-solid fa-handshake-slash w-5 h-5 mx-1"></i>'} Title={"Remove Permissions"} Content="Are you sure you want to remove this user's permissions and set him back to being a standard client?" />
      </>
    );
  }