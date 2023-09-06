import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  XMarkIcon,
  PauseIcon,
  CurrencyDollarIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/outline';
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
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode, DarkMode } from '../../redux/actions/LightActions';
import { OPENCART } from '../../redux/actions/cartActions';
import ConfirmDialog from '../Dialog/Confirm';
import React from 'react';
import Pagination from '../../utils/Table/Pagination';
import SortData from '../../utils/Table/SortRows';
import TabFilter from '../../utils/Table/TabFilter';
import SearchRow from '../../utils/Table/Search';
import TranslatedText from '../../utils/Translation';
import { CreateToast } from '../../utils/Toast';
import ReactDOMServer from 'react-dom/server';
const TABLE_HEAD = [
  {
    label: (
      <TranslatedText TranslationPath="UCP.MyOrdersTable.TabHeader.OrderID" />
    ),
    value: 'Order',
  },
  {
    label: (
      <TranslatedText TranslationPath="UCP.MyOrdersTable.TabHeader.Employee" />
    ),
    value: 'Employee',
  },
  {
    label: (
      <TranslatedText TranslationPath="UCP.MyOrdersTable.TabHeader.Status" />
    ),
    value: 'Status',
  },
  {
    label: (
      <TranslatedText TranslationPath="UCP.MyOrdersTable.TabHeader.Date" />
    ),
    value: 'Date',
  },
  {
    label: (
      <TranslatedText TranslationPath="UCP.MyOrdersTable.TabHeader.Total" />
    ),
    value: 'Total',
  },
  { label: '', value: '' },
];

const TABLE_ROWS = [
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg',
    name: 'A',
    email: 'john@creative-tim.com',
    OrderID: '1',
    Total: '100',
    status: 'Paid',
    date: '01/04/18',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg',
    name: 'C',
    email: 'john@creative-tim.com',
    OrderID: '2',
    Total: '200',
    status: 'Pending',
    date: '2/04/2018',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg',
    name: 'B',
    email: 'john@creative-tim.com',
    OrderID: '3',
    Total: '5000',
    status: 'Paused',
    date: '3/04/2018',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg',
    name: 'G',
    email: 'john@creative-tim.com',
    OrderID: '4',
    Total: '700',
    status: 'Cancelled',
    date: '06/04/2018',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg',
    name: 'E',
    email: 'john@creative-tim.com',
    OrderID: '5',
    Total: '50',
    status: 'Pending',
    date: '08/04/2018',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg',
    name: 'F',
    email: 'john@creative-tim.com',
    OrderID: '6',
    Total: '250',
    status: 'Ready',
    date: '9/04/2018',
  },
];

export default function MyOrdersTable() {
  const dispatch = useDispatch();
  const LightModeState = useSelector((state) => state.lightMode);
  const toggleCart = () => {
    dispatch(OPENCART());
  };
  const [ConfirmCancelDialog, SetConfirmCancelDialog] = React.useState(false);
  const [AllData, SetAllData] = React.useState(TABLE_ROWS);
  const [VisibleData, SetVisibleData] = React.useState([]);
  const [sortDirection, setSortDirection] = React.useState('asc'); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = React.useState(1); // 'asc' or 'desc'

  const TABS = [
    {
      label: (
        <TranslatedText TranslationPath="UCP.MyOrdersTable.TabFilter.All" />
      ),
      value: 'All',
      Filter_fn: () =>
        TabFilter('status', 'All', TABLE_ROWS, SetAllData, currentPage),
    },

    {
      label: (
        <TranslatedText TranslationPath="UCP.MyOrdersTable.TabFilter.Paid" />
      ),
      value: 'Paid',
      Filter_fn: () =>
        TabFilter('status', 'Paid', TABLE_ROWS, SetAllData, currentPage),
    },
    {
      label: (
        <TranslatedText TranslationPath="UCP.MyOrdersTable.TabFilter.Ready" />
      ),
      value: 'Ready',
      Filter_fn: () =>
        TabFilter('status', 'Ready', TABLE_ROWS, SetAllData, currentPage),
    },
    {
      label: (
        <TranslatedText TranslationPath="UCP.MyOrdersTable.TabFilter.Pending" />
      ),
      value: 'Pending',
      Filter_fn: () =>
        TabFilter('status', 'Pending', TABLE_ROWS, SetAllData, currentPage),
    },
    {
      label: (
        <TranslatedText TranslationPath="UCP.MyOrdersTable.TabFilter.Paused" />
      ),
      value: 'Paused',
      Filter_fn: () =>
        TabFilter('status', 'Paused', TABLE_ROWS, SetAllData, currentPage),
    },
    {
      label: (
        <TranslatedText TranslationPath="UCP.MyOrdersTable.TabFilter.Cancelled" />
      ),
      value: 'Cancelled',
      Filter_fn: () =>
        TabFilter('status', 'Cancelled', TABLE_ROWS, SetAllData, currentPage),
    },
  ];

  const HandleOrdercancel = () => {
    try {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('API Fetch is done!');
        }, 1000);
      });

      CreateToast(
        promise,
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.MyOrders.DeleteOrder_Success" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.MyOrders.DeleteOrder_Success" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Promise.Pending" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.MyOrders.DeleteOrder_Error" />,
        ),
        'promise',
        LightModeState == LightMode().type,
      );
    } catch (e) {}
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
              <TranslatedText TranslationPath="UCP.MyOrdersTable.Title" />
            </Typography>
            <Typography className="mt-1 font-normal">
              <TranslatedText TranslationPath="UCP.MyOrdersTable.Description" />
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              onClick={() => {
                toggleCart();
              }}
              className="flex items-center gap-3"
              size="sm"
            >
              <i class="fa-solid fa-cart-shopping"></i>{' '}
              <TranslatedText TranslationPath="UCP.MyOrdersTable.TabActions.AddOrder" />
            </Button>
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
                    if (index !== TABLE_HEAD.length - 1)
                      SortData(
                        head.value,
                        sortDirection,
                        setSortDirection,
                        VisibleData,
                        SetVisibleData,
                        'MyOrders',
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
            {VisibleData.map(
              (
                { img, name, email, Total, status, OrderID, online, date },
                index,
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50';

                return (
                  <tr key={OrderID}>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography variant="small" className="font-normal">
                          #{OrderID}
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
                            status === 'Paid' || status == 'Ready'
                              ? 'green'
                              : status === 'Pending'
                              ? 'amber'
                              : status === 'Paused'
                              ? 'pink'
                              : 'red'
                          }
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" className="font-normal">
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" className="font-normal">
                        {Total} TND
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Inspect Order">
                        <IconButton
                          variant="text"
                          onClick={() => {
                            window.location.href = '/UCP/Order';
                          }}
                        >
                          <EyeIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Cancel Order">
                        <IconButton
                          variant="text"
                          onClick={() => {
                            SetConfirmCancelDialog(true);
                          }}
                        >
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
          AllData={AllData}
          VisibleData={VisibleData}
          SetVisibleData={SetVisibleData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </CardFooter>
      <ConfirmDialog
        Open={ConfirmCancelDialog}
        Action={HandleOrdercancel}
        HandleOpen={() => {
          SetConfirmCancelDialog(!ConfirmCancelDialog);
        }}
        Icon={'<i class="fa-solid fa-store-slash h-4 w-4 m-1"></i>'}
        Title={'Cancel Order'}
        Content={
          <TranslatedText TranslationPath="UCP.DialogMessages.MyOrders.DeleteOrder_Confirm" />
        }
      />
    </>
  );
}
