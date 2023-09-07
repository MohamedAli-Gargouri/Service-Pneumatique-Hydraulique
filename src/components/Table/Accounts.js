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
import ConfirmDialog from '../../components/Dialog/Confirm';
import Person_1 from '../../assets/images/Person 1.jpg';
import Person_2 from '../../assets/images/Person 2.jpg';
import TranslatedText from '../../utils/Translation';
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
import TabFilter from '../../utils/Table/TabFilter';
import SearchRow from '../../utils/Table/Search';
import ReactDOMServer from 'react-dom/server';
import { CreateToast } from '../../utils/Toast';
const TABLE_HEAD = [
  {
    label: (
      <TranslatedText TranslationPath="UCP.AccountsTable.TabHeader.AccountID" />
    ),
    value: 'Account ID',
  },
  {
    label: (
      <TranslatedText TranslationPath="UCP.AccountsTable.TabHeader.Username" />
    ),
    value: 'Username',
  },
  {
    label: (
      <TranslatedText TranslationPath="UCP.AccountsTable.TabHeader.FullName" />
    ),
    value: 'Full Name',
  },
  {
    label: (
      <TranslatedText TranslationPath="UCP.AccountsTable.TabHeader.privilege" />
    ),
    value: 'privilege',
  },
  {
    label: (
      <TranslatedText TranslationPath="UCP.AccountsTable.TabHeader.TotalSpent" />
    ),
    value: 'Total Spent',
  },
  { label: '', value: '' },
];

const TABLE_ROWS = [
  {
    AccountId: '1',
    Img: Person_1,
    UserName: 'Housi',
    FirstName: 'Hassen',
    LastName: 'Jeribi',
    Privilege: 'Client',
    TotalSpent: '10000',
  },
  {
    AccountId: '6',
    Img: Person_1,
    UserName: 'DALI',
    FirstName: 'Mohamed Ali',
    LastName: 'Gargouri',
    Privilege: 'Employee',
    TotalSpent: '0',
  },
  {
    AccountId: '2',
    Img: Person_2,
    UserName: 'Loukka',
    FirstName: 'Melek',
    LastName: 'Hachicha',
    Privilege: 'Admin',
    TotalSpent: '0',
  },
];

export default function Accounts_Table() {
  const [OpenDeleteDialog, SetOpenDeleteDialog] = React.useState(false);
  const [OpenConfirmAdminDialog, SetOpenConfirmAdminDialog] =
    React.useState(false);
  const [OpenConfirmEmployeeDialog, SetOpenConfirmEmployeeDialog] =
    React.useState(false);
  const [
    OpenConfirmRemovePermissionDialog,
    SetOpenConfirmRemovePermissionDialog,
  ] = React.useState(false);
  const LightModeState = useSelector((state) => state.lightMode);

  const [AllData, SetAllData] = React.useState(TABLE_ROWS);
  const [VisibleData, SetVisibleData] = React.useState([]);
  const [sortDirection, setSortDirection] = React.useState('asc'); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = React.useState(1);
  const TABS = [
    {
      label: (
        <TranslatedText TranslationPath="UCP.AccountsTable.TabFilter.All" />
      ),
      value: 'All',
      Filter_fn: () =>
        TabFilter('Privilege', 'All', TABLE_ROWS, SetAllData, currentPage),
    },
    {
      label: (
        <TranslatedText TranslationPath="UCP.AccountsTable.TabFilter.Admin" />
      ),
      value: 'Admin',
      Filter_fn: () =>
        TabFilter('Privilege', 'Admin', TABLE_ROWS, SetAllData, currentPage),
    },
    {
      label: (
        <TranslatedText TranslationPath="UCP.AccountsTable.TabFilter.Employee" />
      ),
      value: 'Employee',
      Filter_fn: () =>
        TabFilter('Privilege', 'Employee', TABLE_ROWS, SetAllData, currentPage),
    },
    {
      label: (
        <TranslatedText TranslationPath="UCP.AccountsTable.TabFilter.Client" />
      ),
      value: 'Client',
      Filter_fn: () =>
        TabFilter('Privilege', 'Client', TABLE_ROWS, SetAllData, currentPage),
    },
  ];

  const HandleSetAdmin = () => {
    try {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('API Fetch is done!');
        }, 3000);
      });

      CreateToast(
        promise,
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Accounts.SetAdmin_Success" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Accounts.SetAdmin_Success" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Promise.Pending" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Accounts.SetAdmin_Error" />,
        ),
        'promise',
        LightModeState == LightMode().type,
      );
    } catch (e) {}
  };

  const HandleSetEmployee = () => {
    try {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('API Fetch is done!');
        }, 3000);
      });

      CreateToast(
        promise,
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Accounts.SetEmployee_Success" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Accounts.SetEmployee_Success" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Promise.Pending" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Accounts.SetEmployee_Error" />,
        ),
        'promise',
        LightModeState == LightMode().type,
      );
    } catch (e) {}
  };

  const HandleSetNormalUser = () => {
    try {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('API Fetch is done!');
        }, 3000);
      });

      CreateToast(
        promise,
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Accounts.SetUser_Success" />
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Accounts.SetUser_Success" />
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Promise.Pending" />
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Accounts.SetUser_Error" />
        ),
        'promise',
        LightModeState == LightMode().type,
      );
    } catch (e) {}
  };

  const HandleDeleteUser = () => {
    try {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('API Fetch is done!');
        }, 3000);
      });

      CreateToast(
        promise,
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Accounts.SetDeleteUser_Success" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Accounts.SetDeleteUser_Success" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Promise.Pending" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Accounts.SetDeleteUser_Error" />,
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
              <TranslatedText TranslationPath="UCP.AccountsTable.Title" />
            </Typography>
            <Typography className="mt-1 font-normal">
              <TranslatedText TranslationPath="UCP.AccountsTable.Description" />
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
                    if (index !== TABLE_HEAD.length - 1)
                      SortData(
                        head.value,
                        sortDirection,
                        setSortDirection,
                        VisibleData,
                        SetVisibleData,
                        'Accounts',
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
                {
                  AccountId,
                  Img,
                  UserName,
                  FirstName,
                  LastName,
                  Privilege,
                  TotalSpent,
                },
                index,
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50';

                return (
                  <tr key={AccountId}>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography variant="small" className="font-normal">
                          #{AccountId}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography variant="small" className="font-normal">
                          #{UserName}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={Img} size="sm" />
                        <div className="flex flex-col">
                          <Typography variant="small" className="font-normal">
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
                            Privilege === 'Client'
                              ? 'green'
                              : Privilege === 'Employee'
                              ? 'amber'
                              : 'red'
                          }
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography variant="small" className="font-normal">
                          {TotalSpent}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      <Tooltip content="Set Admin">
                        <IconButton
                          variant="text"
                          onClick={() => {
                            SetOpenConfirmAdminDialog(true);
                          }}
                        >
                          <i className="fa-solid fa-shield"></i>
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Set Employee">
                        <IconButton
                          variant="text"
                          onClick={() => {
                            SetOpenConfirmEmployeeDialog(true);
                          }}
                        >
                          <i className="fa-solid fa-shield-halved"></i>
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Remove Permissions">
                        <IconButton
                          variant="text"
                          onClick={() => {
                            SetOpenConfirmRemovePermissionDialog(true);
                          }}
                        >
                          <i className="fa-solid fa-handshake-slash w-5 h-5 mx-1"></i>
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Delete Account">
                        <IconButton
                          variant="text"
                          onClick={() => {
                            SetOpenDeleteDialog(true);
                          }}
                        >
                          <i className="fa-solid fa-trash"></i>
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
        color="red"
        Open={OpenDeleteDialog}
        Action={HandleDeleteUser}
        HandleOpen={() => {
          SetOpenDeleteDialog(!OpenDeleteDialog);
        }}
        Icon={'<i className="fa-solid fa-trash h-5 w-5 mx-1"></i>'}
        Title={
          <TranslatedText TranslationPath="UCP.DialogMessages.Accounts.SetDeleteUser_Title" />
        }
        Content={
          <TranslatedText TranslationPath="UCP.DialogMessages.Accounts.SetDeleteUser_Confirm" />
        }
      />
      <ConfirmDialog
        color="red"
        Open={OpenConfirmAdminDialog}
        Action={HandleSetAdmin}
        HandleOpen={() => {
          SetOpenConfirmAdminDialog(!OpenConfirmAdminDialog);
        }}
        Icon={'<i className="fa-solid fa-shield h-5 w-5 mx-1"></i>'}
        Title={
          <TranslatedText TranslationPath="UCP.DialogMessages.Accounts.SetAdmin_Title" />
        }
        Content={
          <TranslatedText TranslationPath="UCP.DialogMessages.Accounts.SetAdmin_Confirm" />
        }
      />
      <ConfirmDialog
        color="red"
        Open={OpenConfirmEmployeeDialog}
        Action={HandleSetEmployee}
        HandleOpen={() => {
          SetOpenConfirmEmployeeDialog(!OpenConfirmEmployeeDialog);
        }}
        Icon={'<i className="fa-solid fa-shield-halved h-5 w-5 mx-1"></i>'}
        Title={
          <TranslatedText TranslationPath="UCP.DialogMessages.Accounts.SetEmployee_Title" />
        }
        Content={
          <TranslatedText TranslationPath="UCP.DialogMessages.Accounts.SetEmployee_Confirm" />
        }
      />
      <ConfirmDialog
        color="red"
        Open={OpenConfirmRemovePermissionDialog}
        Action={HandleSetNormalUser}
        HandleOpen={() => {
          SetOpenConfirmRemovePermissionDialog(
            !OpenConfirmRemovePermissionDialog,
          );
        }}
        Icon={'<i className="fa-solid fa-handshake-slash w-5 h-5 mx-1"></i>'}
        Title={
          <TranslatedText TranslationPath="UCP.DialogMessages.Accounts.SetUser_Title" />
        }
        Content={
          <TranslatedText TranslationPath="UCP.DialogMessages.Accounts.SetUser_Confirm" />
        }
      />
    </>
  );
}
