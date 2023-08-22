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
 
const TABS = [
  {
    label: "All Products",
    value: "All_Products",
  },
  {
    label: "Low Stock",
    value: "Low_Stock",
  },
  {
    label: "Out of Stock",
    value: "Out_of_Stock",
  },
];
 
const TABLE_HEAD = ["Product Code", "Product", "Quantity", "Status", "Unit Price","Total",""];
 
const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "Compressor X156",
    Description: "200ML V12",
    P_Code: "15894564564",
    Quantity: "2",
    Unit: "100",
    status: "Low Stock",
    Total: "200",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "Compressor X156",
    Description: "200ML V12",
    P_Code: "15894564564",
    Quantity: "5",
    Unit: "100",
    status: "High Stock",
    Total: "500",
  },
];
 
export default function OrderTable() {
  const LightModeState=useSelector(state=>state.lightMode)
  return (
    <>
      <CardHeader floated={false} shadow={false} className={`rounded-none bg-transparent ${LightModeState==LightMode().type?"tc-whiteTheme_T1 ":"tc-darkTheme_T1 "}`}>
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" >
              Ordered Products list
            </Typography>
            <Typography  className="mt-1 font-normal">
              See information about all the ordered products
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
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
              ({ img, name, Description, P_Code,Quantity,Unit, status, Total }, index) => {
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
                          #{P_Code}
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
                            {Description}
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
                          {Quantity}x
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
                            status === "High Stock"
                              ? "green"
                              : status === "Low Stock"
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
                        {Unit} TND
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
                    <Tooltip content="Inspect Product">
                      <IconButton variant="text" onClick={()=>{window.location.href="/UCP/Product"}}>
                        <EyeIcon className="h-4 w-4" />
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
        <Typography variant="small" color="blue-gray" className="font-normal">
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