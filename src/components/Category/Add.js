import {
  Typography,
  Input,
  Button,
  Select,
  Option,
  IconButton,
} from '@material-tailwind/react';
import debounce from 'lodash/debounce';
import TranslatedText,{TranslateString} from '../../utils/Translation';
import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/LightActions';
import { CreateToast } from '../../utils/Toast';
import ReactDOMServer from 'react-dom/server';
import PropTypes from "prop-types"
AddCategory.propTypes={
  HandleOpen:PropTypes.func.isRequired
}
export default function AddCategory({ HandleOpen }) {
  const [inputValues, setInputValues] = React.useState(['', '']);
  const LightModeState = useSelector((state) => state.lightMode);
  const [SelectedCategory,SetSelectedCategory]=React.useState("Comp")
  const TranslatedInputLabel=TranslateString("UCP.CategoryTable.TabInputs.SubCategoryValue")
  const Categories=[
    {categoryID:1,CategoryName:"Compressors",CategoryValue:"Comp"},
    {categoryID:2,CategoryName:"Tubes",CategoryValue:"Tub"},
    {categoryID:3,CategoryName:"Secheurs",CategoryValue:"Secheur"}
  ]
  const HandleAddCategory = () => {
    try {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('API Fetch is done!');
        }, 3000);
      });

      CreateToast(
        promise,
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Category.AddCategory_Success" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Category.AddCategory_Success" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Promise.Pending" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Category.CanceAddCategory_SuccesslOrder_Error" />,
        ),
        'promise',
        LightModeState == LightMode().type,
      );
      HandleOpen();
    } catch (e){ /*Catch logic */}
  };
  const addInputField = () => {
    setInputValues([...inputValues,'']);
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

  return (
    <div
      className={`w-full h-full flex flex-col md:flex-row justify-center items-start gap-4 ${
        LightModeState == LightMode().type
          ? ' tc-whiteTheme_T1'
          : ' tc-darkTheme_T1'
      } `}
    >
      <div className="w-full flex flex-col justify-center items-center">
        <Typography variant="h6" className="text-center">
          <i className="fa-solid fa-arrow-up-wide-short h-5 w-5 mx-2"></i>
          <TranslatedText TranslationPath="UCP.CategoryTable.TabLabels.AddMain" />
        </Typography>
        <Input
          labelProps={{
            style: {
              color: LightModeState == LightMode().type ? 'black' : 'white',
            },
          }}
          label={
            <TranslatedText TranslationPath="UCP.CategoryTable.TabInputs.CategoryName" />
          }
        />
        <Button
          className="flex items-center mt-5 gap-3"
          onClick={HandleAddCategory}
        >
          <i className="fa-solid fa-plus "></i>
            <TranslatedText TranslationPath="UCP.CategoryTable.TabActions.Add" />
          
        </Button>
      </div>

      <div className="w-full flex flex-col gap-4 justify-center items-center">
        <Typography variant="h6" className="text-center">
          <i className="fa-solid fa-arrow-down-wide-short h-5 w-5 mx-2"></i>
          <TranslatedText TranslationPath="UCP.CategoryTable.TabLabels.AddSub" />
        </Typography>

        <Select
          label={
            <TranslatedText TranslationPath="UCP.AddProduct.TabInputs.PCategory" />
          }
          value={SelectedCategory}
          onChange={(e)=>SetSelectedCategory(e)}
        >
          {
            Categories.map((Category)=>{
              return(
                <Option key={Category.categoryID} value={Category.CategoryValue}>{Category.CategoryName}</Option>
              )

            })
          }
        </Select>

        <Input
          labelProps={{
            style: {
              color: LightModeState == LightMode().type ? 'black' : 'white',
            },
          }}
          label={
            <TranslatedText TranslationPath="UCP.CategoryTable.TabInputs.SubCategoryName" />
          }
        />

        <div className="w-full flex flex-col justify-center items-center gap-2">
          {inputValues.map((value, index) => {
            return (
              <div key={"SubCategoryInput"+index} className="w-full flex justify-center items-center gap-2">
                <Input
                  onChange={(e) => handleInputChange(index, e)}
                  labelProps={{
                    style: {
                      color:
                        LightModeState == LightMode().type ? 'black' : 'white',
                    },
                  }}
                  label={ TranslatedInputLabel+" "+ parseInt(index + 1, 10)}
                />
                {index == inputValues.length - 1 && (
                  <>
                    <IconButton
                      variant="text"
                      onClick={addInputField}
                      className="rounded-full"
                    >
                      <i className="fa-solid fa-plus"></i>
                    </IconButton>
                    <IconButton
                      variant="text"
                      onClick={RemoveInputField}
                      className="rounded-full"
                    >
                      <i className="fa-solid fa-minus"></i>
                    </IconButton>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <Button
          className="flex items-center mt-5 gap-3"
          onClick={HandleAddCategory}
        >
          <i className="fa-solid fa-plus"></i>
            <TranslatedText TranslationPath="UCP.CategoryTable.TabActions.Add2" />
          
        </Button>
      </div>
    </div>
  );
}
