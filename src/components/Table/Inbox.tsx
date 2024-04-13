import { MagnifyingGlassIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/light-actions';
import ConfirmDeleteDialog from '../Dialog/Confirm';
import React from 'react';
import {
  CardHeader,
  Input,
  Typography,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  IconButton,
} from '@material-tailwind/react';
import Pagination from '../../utils/Table/Pagination';
import SortData from '../../utils/Table/SortRows';
import SearchRow from '../../utils/Table/Search';
import { useNotify } from '../../utils/hooks/useNotify';
import { RootState } from 'types/components/general';
import { useTranslation } from 'react-i18next';

export default function Inbox_Table() {
  const { t } = useTranslation();
  const TABLE_HEAD2_ContactNotification = [
    {
      label: t('UCP.InboxTable.TabHeader.ID'),
      value: '',
    },
    {
      label: t('UCP.InboxTable.TabHeader.Email'),
      value: 'Email',
    },
    {
      label: t('UCP.InboxTable.TabHeader.FirstName'),
      value: 'First Name',
    },
    {
      label: t('UCP.InboxTable.TabHeader.LastName'),
      value: 'Last Name',
    },
    {
      label: t('UCP.InboxTable.TabHeader.PhoneNumber'),
      value: 'Phone Number',
    },
    {
      label: t('UCP.InboxTable.TabHeader.Message'),
      value: 'Message',
    },
    { label: '', value: '' },
  ];

  const TABLE_HEAD_OrderNotification = [
    {
      label: t('UCP.InboxTable.TabHeader.ID'),
      value: '',
    },
    {
      label: t('UCP.InboxTable.TabHeader.Order'),
      value: 'Order',
    },
    {
      label: t('UCP.InboxTable.TabHeader.Message'),
      value: 'Message',
    },
    { label: '', value: '' },
  ];

  const TABLE_ROWS_OrderNotifications = [
    {
      Notification_ID: 10,
      OrderID: 2,
      NotificationType: 'Normal',
      Notification_Message:
        "Your order is now set to Pending, this usually mean it's gonna take sometime to prepare your order, be patient..",
    },
    {
      Notification_ID: 11,
      OrderID: 3,
      NotificationType: 'Good',
      Notification_Message: 'Your order is now ready !',
    },
  ];

  const TABLE_ROWS_ContactNofiications = [
    {
      Notification_ID: 1,
      Email: 'Hassen@gmail.com',
      F_Name: 'Hassen',
      L_Name: 'Jeribi',
      PhoneNumber: '56705203',
      NotificationType: 'Normal',
      Notification_Message: "Hey I'm looking for a job within your company!",
    },

    {
      Notification_ID: 2,
      Email: 'Hassen@gmail.com',
      F_Name: 'Hassen',
      L_Name: 'Jeribi',
      PhoneNumber: '56705203',
      NotificationType: 'Normal',
      Notification_Message: "Hey I'm looking for a job within your company!",
    },
  ];
  const TABS = [
    {
      label: t('UCP.InboxTable.TabFilter.Orders'),
      value: 'Orders',
      Tab_fn: () => {
        SetSelectedTab('Orders');
      },
    },
    {
      label: t('UCP.InboxTable.TabFilter.Contacts'),
      value: 'Contacts',
      Tab_fn: () => {
        SetSelectedTab('Contacts');
      },
    },
  ];
  const [OpenDeleteDialog, SetOpenDeleteDialog] = React.useState(false);
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const [SelectedTab, SetSelectedTab] = React.useState('Orders');
  const { displayNotification, displayPromiseNotification } = useNotify();
  const [AllOrders, SetAllOrders] = React.useState(TABLE_ROWS_OrderNotifications);
  const [AllContacts, SetAllContacts] = React.useState(TABLE_ROWS_ContactNofiications);
  const [VisibleData, SetVisibleData] = React.useState([]);
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'dec'>('asc'); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = React.useState(1); // 'asc' or 'desc'

  const HandleNotificationDelete = () => {
    try {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('API Fetch is done!');
        }, 3000);
      });

      displayPromiseNotification(promise, [], []);
    } catch (e) {
      /*Catch Logic here*/
    }
  };

  const HandleMessageDelete = () => {
    try {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('API Fetch is done!');
        }, 3000);
      });

      displayPromiseNotification(promise, [], []);
    } catch (e) {
      /*Catch logic here */
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
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography
              variant="h5"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {t('UCP.InboxTable.Title')}
            </Typography>
            <Typography
              className="mt-1 font-normal"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {t('UCP.InboxTable.Description')}
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value={SelectedTab} className="w-full md:w-max">
            <TabsHeader
              className=" overflow-auto"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {TABS.map(({ label, value, Tab_fn }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => {
                    Tab_fn();
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
                SearchRow(
                  SelectedTab == 'Orders' ? TABLE_ROWS_OrderNotifications : TABLE_ROWS_ContactNofiications,
                  SelectedTab == 'Orders' ? AllOrders : AllContacts,
                  SelectedTab == 'Orders' ? SetAllOrders : SetAllContacts,
                  e,
                );
              }}
              labelProps={{
                style: {
                  color: LightModeState == LightMode().type ? 'black' : 'white',
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
              {SelectedTab == 'Orders'
                ? TABLE_HEAD_OrderNotification.map((head, index) => (
                    <th
                      key={'Orders_TableHead' + index}
                      onClick={() => {
                        if (index !== TABLE_HEAD_OrderNotification.length - 1)
                          SortData(
                            head.value,
                            sortDirection,
                            setSortDirection,
                            VisibleData,
                            SetVisibleData,
                            'Inbox_Order',
                          );
                      }}
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
                        {index !== TABLE_HEAD_OrderNotification.length - 1 && (
                          <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                        )}
                      </Typography>
                    </th>
                  ))
                : TABLE_HEAD2_ContactNotification.map((head, index) => (
                    <th
                      onClick={() => {
                        if (index !== TABLE_HEAD2_ContactNotification.length - 1)
                          SortData(
                            head.value,
                            sortDirection,
                            setSortDirection,
                            VisibleData,
                            SetVisibleData,
                            'Inbox_Contact',
                          );
                      }}
                      key={'Contacts_TableHead' + index}
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
                        {index !== TABLE_HEAD2_ContactNotification.length - 1 && (
                          <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                        )}
                      </Typography>
                    </th>
                  ))}
            </tr>
          </thead>
          <tbody>
            {SelectedTab == 'Orders'
              ? AllOrders.map(
                  (
                    Order,

                    index,
                  ) => {
                    const isLast = index === TABLE_ROWS_OrderNotifications.length - 1;
                    const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

                    return (
                      <tr key={'Order' + Order.Notification_ID}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
                            #{Order.Notification_ID}
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
                            #{Order.OrderID}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Chip
                            size="sm"
                            variant="filled"
                            value={Order.Notification_Message}
                            color={
                              Order.NotificationType === 'Good'
                                ? 'green'
                                : Order.NotificationType === 'Normal'
                                  ? 'amber'
                                  : 'red'
                            }
                          />
                        </td>

                        <td className={classes}>
                          <IconButton
                            variant="text"
                            onClick={() => {
                              SetOpenDeleteDialog(true);
                            }}
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </IconButton>
                        </td>
                      </tr>
                    );
                  },
                )
              : AllContacts.map((Contact, index) => {
                  const isLast = index === TABLE_ROWS_OrderNotifications.length - 1;
                  const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

                  return (
                    <tr key={'Contacts' + Contact.Notification_ID}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          #{Contact.Notification_ID}
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
                          {Contact.Email}
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
                          {Contact.F_Name}
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
                          {Contact.L_Name}
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
                          {Contact.PhoneNumber}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Chip
                          size="sm"
                          variant="filled"
                          value={Contact.Notification_Message}
                          color={
                            Contact.NotificationType === 'Good'
                              ? 'green'
                              : Contact.NotificationType === 'Normal'
                                ? 'amber'
                                : 'red'
                          }
                        />
                      </td>

                      <td className={classes}>
                        <IconButton
                          variant="text"
                          onClick={() => {
                            SetOpenDeleteDialog(true);
                          }}
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </IconButton>
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
          AllData={SelectedTab == 'Orders' ? AllOrders : AllContacts}
          VisibleData={VisibleData}
          SetVisibleData={SetVisibleData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </CardFooter>
      {SelectedTab == 'Orders' ? (
        <ConfirmDeleteDialog
          color="red"
          Open={OpenDeleteDialog}
          Action={HandleNotificationDelete}
          HandleOpen={() => {
            SetOpenDeleteDialog(!OpenDeleteDialog);
          }}
          Icon={'<i className="fa-solid fa-trash h-5 w-5 mx-1"></i>'}
          Title={t('UCP.DialogMessages.Inbox.DeleteNotification_Title')}
          Content={t('UCP.DialogMessages.Inbox.DeleteNotification_Confirm')}
        />
      ) : (
        <ConfirmDeleteDialog
          color="red"
          Open={OpenDeleteDialog}
          Action={HandleMessageDelete}
          HandleOpen={() => {
            SetOpenDeleteDialog(!OpenDeleteDialog);
          }}
          Icon={'<i className="fa-solid fa-trash h-5 w-5 mx-1"></i>'}
          Title={t('UCP.DialogMessages.Inbox.DeleteMessage_Title')}
          Content={t('UCP.DialogMessages.Inbox.DeleteMessage_Confirm')}
        />
      )}
    </>
  );
}
