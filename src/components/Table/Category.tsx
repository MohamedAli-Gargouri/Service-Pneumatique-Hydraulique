import { MagnifyingGlassIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
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
import { LightMode } from '../../redux/actions/light-actions';
import ConfirmDialog from '../Dialog/Confirm';
import React from 'react';
import Pagination from '../../utils/Table/Pagination';
import SortData from '../../utils/Table/SortRows';
import SearchRow from '../../utils/Table/Search';

import { useNotify } from '../../utils/hooks/useNotify';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { readBinaryData, arrayBufferToBase64 } from '../../utils/file';
import {
  getCategories,
  getSubCategories,
  PutSubCategory,
  PutCategory,
  DELETECategory,
  DELETESubCategory,
} from '../../services/category';
import { useTranslation } from 'react-i18next';
import { RootState } from 'redux/reducers';
Categories_Table.propTypes = {
  HandleOpen: PropTypes.func.isRequired,
};
export default function Categories_Table({ HandleOpen }) {
  const accessToken = useSelector((state: RootState) => state.userAccessToken);
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const [OpenDeleteDialog, SetOpenDeleteDialog] = React.useState(false);
  const { t, i18n } = useTranslation();
  const { displayNotification, displayPromiseNotification } = useNotify();
  const [TABLE_ROWS, SetTABLE_ROWS] = React.useState([]);
  const [AllData, SetAllData] = React.useState(TABLE_ROWS);
  const [VisibleData, SetVisibleData] = React.useState([]);
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'dec'>('asc'); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = React.useState(1);
  const TABLE_HEAD = [
    {
      label: t('UCP.CategoryTable.TabHeader.CategoryID'),
      value: 'Category ID',
    },
    {
      label: t('UCP.CategoryTable.TabHeader.CategoryName'),
      value: 'Category Name',
    },
    {
      label: t('UCP.CategoryTable.TabHeader.CategoryType'),
      value: 'Category Type',
    },
    { label: '', value: '' },
  ];
  const UploadedFileInputRef: React.MutableRefObject<HTMLInputElement> = React.useRef<HTMLInputElement>();
  const FileInputRef = React.useRef([]);
  const InputValuesRef = React.useRef([]);
  const DeleteCategoryId = React.useRef(null);
  const Selected_ImgUpload_CategoryID = React.useRef(null);
  React.useEffect(() => {
    async function GetCategories() {
      const TABLE_ROWS_TEMP = [];
      const result = await getCategories(0, 0, true, accessToken);
      const result_2 = await getSubCategories(0, 0, true, accessToken);
      const InputValuesRef_Temp = [];
      FileInputRef.current = [];

      console.log(result.data);
      result.data.map((M_Category) => {
        TABLE_ROWS_TEMP.push({
          CategoryID: M_Category.id,
          name: M_Category.name,
          type: 1,
        });

        InputValuesRef_Temp.push({
          CategoryID: M_Category.id,
          name: M_Category.name,
        });

        //Filling the list of file inputs
        FileInputRef.current.push({
          CategoryID: M_Category.id,
          categoryImg_File: {
            name: null,
            extension: null,
            size: 0,
            fileBinary: null,
          },
        });
      });

      result_2.data.map((S_Category) => {
        TABLE_ROWS_TEMP.push({
          CategoryID: S_Category.id,
          name: S_Category.name,
          type: 2,
          parent_CategoryId: S_Category.category.id,
        });
        InputValuesRef_Temp.push({
          CategoryID: S_Category.id,
          name: S_Category.name,
        });
      });

      //Setting the default InputValues
      InputValuesRef.current = InputValuesRef_Temp;

      SetTABLE_ROWS(TABLE_ROWS_TEMP);
      SetAllData(TABLE_ROWS_TEMP);
    }
    GetCategories();
  }, []);

  const handleInputChange = (e, CategoryID) => {
    const newName = e.target.value;
    const InputValuesRef_temp = [];
    InputValuesRef.current.map((Input) => {
      if (Input.CategoryID == CategoryID) {
        InputValuesRef_temp.push({
          CategoryID: Input.CategoryID,
          name: newName,
        });
      } else {
        InputValuesRef_temp.push(Input);
      }
    });

    InputValuesRef.current = InputValuesRef_temp;
  };

  //This function handles the delete of a category
  const HandleDeleteCategory = () => {
    try {
      var subCategory = AllData.find((category) => category.CategoryID == DeleteCategoryId.current);

      //test if its a subCategory
      if (subCategory.type == 2) {
        const promise = DELETESubCategory(DeleteCategoryId.current, accessToken);

        displayPromiseNotification(
          promise,
          [t('UCP.DialogMessages.Category.AddCategory_NamedUsed')],
          ['CATEGORY_ERROR02'],
        );

        //Updating the current data with the changed name.
        promise
          .then(() => {
            const NewAllData = AllData.filter((row) => row.CategoryID != DeleteCategoryId.current);
            SetAllData(NewAllData);
          })
          .catch(() => null);
      }
      //test if its a main category
      if (subCategory.type == 1) {
        const promise = DELETECategory(DeleteCategoryId.current, accessToken);
        displayNotification(t('UCP.DialogMessages.Category.AddCategory_NamedUsed'), 'error');
        //Updating the current data with the changed name.
        promise
          .then(() => {
            const NewAllData = AllData.filter((row) => row.CategoryID != DeleteCategoryId.current);
            SetAllData(NewAllData);
          })
          .catch(() => null);
      }
      HandleOpen();
    } catch (e) {
      /*Catch logic here */
    }
  };

  //This function handles the Edit Of a Category
  const HandleEditCategory = (CategoryID) => {
    try {
      var subCategory = AllData.find((category) => category.CategoryID == CategoryID);
      const newName = InputValuesRef.current.find((input) => input.CategoryID == CategoryID).name;
      //test if its a subCategory
      if (subCategory.type == 2) {
        const promise = PutSubCategory(CategoryID, newName, subCategory.parent_CategoryId, accessToken);

        displayPromiseNotification(
          promise,
          [t('UCP.DialogMessages.Category.AddCategory_NamedUsed')],
          ['CATEGORY_ERROR02'],
        );

        //Updating the current data with the changed name.
        promise
          .then(() => {
            subCategory.name = newName;
          })
          .catch(() => null);
      }
      //test if its a main category
      if (subCategory.type == 1) {
        const Category_IMGFile = FileInputRef.current.find(
          (category) => category.CategoryID == CategoryID,
        ).categoryImg_File;
        const IMGBinaryBase64 = Category_IMGFile.fileBinary;
        const IMGName = Category_IMGFile.name;
        const IMGExtension = Category_IMGFile.extension;
        const IMGSize = Category_IMGFile.size;

        const promise = PutCategory(CategoryID, newName, IMGName, IMGExtension, IMGSize, IMGBinaryBase64, accessToken);
        displayPromiseNotification(
          promise,
          [t('UCP.DialogMessages.Category.AddCategory_NamedUsed')],
          ['CATEGORY_ERROR02'],
        );
        //Updating the current data with the changed name.
        promise
          .then(() => {
            subCategory.name = newName;
          })
          .catch(() => null);
      }

      //HandleOpen();
    } catch (e) {
      /*Catch logic here */
    }
  };

  const HandleImg_Upload = async (CategoryID) => {
    console.log(FileInputRef.current);
    const fileBinary = await readBinaryData((UploadedFileInputRef.current as any).files[0]);
    const fileBinaryBase64 = arrayBufferToBase64(fileBinary);
    const fileData = (UploadedFileInputRef.current as any).files[0];
    const FileName = fileData.name.split('.')[0];
    const FileExtension = fileData.name.split('.')[1];
    const FileSize = fileData.size;

    const category = FileInputRef.current.find((category) => category.CategoryID == CategoryID);
    category.categoryImg_File.name = FileName;
    category.categoryImg_File.extension = FileExtension;
    category.categoryImg_File.fileBinary = fileBinaryBase64;
    category.categoryImg_File.size = FileSize;
    console.log(FileInputRef.current);
  };
  return (
    <Card placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <CardHeader
        floated={false}
        shadow={false}
        className={`rounded-none bg-transparent`}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="w-full mt-2 ">
          <Input
            label={t('Global.Actions.Search')}
            onChange={(e) => {
              SearchRow(TABLE_ROWS, AllData, SetAllData, e);
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
      </CardHeader>
      <CardBody
        className="overflow-scroll px-0"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Input
          variant="static"
          type="file"
          hidden
          inputRef={UploadedFileInputRef as any}
          onChange={() => HandleImg_Upload(Selected_ImgUpload_CategoryID.current)}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          crossOrigin={undefined}
        />
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
                  >
                    {head.label}{' '}
                    {index !== TABLE_HEAD.length - 1 && <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {VisibleData.map(({ CategoryID, name, type }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

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
                        onChange={(e) => {
                          handleInputChange(e, CategoryID);
                        }}
                        inputMode="text"
                        label={t('UCP.CategoryTable.TabInputs.Name')}
                        size="md"
                        defaultValue={name}
                        labelProps={{
                          style: {
                            color: LightModeState == LightMode().type ? 'black' : 'white',
                          },
                        }}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        crossOrigin={undefined}
                      />
                    </div>
                  </td>

                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography variant="small" className="font-normal">
                        {type == 1
                          ? t('UCP.CategoryTable.TabHeader.CategoryTypeValue1')
                          : t('UCP.CategoryTable.TabHeader.CategoryTypeValue2')}
                      </Typography>
                    </div>
                  </td>

                  <td className={classes}>
                    <Tooltip content="Save Category">
                      <IconButton
                        variant="text"
                        onClick={() => HandleEditCategory(CategoryID)}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <i className="fa-solid fa-floppy-disk h-4 w-4"></i>
                      </IconButton>
                    </Tooltip>

                    {type == 1 && (
                      <Tooltip content="Upload Image">
                        <IconButton
                          variant="text"
                          onClick={() => {
                            Selected_ImgUpload_CategoryID.current = CategoryID;
                            (UploadedFileInputRef.current as any).click();
                          }}
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          <i className="fa-solid fa-image h-4 w-4"></i>
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip content="Delete Category">
                      <IconButton
                        variant="text"
                        onClick={() => {
                          SetOpenDeleteDialog(true);
                          DeleteCategoryId.current = CategoryID;
                        }}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
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
        Open={OpenDeleteDialog}
        Action={HandleDeleteCategory}
        HandleOpen={() => {
          SetOpenDeleteDialog(!OpenDeleteDialog);
        }}
        Icon={'<i className="fa-solid fa-trash h-5 w-5 mx-1"></i>'}
        Title={t('UCP.DialogMessages.Category.DeleteCategory_Title')}
        Content={t('UCP.DialogMessages.Category.DeleteCategory_Confirm')}
      />
    </Card>
  );
}
