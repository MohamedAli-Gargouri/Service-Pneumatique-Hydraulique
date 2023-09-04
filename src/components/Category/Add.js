import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
    ListItemSuffix,
    ListItem,
    List,
    Select,
    Option,
    IconButton,
    Rating,
    Textarea
  } from "@material-tailwind/react";
  import debounce from 'lodash/debounce';
  import TranslatedText from "../../utils/Translation"
  import React from "react";
 import { useSelector } from "react-redux/es/hooks/useSelector";
 import {LightMode,DarkMode} from "../../redux/actions/LightActions"
 import {CreateToast}  from "../../utils/Toast"
 import ReactDOMServer from 'react-dom/server';
  export default function Product({HandleOpen}) {

    const [inputValues, setInputValues] = React.useState(['','']);
    const LightModeState=useSelector(state=>state.lightMode)
    const HandleAddCategory=()=>
    {
   try{
     const promise =new Promise((resolve,reject)=>{setTimeout(()=>{
          resolve("API Fetch is done!")
      },3000)})
  
  
      CreateToast(
        promise,
        ReactDOMServer.renderToStaticMarkup(<TranslatedText TranslationPath="UCP.DialogMessages.Category.AddCategory_Success"/>),
        ReactDOMServer.renderToStaticMarkup(<TranslatedText TranslationPath="UCP.DialogMessages.Category.AddCategory_Success"/>),
        ReactDOMServer.renderToStaticMarkup(<TranslatedText TranslationPath="UCP.DialogMessages.Promise.Pending"/>),
        ReactDOMServer.renderToStaticMarkup(<TranslatedText TranslationPath="UCP.DialogMessages.Category.CanceAddCategory_SuccesslOrder_Error"/>),
        "promise",
        LightModeState==LightMode().type)
        HandleOpen()
      }
      catch(e)
      {
  
      }
    }
    const addInputField = () => {
      setInputValues([...inputValues, '']);
    };

    const RemoveInputField = (index) => {
      if(inputValues.length>2)
      {
        const TempInputValues=[...inputValues]
        TempInputValues.splice(index,1)
        setInputValues(TempInputValues);
      }
    };
  
    // Function to handle input value changes
    const handleInputChange = debounce((index, event) => {
      const newValues = [...inputValues];
      newValues[index] = event.target.value;
      setInputValues(newValues);
    },500)

    return (
<div className={`w-full h-full flex flex-col md:flex-row justify-center items-start gap-4 ${LightModeState==LightMode().type?" tc-whiteTheme_T1":" tc-darkTheme_T1"} `}>
  <div className="w-full flex flex-col justify-center items-center">
  <Typography variant="h6" className="text-center">
  <i class="fa-solid fa-arrow-up-wide-short h-5 w-5 mx-2"></i>
        Create Main Category
  </Typography>
  <Input   labelProps={{style:{color:LightModeState==LightMode().type?"black":"white"}}} label={<TranslatedText TranslationPath="UCP.CategoryTable.TabInputs.CategoryName"/>}    />
<Button className="flex items-center mt-5 gap-3" onClick={HandleAddCategory}>
<i class="fa-solid fa-plus "></i>
       {<TranslatedText TranslationPath="UCP.CategoryTable.TabActions.Add"/>}
      </Button>
  </div>





  <div className="w-full flex flex-col gap-4 justify-center items-center">
  <Typography variant="h6" className="text-center">
  <i class="fa-solid fa-arrow-down-wide-short h-5 w-5 mx-2"></i>
        Create Sub Category
  </Typography>

  <Select  label={<TranslatedText TranslationPath="UCP.AddProduct.TabInputs.PCategory"/>}>
  <Option  value={1}>Compressor</Option>
  <Option value={2}>Tube</Option>
  <Option value={3}>Secher</Option>
</Select>

<Input   labelProps={{style:{color:LightModeState==LightMode().type?"black":"white"}}} label={<TranslatedText TranslationPath="UCP.CategoryTable.TabInputs.CategoryName"/>}    />

<div className="w-full flex flex-col justify-center items-center gap-2">

  {
    inputValues.map((value,index)=>{
      return(
        <div className="w-full flex justify-center items-center gap-2">
        <Input onChange={(e)=>handleInputChange(index,e)}   labelProps={{style:{color:LightModeState==LightMode().type?"black":"white"}}} label={"Sub Category Value "+parseInt(index+1, 10)}    />
{index==(inputValues.length-1)&&<><IconButton variant="text" onClick={addInputField} className="rounded-full">
<i class="fa-solid fa-plus"></i>
</IconButton>
<IconButton variant="text" onClick={RemoveInputField} className="rounded-full">
<i class="fa-solid fa-minus"></i>
</IconButton></>}
</div>
      )

    })
  }

</div>


<Button className="flex items-center mt-5 gap-3" onClick={HandleAddCategory}>
<i class="fa-solid fa-plus"></i>
{<TranslatedText TranslationPath="UCP.CategoryTable.TabActions.Add"/>}
</Button>
  </div>

</div>


    );
  }