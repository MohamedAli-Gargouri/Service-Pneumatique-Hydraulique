import React from "react";
import { Input, Button,IconButton } from "@material-tailwind/react";
 
export default function InputWithButton() {
  const [Quantity, setQuantity] = React.useState(0);
  const onChange = ({ target }) => setQuantity(parseInt(target.value));
  const increment=()=>{setQuantity(Quantity+1)}
  const decrement=()=>{setQuantity(Quantity-1)}
  return (
    <div className="flex  w-full m-2">
             
<Button onClick={decrement} className="hover:scale-110 flex items-center mx-1">
<i class="fa-solid fa-minus"></i>
</Button>


<Input
        type="number"       
        label="Quantity"
        value={Quantity}
        onChange={onChange}
        className=""

      />
<Button onClick={increment} className="hover:scale-110 flex items-center mx-1">
<i class="fa-solid fa-plus"></i>
</Button>

    </div>
  );
}