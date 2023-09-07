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
import ConfirmDeleteDialog from '../../components/Dialog/Confirm';
import React from 'react';
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
import Pagination from '../../utils/Table/Pagination';
import SortData from '../../utils/Table/SortRows';
import SearchRow from '../../utils/Table/Search';
import TranslatedText from '../../utils/Translation';
import { CreateToast } from '../../utils/Toast';
import ReactDOMServer from 'react-dom/server';

const TABLE_HEAD2_ContactNotification = [
  {
    label: <TranslatedText TranslationPath="UCP.InboxTable.TabHeader.ID" />,
    value: '',
  },
  {
    label: <TranslatedText TranslationPath="UCP.InboxTable.TabHeader.Email" />,
    value: 'Email',
  },
  {
    label: (
      <TranslatedText TranslationPath="UCP.InboxTable.TabHeader.FirstName" />
    ),
    value: 'First Name',
  },
  {
    label: (
      <TranslatedText TranslationPath="UCP.InboxTable.TabHeader.LastName" />
    ),
    value: 'Last Name',
  },
  {
    label: (
      <TranslatedText TranslationPath="UCP.InboxTable.TabHeader.PhoneNumber" />
    ),
    value: 'Phone Number',
  },
  {
    label: (
      <TranslatedText TranslationPath="UCP.InboxTable.TabHeader.Message" />
    ),
    value: 'Message',
  },
  { label: '', value: '' },
];

const TABLE_HEAD_OrderNotification = [
  {
    label: <TranslatedText TranslationPath="UCP.InboxTable.TabHeader.ID" />,
    value: '',
  },
  {
    label: <TranslatedText TranslationPath="UCP.InboxTable.TabHeader.Order" />,
    value: 'Order',
  },
  {
    label: (
      <TranslatedText TranslationPath="UCP.InboxTable.TabHeader.Message" />
    ),
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

export default function Inbox_Table() {
  const [OpenCategoryDialog, SetOpenCategoryDialog] = React.useState(false);
  const [OpenDeleteDialog, SetOpenDeleteDialog] = React.useState(false);
  const LightModeState = useSelector((state) => state.lightMode);
  const [SelectedTab, SetSelectedTab] = React.useState('Orders');

  const [AllOrders, SetAllOrders] = React.useState(TABLE_ROWS_OrderNotifications);
  const [AllContacts, SetAllContacts] = React.useState(TABLE_ROWS_ContactNofiications);
  const [VisibleData, SetVisibleData] = React.useState([]);
  const [sortDirection, setSortDirection] = React.useState('asc'); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = React.useState(1); // 'asc' or 'desc'

  const TABS = [
    {
      label: (
        <TranslatedText TranslationPath="UCP.InboxTable.TabFilter.Orders" />
      ),
      value: 'Orders',
      Tab_fn: () => {
        SetSelectedTab('Orders');
      },
    },
    {
      label: (
        <TranslatedText TranslationPath="UCP.InboxTable.TabFilter.Contacts" />
      ),
      value: 'Contacts',
      Tab_fn: () => {
        SetSelectedTab('Contacts');
      },
    },
  ];

  const HandleNotificationDelete = () => {
    try {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('API Fetch is done!');
        }, 3000);
      });

      CreateToast(
        promise,
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Inbox.DeleteNotification_Success" />
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Inbox.DeleteNotification_Success" />
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Promise.Pending" />
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Inbox.DeleteNotification_Error" />
        ),
        'promise',
        LightModeState == LightMode().type,
      );
    } catch (e) {}
  };

  const HandleMessageDelete = () => {
    try {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('API Fetch is done!');
        }, 3000);
      });

      CreateToast(
        promise,
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Inbox.DeleteMessage_Success" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Inbox.DeleteMessage_Success" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Promise.Pending" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Inbox.DeleteMessage_Error" />,
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
              <TranslatedText TranslationPath="UCP.InboxTable.Title" />
            </Typography>
            <Typography className="mt-1 font-normal">
              <TranslatedText TranslationPath="UCP.InboxTable.Description" />
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value={SelectedTab} className="w-full md:w-max">
            <TabsHeader className=" overflow-auto">
              {TABS.map(({ label, value, Tab_fn }) => (
                <Tab
                  style={{ textWrap: 'nowrap' }}
                  key={value}
                  value={value}
                  onClick={() => {
                    Tab_fn();
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
                SearchRow(
                  SelectedTab=="Orders"?TABLE_ROWS_OrderNotifications:TABLE_ROWS_ContactNofiications,
                  SelectedTab=="Orders"?AllOrders:AllContacts,
                  SelectedTab=="Orders"?SetAllOrders:SetAllContacts,
                  e,
                );
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
              {SelectedTab == 'Orders'
                ? TABLE_HEAD_OrderNotification.map((head, index) => (
                    <th
                      key={"Orders_TableHead"+index}
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
                      >
                        {head.label}{' '}
                        {index !== TABLE_HEAD_OrderNotification.length - 1 && (
                          <ChevronUpDownIcon
                            strokeWidth={2}
                            className="h-4 w-4"
                          />
                        )}
                      </Typography>
                    </th>
                  ))
                : TABLE_HEAD2_ContactNotification.map((head, index) => (
                    <th
                      onClick={() => {
                        if (
                          index !==
                          TABLE_HEAD2_ContactNotification.length - 1
                        )
                          SortData(
                            head.value,
                            sortDirection,
                            setSortDirection,
                            VisibleData,
                            SetVisibleData,
                            'Inbox_Contact',
                          );
                      }}
                      key={"Contacts_TableHead"+index}
                      className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                      <Typography
                        variant="small"
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                      >
                        {head.label}{' '}
                        {index !==
                          TABLE_HEAD2_ContactNotification.length - 1 && (
                          <ChevronUpDownIcon
                            strokeWidth={2}
                            className="h-4 w-4"
                          />
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
                    const isLast =
                      index === TABLE_ROWS_OrderNotifications.length - 1;
                    const classes = isLast
                      ? 'p-4'
                      : 'p-4 border-b border-blue-gray-50';

                    return (
                      <tr key={"Order"+Order.Notification_ID}>
                        <td className={classes}>
                            <Typography variant="small" className="font-normal">
                              #{Order.Notification_ID}
                            </Typography>
                        </td>

                        <td className={classes}>
                            <Typography variant="small" className="font-normal">
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
                            >
                              <i className="fa-solid fa-trash"></i>
                            </IconButton>
                        </td>
                      </tr>
                    );
                  },
                )
              : AllContacts.map(
                  (
                    Contact,
                    index,
                  ) => {
                    const isLast =
                      index === TABLE_ROWS_OrderNotifications.length - 1;
                    const classes = isLast
                      ? 'p-4'
                      : 'p-4 border-b border-blue-gray-50';

                    return (
                      <tr key={"Contacts"+Contact.Notification_ID}>
                        <td className={classes}>
                            <Typography variant="small" className="font-normal">
                              #{Contact.Notification_ID}
                            </Typography>
                        </td>

                        <td className={classes}>

                            <Typography variant="small" className="font-normal">
                              {Contact.Email}
                            </Typography>

                        </td>
                        <td className={classes}>

                            <Typography variant="small" className="font-normal">
                              {Contact.F_Name}
                            </Typography>

                        </td>
                        <td className={classes}>
                            <Typography variant="small" className="font-normal">
                              {Contact.L_Name}
                            </Typography>
                        </td>
                        <td className={classes}>

                            <Typography variant="small" className="font-normal">
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
                            >
                              <i className="fa-solid fa-trash"></i>
                            </IconButton>
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
          AllData={SelectedTab=='Orders'?AllOrders:AllContacts}
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
          Title={
            <TranslatedText TranslationPath="UCP.DialogMessages.Inbox.DeleteNotification_Title" />
          }
          Content={
            <TranslatedText TranslationPath="UCP.DialogMessages.Inbox.DeleteNotification_Confirm" />
          }
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
          Title={
            <TranslatedText TranslationPath="UCP.DialogMessages.Inbox.DeleteMessage_Title" />
          }
          Content={
            <TranslatedText TranslationPath="UCP.DialogMessages.Inbox.DeleteMessage_Confirm" />
          }
        />
      )}
    </>
  );
}
