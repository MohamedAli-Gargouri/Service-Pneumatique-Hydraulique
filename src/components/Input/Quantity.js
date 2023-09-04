import React from "react";
import { Input, Button,IconButton } from "@material-tailwind/react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {LightMode,DarkMode} from "../../redux/actions/LightActions"
export default function InputWithButton({Id,IdLabel, Quantities,QuantityLabel, setQuantities }) {
  const LightModeState=useSelector(state=>state.lightMode)
  
  var InputQuantity=0;
  if(Quantities!=undefined)
  {

    InputQuantity=Quantities.find((item) => item[IdLabel] === Id)[QuantityLabel]
  }
  const onChange = ({ target }) =>
  {
    if(Quantities!=undefined && setQuantities!=undefined &&QuantityLabel!=undefined)
    {
      var newQuantities=Quantities.map((item)=>{
        if(item.ProductCode === Id)
        {
         return {...item,Quantity:parseInt(target.value)}
        }
        else
        {
         return item
        }
        })
        setQuantities(newQuantities)
    }

  } 
  const increment=()=>{
    if(Quantities!=undefined && setQuantities!=undefined &&QuantityLabel!=undefined)
    {
      var newQuantities=Quantities.map((item)=>{
        if(item.ProductCode === Id)
        {
         return {...item,Quantity:InputQuantity+1}
        }
        else
        {
         return item
        }
        })
        setQuantities(newQuantities)

    }

}



  const decrement=()=>{

    if(Quantities!=undefined && setQuantities!=undefined &&QuantityLabel!=undefined)
    {
 if(InputQuantity-1>=1)
      {

        var newQuantities=Quantities.map((item)=>{
          if(item.ProductCode === Id)
          {
           return {...item,Quantity:InputQuantity-1}
          }
          else
          {
           return item
          }
    })
    setQuantities(newQuantities)

      }
    }
    
    }


  return (
    <div className="flex flex-row  justify-center items-center  w-full m-2">
             
<Button   onClick={decrement} variant="text" size="sm" className=" rounded hover:scale-110 flex items-center m-1">
<i class="fa-solid fa-minus aspect-square"></i>
</Button>


  <Input

  type="number"       
  label="Quantity"
  variant="outlined"
  size="md"
  value={InputQuantity}
  onChange={onChange}
  className={``}
  containerProps={{style: {
    maxWidth:"400px",
    minWidth: '10px', 
  },}}
  labelProps={{style:{color:LightModeState==LightMode().type?"black":"white"}}}
/>




<Button  onClick={increment} size="sm" variant="text" className="rounded hover:scale-110 flex items-center m-1">
<i class="fa-solid fa-plus aspect-square"></i>
</Button>

    </div>
  );
}