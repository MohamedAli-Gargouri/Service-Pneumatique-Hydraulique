import React from "react";
import { Input, Button,IconButton } from "@material-tailwind/react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {LightMode,DarkMode} from "../../redux/actions/LightActions"
export default function InputWithButton() {
  const LightModeState=useSelector(state=>state.lightMode)
  const [Quantity, setQuantity] = React.useState(0);
  const smBreakpoint = 540;
  const onChange = ({ target }) => setQuantity(parseInt(target.value));
  const increment=()=>{setQuantity(Quantity+1)}
  const decrement=()=>{setQuantity(Quantity-1)}
  return (
    <div className="flex flex-row  justify-center items-center  w-full m-2">
             
<Button onClick={decrement} size="sm" className="hover:scale-110 flex items-center m-1">
<i class="fa-solid fa-minus"></i>
</Button>

<Input
        type="number"       
        label="Quantity"
        variant="static"
        value={Quantity}
        onChange={onChange}
        className={`${window.innerWidth < smBreakpoint?"w-[29%]":"w-full"}`}
        labelProps={{style:{color:LightModeState==LightMode().type?"black":"white"}}}
      />
<Button onClick={increment} size="sm" className="hover:scale-110 flex items-center m-1">
<i class="fa-solid fa-plus"></i>
</Button>

    </div>
  );
}