import { Typography, Input, Button, Select, Option, IconButton } from '@material-tailwind/react';
import debounce from 'lodash/debounce';
import TranslatedText, { TranslateString } from '../../utils/Translation';
import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/LightActions';
import { Notify } from '../../utils/Toast/toast';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { VerifyInputs } from '../../utils/others/VerifyInputs';
import { createCategory, createSubCategory, getCategories, createSubCategoryValue } from '../../services/category';
AddCategory.propTypes = {
  HandleOpen: PropTypes.func.isRequired,
};
import { arrayBufferToBase64, readBinaryData } from '../../utils/file';
import { useTranslation } from 'react-i18next';
export default function AddCategory({ HandleOpen }) {
  const accessToken = useSelector((state) => state.userAccessToken);
  const [inputValues, setInputValues] = React.useState(['', '']);
  const LightModeState = useSelector((state) => state.lightMode);
  const [SelectedCategory, SetSelectedCategory] = React.useState('');
  const { t, i18n } = useTranslation();
  var isLightMode = LightModeState == LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState == LightMode().type;
  }, [LightModeState]);
  const TranslatedInputLabel = t('UCP.CategoryTable.TabInputs.SubCategoryValue');
  const [Categories, setCategories] = React.useState([]);

  const CategoryNameRef = React.useRef(null);
  const SubCategoryNameRef = React.useRef(null);
  const CategoryFileRef = React.useRef(null);
  //This function handles creating a category
  const HandleAddCategory = async () => {
    try {
      const categoryName = CategoryNameRef.current.value;
      //Verifying if the inputs are null or not before submitting the request
      if (VerifyInputs([categoryName, CategoryFileRef.current.files[0]], [], [], [], [], [], [], isLightMode)) {
        const fileBinary = await readBinaryData(CategoryFileRef.current.files[0]);
        const fileBinaryBase64 = arrayBufferToBase64(fileBinary);
        const fileData = CategoryFileRef.current.files[0];
        const FileName = fileData.name.split('.')[0];
        const FileExtension = fileData.name.split('.')[1];
        const FileSize = fileData.size;
        const promise = createCategory(categoryName, FileName, FileExtension, FileSize, fileBinaryBase64, accessToken);
        Notify.displayPromiseNotification(
          promise,
          [t('UCP.DialogMessages.Category.AddCategory_NamedUsed')],
          ['CATEGORY_ERROR02'],
          isLightMode,
        );
        promise
          .then(() => {
            HandleOpen();
          })
          .catch(() => {
            null;
          });
      }
    } catch (e) {
      /*Catch logic */
    }
  };

  //this function handles creating a sub category
  const handleAddSubCategory = async () => {
    try {
      const subCategoryName = SubCategoryNameRef.current.value;
      const SelectedCategoryObj = Categories.find(
        (obj) => obj.CategoryName + '_' + obj.categoryID === SelectedCategory,
      );
      const SubCategoryValues = inputValues;

      var IsUnique = true;
      //verifing if the values are unique
      SubCategoryValues.map((value, index) => {
        for (var i = 0; i < SubCategoryValues.length; i++) {
          if (i != index) {
            if (value == SubCategoryValues[i]) {
              IsUnique = false;
            }
          }
        }
      });

      if (!IsUnique) {
        Notify.displayNotification(t('UCP.DialogMessages.Category.AddSubCategoryValue_ValueUsed'), 'info', isLightMode);
      }
      //verifiying if the inputs are not null before executing the call
      if (
        VerifyInputs(
          [SubCategoryValues[0], SubCategoryValues[1], subCategoryName, SelectedCategory],
          [],
          [],
          [],
          [],
          [],
          [],
          isLightMode,
        ) &&
        IsUnique
      ) {
        const promise_1 = createSubCategory(subCategoryName, SelectedCategoryObj.categoryID, accessToken);
        Notify.displayPromiseNotification(
          promise_1,
          [t('UCP.DialogMessages.Category.AddSubCategory_NamedUsed')],
          ['CATEGORY_ERROR06'],
          isLightMode,
        );

        promise_1
          .then((response) => {
            SubCategoryValues.map((value) => {
              const promise_2 = createSubCategoryValue(value, response.data, accessToken);
            });
            HandleOpen();
          })
          .catch((e) => {
            null;
          });
      }
    } catch (e) {
      null;
    }
  };
  const addInputField = () => {
    setInputValues([...inputValues, '']);
  };

  const RemoveInputField = (index) => {
    if (inputValues.length > 2) {
      const TempInputValues = [...inputValues];
      TempInputValues.splice(index, 1);
      setInputValues(TempInputValues);
    }
  };

  // Function to handle input value changes
  const handleInputChange = debounce((index, event) => {
    const newValues = [...inputValues];
    newValues[index] = event.target.value;
    setInputValues(newValues);
  }, 500);

  React.useEffect(() => {
    //This function calls the backened and gets all the categories within our app
    async function GetCategory() {
      const response = await getCategories(0, 0, true, accessToken);
      const FormatedCategories = [];
      response.data.map((category) => {
        FormatedCategories.push({
          categoryID: category.id,
          CategoryName: category.name,
          CategoryValue: category.name + '_' + category.id,
        });
      });
      setCategories(FormatedCategories);
    }

    GetCategory();
  }, []);

  return (
    <div className={`w-full h-[80vh] flex flex-col md:flex-row justify-center items-start gap-4  `}>
      <div className="w-full  flex flex-col justify-center items-center">
        <Typography variant="h6" className="text-center">
          <i className="fa-solid fa-arrow-up-wide-short h-5 w-5 mx-2"></i>
          {t('UCP.CategoryTable.TabLabels.AddMain')}
        </Typography>
        <Input
          inputRef={CategoryNameRef}
          type="text"
          variant="outlined"
          labelProps={{
            style: {
              color: isLightMode ? 'black' : 'white',
            },
          }}
          label={t('UCP.CategoryTable.TabInputs.CategoryName')}
        />

        <div className=" mt-2">
          <Input
            inputRef={CategoryFileRef}
            type="file"
            variant="outlined"
            labelProps={{
              style: {
                color: isLightMode ? 'black' : 'white',
              },
            }}
            label={'Image'}
          />
        </div>

        <Button className="flex items-center mt-5 gap-3" onClick={HandleAddCategory}>
          <i className="fa-solid fa-plus "></i> {t('UCP.CategoryTable.TabActions.Add')}
        </Button>
      </div>

      <div className="w-full flex flex-col gap-4 justify-center items-center">
        <Typography variant="h6" className="text-center">
          <i className="fa-solid fa-arrow-down-wide-short h-5 w-5 mx-2"></i>
          {t('UCP.CategoryTable.TabLabels.AddSub')}
        </Typography>

        <Select
          label={t('UCP.AddProduct.TabInputs.PCategory')}
          defaultValue={SelectedCategory}
          onChange={(e) => SetSelectedCategory(e)}
        >
          {Categories.map((Category) => {
            return (
              <Option key={Category.categoryID} value={Category.CategoryValue}>
                {Category.CategoryName}
              </Option>
            );
          })}
        </Select>

        <Input
          inputRef={SubCategoryNameRef}
          labelProps={{
            style: {
              color: isLightMode ? 'black' : 'white',
            },
          }}
          label={t('UCP.CategoryTable.TabInputs.SubCategoryName')}
        />

        <div className="w-full flex flex-col justify-center items-center gap-2">
          {inputValues.map((value, index) => {
            return (
              <div key={'SubCategoryInput' + index} className="w-full flex justify-center items-center gap-2">
                <Input
                  onChange={(e) => handleInputChange(index, e)}
                  labelProps={{
                    style: {
                      color: isLightMode ? 'black' : 'white',
                    },
                  }}
                  label={TranslatedInputLabel + ' ' + parseInt(index + 1, 10)}
                />
                {index == inputValues.length - 1 && (
                  <>
                    <IconButton variant="text" onClick={addInputField} className="rounded-full">
                      <i className="fa-solid fa-plus"></i>
                    </IconButton>
                    <IconButton variant="text" onClick={RemoveInputField} className="rounded-full">
                      <i className="fa-solid fa-minus"></i>
                    </IconButton>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <Button className="flex items-center mt-5 gap-3" onClick={handleAddSubCategory}>
          <i className="fa-solid fa-plus"></i>
          {t('UCP.CategoryTable.TabActions.Add2')}
        </Button>
      </div>
    </div>
  );
}
