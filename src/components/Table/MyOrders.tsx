import { MagnifyingGlassIcon, EyeIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import {
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
import { LightMode } from '../../redux/actions/light-actions';
import ConfirmDialog from '../Dialog/Confirm';
import React from 'react';
import Pagination from '../../utils/Table/Pagination';
import SortData from '../../utils/Table/SortRows';
import TabFilter from '../../utils/Table/TabFilter';
import SearchRow from '../../utils/Table/Search';
import { useNotify } from '../../utils/hooks/useNotify';
import { useTranslation } from 'react-i18next';
import { RootState } from 'types/components/general';
import { openCart } from 'redux/actions/cart-actions';

export default function MyOrders_Table() {
  const { t } = useTranslation();
  const TABLE_HEAD = [
    {
      label: t('UCP.MyOrdersTable.TabHeader.OrderID'),
      value: 'Order',
    },
    {
      label: t('UCP.MyOrdersTable.TabHeader.Employee'),
      value: 'Employee',
    },
    {
      label: t('UCP.MyOrdersTable.TabHeader.Status'),
      value: 'Status',
    },
    {
      label: t('UCP.MyOrdersTable.TabHeader.Date'),
      value: 'Date',
    },
    {
      label: t('UCP.MyOrdersTable.TabHeader.Total'),
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
  const dispatch = useDispatch();
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const toggleCart = () => {
    dispatch(openCart());
  };
  const [ConfirmCancelDialog, SetConfirmCancelDialog] = React.useState(false);
  const [AllData, SetAllData] = React.useState(TABLE_ROWS);
  const [VisibleData, SetVisibleData] = React.useState([]);
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'dec'>('asc'); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = React.useState(1); // 'asc' or 'desc'
  const { displayNotification, displayPromiseNotification } = useNotify();
  const TABS = [
    {
      label: t('UCP.MyOrdersTable.TabFilter.All'),
      value: 'All',
      Filter_fn: () => TabFilter('status', 'All', TABLE_ROWS, SetAllData, currentPage),
    },

    {
      label: t('UCP.MyOrdersTable.TabFilter.Paid'),
      value: 'Paid',
      Filter_fn: () => TabFilter('status', 'Paid', TABLE_ROWS, SetAllData, currentPage),
    },
    {
      label: t('UCP.MyOrdersTable.TabFilter.Ready'),
      value: 'Ready',
      Filter_fn: () => TabFilter('status', 'Ready', TABLE_ROWS, SetAllData, currentPage),
    },
    {
      label: t('UCP.MyOrdersTable.TabFilter.Pending'),
      value: 'Pending',
      Filter_fn: () => TabFilter('status', 'Pending', TABLE_ROWS, SetAllData, currentPage),
    },
    {
      label: t('UCP.MyOrdersTable.TabFilter.Paused'),
      value: 'Paused',
      Filter_fn: () => TabFilter('status', 'Paused', TABLE_ROWS, SetAllData, currentPage),
    },
    {
      label: t('UCP.MyOrdersTable.TabFilter.Cancelled'),
      value: 'Cancelled',
      Filter_fn: () => TabFilter('status', 'Cancelled', TABLE_ROWS, SetAllData, currentPage),
    },
  ];

  const HandleOrdercancel = () => {
    try {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('API Fetch is done!');
        }, 1000);
      });

      displayPromiseNotification(promise, [], []);
    } catch (e) {
      /*Catch Logic here*/
    }
  };
  return (
    <>
      <CardHeader
        floated={false}
        shadow={false}
        className={`rounded-none bg-transparent `}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="mb-8 flex items-center justify-between gap-1">
          <div>
            <Typography
              variant="h5"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {t('UCP.MyOrdersTable.Title')}
            </Typography>
            <Typography
              className="mt-1 font-normal"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {t('UCP.MyOrdersTable.Description')}
            </Typography>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              onClick={() => {
                toggleCart();
              }}
              className="flex  items-center gap-3"
              size="sm"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              {t('UCP.MyOrdersTable.TabActions.AddOrder')}
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="All" className="w-full md:w-max">
            <TabsHeader
              className=" overflow-auto"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {TABS.map(({ label, value, Filter_fn }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => {
                    Filter_fn();
                  }}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label={t('Global.Actions.Search')}
              onChange={(e) => {
                SearchRow(TABLE_ROWS, AllData, SetAllData, e);
              }}
              labelProps={{
                style: {
                  color: LightModeState === LightMode().type ? 'black' : 'white',
                },
              }}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody
        className="overflow-scroll px-0"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  onClick={() => {
                    if (index !== TABLE_HEAD.length - 1)
                      SortData(head.value, sortDirection, setSortDirection, VisibleData, SetVisibleData, 'MyOrders');
                  }}
                  key={head.value}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {head.label}{' '}
                    {index !== TABLE_HEAD.length - 1 && <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {VisibleData.map(({ img, name, email, Total, status, OrderID, online, date }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

              return (
                <tr key={OrderID}>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        className="font-normal"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        #{OrderID}
                      </Typography>
                    </div>
                  </td>

                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={img}
                        alt={name}
                        size="sm"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          className="font-normal"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          {name}
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal opacity-70"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
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
                          status === 'Paid' || status === 'Ready'
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
                    <Typography
                      variant="small"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {date}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
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
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
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
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <i className="fa-solid fa-xmark h-4 w-4"></i>
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter
        className="flex items-center justify-between border-t border-blue-gray-50 p-4"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Pagination
          AllData={AllData}
          VisibleData={VisibleData}
          SetVisibleData={SetVisibleData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </CardFooter>
      <ConfirmDialog
        color="red"
        Open={ConfirmCancelDialog}
        Action={HandleOrdercancel}
        HandleOpen={() => {
          SetConfirmCancelDialog(!ConfirmCancelDialog);
        }}
        Icon={'<i className="fa-solid fa-store-slash h-4 w-4 m-1"></i>'}
        Title={'Cancel Order'}
        Content={t('UCP.DialogMessages.MyOrders.DeleteOrder_Confirm')}
      />
    </>
  );
}
