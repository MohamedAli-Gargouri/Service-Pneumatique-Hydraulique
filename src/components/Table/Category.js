import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/outline';
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
} from '@material-tailwind/react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/LightActions';
import ConfirmDialog from '../Dialog/Confirm';
import React from 'react';
import Pagination from '../../utils/Table/Pagination';
import SortData from '../../utils/Table/SortRows';
import SearchRow from '../../utils/Table/Search';
import TranslatedText from '../../utils/Translation';
import { CreateToast } from '../../utils/Toast';
import ReactDOMServer from 'react-dom/server';
import PropTypes from "prop-types"
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
    type: 1,
  },
  {
    CategoryID: '4',
    name: 'Dryers',
    type: 1,
  },
  {
    CategoryID: '3',
    name: 'Tubes',
    type: 1,
  },
  {
    CategoryID: '2',
    name: 'Size',
    type: 2,
  },
  {
    CategoryID: '5',
    name: 'Power',
    type: 2,
  },
  {
    CategoryID: '6',
    name: 'V Rating',
    type: 2,
  },
];

Categories_Table.propTypes={
  HandleOpen:PropTypes.func.isRequired
}
export default function Categories_Table({ HandleOpen }) {
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
    } catch (e) {/*Catch logic here */}
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
          <TranslatedText TranslationPath="UCP.DialogMessages.Category.EditCategory_Success" />
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Category.EditCategory_Success" />
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Promise.Pending" />
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Category.EditCategory_Error" />
        ),
        'promise',
        LightModeState == LightMode().type,
      );
      HandleOpen();
    } catch (e) {/*Catch logic here */}
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
                        label={<TranslatedText TranslationPath="UCP.CategoryTable.TabInputs.Name" />}
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
                        {type==1?<TranslatedText TranslationPath="UCP.CategoryTable.TabHeader.CategoryTypeValue1" />:<TranslatedText TranslationPath="UCP.CategoryTable.TabHeader.CategoryTypeValue2" />}
                      </Typography>
                    </div>
                  </td>

                  <td className={classes}>
                    <Tooltip content="Save Category">
                      <IconButton variant="text" onClick={HandleEditCategory}>
                        <i className="fa-solid fa-floppy-disk h-4 w-4"></i>
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete Category">
                      <IconButton
                        variant="text"
                        onClick={() => {
                          SetOpenDeleteDialog(true);
                        }}
                      >
                        <i className="fa-solid fa-trash h-4 w-4"></i>
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
        Icon={'<i className="fa-solid fa-trash h-5 w-5 mx-1"></i>'}
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
