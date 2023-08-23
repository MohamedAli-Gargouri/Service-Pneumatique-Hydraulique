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
  import React from "react";
 import { useSelector } from "react-redux/es/hooks/useSelector";
 import {LightMode,DarkMode} from "../../redux/actions/LightActions"

  export default function Product() {
    const LightModeState=useSelector(state=>state.lightMode)
    return (
<div className="flex flex-col justify-center items-center gap-1">
<Input  variant="standard"  labelProps={{style:{color:LightModeState==LightMode().type?"black":"white"}}} label="Category Name"    />
<Button className="flex items-center mt-5 gap-3">
<i class="fa-solid fa-plus"></i>
        Add Category
      </Button>
</div>


    );
  }