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
 
const TABLE_HEAD = ["Order ID", "Client", "Number", "Status", "Date","Total",""];
 
const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    number: "56705203",
    OrderID: "123576",
    Total: "5000TND",
    status: "paid",
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    number: "56705203",
    OrderID: "123576",
    Total: "5000TND",
    status: "paid",
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    number: "56705203",
    OrderID: "123576",
    Total: "5000TND",
    status: "paid",
    date: "23/04/18",
  },
  
];
 
export default function OrdersTable() {
  const LightModeState=useSelector(state=>state.lightMode)
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
                        {Total}
                      </Typography>
                    </td>
                    <td className={classes}>
                    <Tooltip content="Inspect Order">
                      <IconButton variant="text" onClick={()=>{window.location.href="/UCP/Order"}}>
                        <EyeIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                   
                    <Tooltip content="Confirm Payment">
                      <IconButton variant="text">
                        <CurrencyDollarIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip content="Pause Order">
                      <IconButton variant="text">
                        <PauseIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Cancel Order">
                      <IconButton variant="text">
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