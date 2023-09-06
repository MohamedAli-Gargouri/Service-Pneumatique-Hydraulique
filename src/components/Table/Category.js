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
import SearchRow from '../../utils/Table/Search';
import TranslatedText from '../../utils/Translation';
import { CreateToast } from '../../utils/Toast';
import ReactDOMServer from 'react-dom/server';
const TABLE_HEAD = [
  {
    label: (
      <TranslatedText TranslationPath="UCP.CategoryTable.TabHeader.CategoryID" />
    ),
    value: 'Category ID',
  },
  {
    label: (
      <TranslatedText TranslationPath="UCP.CategoryTable.TabHeader.CategoryName" />
    ),
    value: 'Category Name',
  },
  {
    label: (
      <TranslatedText TranslationPath="UCP.CategoryTable.TabHeader.CategoryType" />
    ),
    value: 'Category Type',
  },
  { label: '', value: '' },
];

const TABLE_ROWS = [
  {
    CategoryID: '1',
    name: 'Compressors',
    type: 'Main Category',
  },
  {
    CategoryID: '4',
    name: 'Dryers',
    type: 'Main Category',
  },
  {
    CategoryID: '3',
    name: 'Tubes',
    type: 'Main Category',
  },
  {
    CategoryID: '2',
    name: 'Size',
    type: 'Sub Category',
  },
  {
    CategoryID: '5',
    name: 'Power',
    type: 'Sub Category',
  },
  {
    CategoryID: '6',
    name: 'V Rating',
    type: 'Sub Category',
  },
];

export default function CategoriesTable({ HandleOpen }) {
  const LightModeState = useSelector((state) => state.lightMode);
  const [OpenDeleteDialog, SetOpenDeleteDialog] = React.useState(false);
  const [AllData, SetAllData] = React.useState(TABLE_ROWS);
  const [VisibleData, SetVisibleData] = React.useState([]);
  const [sortDirection, setSortDirection] = React.useState('asc'); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = React.useState(1);

  const HandleDeleteCategory = () => {
    try {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('API Fetch is done!');
        }, 3000);
      });

      CreateToast(
        promise,
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Category.DeleteCategory_Success" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Category.DeleteCategory_Success" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Promise.Pending" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Category.DeleteCategory_Success" />,
        ),
        'promise',
        LightModeState == LightMode().type,
      );
      HandleOpen();
    } catch (e) {}
  };

  const HandleEditCategory = () => {
    try {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('API Fetch is done!');
        }, 3000);
      });

      CreateToast(
        promise,
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Category.EditCategory_Success" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Category.EditCategory_Success" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Promise.Pending" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Category.EditCategory_Error" />,
        ),
        'promise',
        LightModeState == LightMode().type,
      );
      HandleOpen();
    } catch (e) {}
  };
  return (
    <Card
      className={`${
        LightModeState == LightMode().type
          ? 'tc-whiteTheme_T1 bg-whiteTheme_T3'
          : 'tc-darkTheme_T1 bg-darkTheme_T1'
      }`}
    >
      <CardHeader
        floated={false}
        shadow={false}
        className={`rounded-none bg-transparent ${
          LightModeState == LightMode().type
            ? 'tc-whiteTheme_T1 '
            : 'tc-darkTheme_T1 '
        }`}
      >
        <div className="w-full mt-2 ">
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
            {VisibleData.map(({ CategoryID, name, type }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? 'p-4'
                : 'p-4 border-b border-blue-gray-50';

              return (
                <tr key={CategoryID}>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography variant="small" className="font-normal">
                        #{CategoryID}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Input
                        label="Name"
                        size="md"
                        defaultValue={name}
                        labelProps={{
                          style: {
                            color:
                              LightModeState == LightMode().type
                                ? 'black'
                                : 'white',
                          },
                        }}
                      />
                    </div>
                  </td>

                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography variant="small" className="font-normal">
                        {type}
                      </Typography>
                    </div>
                  </td>

                  <td className={classes}>
                    <Tooltip content="Save Category">
                      <IconButton variant="text" onClick={HandleEditCategory}>
                        <i class="fa-solid fa-floppy-disk h-4 w-4"></i>
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete Category">
                      <IconButton
                        variant="text"
                        onClick={() => {
                          SetOpenDeleteDialog(true);
                        }}
                      >
                        <i class="fa-solid fa-trash h-4 w-4"></i>
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
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
        Open={OpenDeleteDialog}
        Action={HandleDeleteCategory}
        HandleOpen={() => {
          SetOpenDeleteDialog(!OpenDeleteDialog);
        }}
        Icon={'<i class="fa-solid fa-trash h-5 w-5 mx-1"></i>'}
        Title={
          <TranslatedText TranslationPath="UCP.DialogMessages.Category.DeleteCategory_Title" />
        }
        Content={
          <TranslatedText TranslationPath="UCP.DialogMessages.Category.DeleteCategory_Confirm" />
        }
      />
    </Card>
  );
}
