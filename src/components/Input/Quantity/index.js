import React from 'react';
import { Input, Button, IconButton } from '@material-tailwind/react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode, DarkMode } from '../../../redux/actions/LightActions';
export default function QuantityInput({
    ProductID,
    quantity,
    incrementHandler,
    decrementHandler,
    onchangeHandler
}) {

  const LightModeState = useSelector((state) => state.lightMode);
  const increment = () => {
    incrementHandler(ProductID,quantity+1)
  };
  const decrement = () => {
        decrementHandler(ProductID,quantity-1)
  };
  const onChange = ({ target }) => {
        onchangeHandler(ProductID,target.value)
  };

  return (
    <div className="flex flex-row  justify-center items-center  w-full m-2">
      <Button
        onClick={decrement}
        variant="text"
        size="sm"
        className=" rounded hover:scale-110 flex items-center m-1"
      >
        <i className="fa-solid fa-minus aspect-square"></i>
      </Button>

      <Input
        type="number"
        label="Quantity"
        variant="outlined"
        size="md"
        value={quantity}
        onChange={onChange}
        className={``}
        containerProps={{
          style: {
            maxWidth: '400px',
            minWidth: '10px',
          },
        }}
        labelProps={{
          style: {
            color: LightModeState == LightMode().type ? 'black' : 'white',
          },
        }}
      />

      <Button
        onClick={increment}
        size="sm"
        variant="text"
        className="rounded hover:scale-110 flex items-center m-1"
      >
        <i className="fa-solid fa-plus aspect-square"></i>
      </Button>
    </div>
  );
}
