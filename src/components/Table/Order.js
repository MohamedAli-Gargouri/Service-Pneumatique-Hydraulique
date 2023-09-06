import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  XMarkIcon,
  PauseIcon,
  CurrencyDollarIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode, DarkMode } from '../../redux/actions/LightActions';
import { PencilIcon, UserPlusIcon } from '@heroicons/react/24/solid';
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
} from '@material-tailwind/react';
import Product_1 from '../../assets/images/products/product_1.png';
import Product_2 from '../../assets/images/products/product_2.png';
import Product_3 from '../../assets/images/products/product_3.png';
import Pagination from '../../utils/Table/Pagination';
import SortData from '../../utils/Table/SortRows';
import TabFilter from '../../utils/Table/TabFilter';
import SearchRow from '../../utils/Table/Search';
import TranslatedText from '../../utils/Translation';
import React from 'react';

const TABLE_HEAD = [
  { label: 'Product Code', value: 'Product Code' },
  {
    label: <TranslatedText TranslationPath="UCP.Order.TabHeader.Product" />,
    value: 'Product',
  },
  {
    label: <TranslatedText TranslationPath="UCP.Order.TabHeader.Quantity" />,
    value: 'Quantity',
  },
  {
    label: <TranslatedText TranslationPath="UCP.Order.TabHeader.Status" />,
    value: 'Status',
  },
  {
    label: <TranslatedText TranslationPath="UCP.Order.TabHeader.Price" />,
    value: 'Unit Price',
  },
  {
    label: <TranslatedText TranslationPath="UCP.Order.TabHeader.Total" />,
    value: 'Total',
  },
];

const TABLE_ROWS = [
  {
    img: Product_1,
    name: 'Compressor X56',
    Description: '200ML V12',
    P_Code: '1',
    Quantity: '2',
    Unit: '50',
    status: 'Low Stock',
    Total: '200',
  },
  {
    img: Product_2,
    name: 'Compressor X1',
    Description: '200ML V12',
    P_Code: '2',
    Quantity: '5',
    Unit: '100',
    status: 'High Stock',
    Total: '500',
  },
  {
    img: Product_3,
    name: 'Compressor X66',
    Description: '300ML V12',
    P_Code: '3',
    Quantity: '1',
    Unit: '500',
    status: 'Low Stock',
    Total: '100',
  },
  {
    img: Product_3,
    name: 'Compressor X66',
    Description: '300ML V12',
    P_Code: '4',
    Quantity: '1',
    Unit: '500',
    status: 'Unavailable',
    Total: '100',
  },
];

export default function OrderTable() {
  const LightModeState = useSelector((state) => state.lightMode);
  const [AllData, SetAllData] = React.useState(TABLE_ROWS);
  const [VisibleData, SetVisibleData] = React.useState([]);
  const [sortDirection, setSortDirection] = React.useState('asc'); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = React.useState(1);
  const TABS = [
    {
      label: <TranslatedText TranslationPath="UCP.Order.TabFilter.All" />,
      value: 'All',
      Filter_fn: () =>
        TabFilter('status', 'All', TABLE_ROWS, SetAllData, currentPage),
    },
    {
      label: <TranslatedText TranslationPath="UCP.Order.TabFilter.Low" />,
      value: 'Low',
      Filter_fn: () =>
        TabFilter('status', 'Low Stock', TABLE_ROWS, SetAllData, currentPage),
    },
    {
      label: <TranslatedText TranslationPath="UCP.Order.TabFilter.High" />,
      value: 'High',
      Filter_fn: () =>
        TabFilter('status', 'High Stock', TABLE_ROWS, SetAllData, currentPage),
    },
    {
      label: (
        <TranslatedText TranslationPath="UCP.Order.TabFilter.Unavailable" />
      ),
      value: 'Unavailable',
      Filter_fn: () =>
        TabFilter('status', 'Unavailable', TABLE_ROWS, SetAllData, currentPage),
    },
  ];

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
              <TranslatedText TranslationPath="UCP.Order.Title" />
            </Typography>
            <Typography className="mt-1 font-normal">
              <TranslatedText TranslationPath="UCP.Order.Description" />
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="All" className="w-full md:w-max">
            <TabsHeader className=" overflow-auto">
              {TABS.map(({ label, value, Filter_fn }) => (
                <Tab
                  style={{ textWrap: 'nowrap' }}
                  key={value}
                  value={value}
                  onClick={() => {
                    Filter_fn();
                  }}
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
                SearchRow(TABLE_ROWS, AllData, SetAllData, e);
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
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  onClick={() => {
                    if (index !== TABLE_HEAD.length - 1) {
                      SortData(
                        head.value,
                        sortDirection,
                        setSortDirection,
                        VisibleData,
                        SetVisibleData,
                        'Order',
                      );
                    }
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
            {VisibleData.map(
              (
                {
                  img,
                  name,
                  Description,
                  P_Code,
                  Quantity,
                  Unit,
                  status,
                  Total,
                },
                index,
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50';

                return (
                  <tr key={P_Code}>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography variant="small" className="font-normal">
                          #{P_Code}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={img} alt={name} size="sm" />
                        <div className="flex flex-col">
                          <Typography variant="small" className="font-normal">
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
                        <Typography variant="small" className="font-normal">
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
                            status === 'High Stock'
                              ? 'green'
                              : status === 'Low Stock'
                              ? 'amber'
                              : 'red'
                          }
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" className="font-normal">
                        {Unit} TND
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" className="font-normal">
                        {Total} TND
                      </Typography>
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
          setCurrentPage={setCurrentPage}
        />
      </CardFooter>
    </>
  );
}
