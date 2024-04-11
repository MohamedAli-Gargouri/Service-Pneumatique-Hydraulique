import React from 'react';
import { Input, Button } from '@material-tailwind/react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../../redux/actions/light-actions';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { RootState } from 'redux/reducers';
InvoiceQuantityInput.propTypes = {
  Id: PropTypes.number.isRequired,
  IdLabel: PropTypes.string.isRequired,
  Quantities: PropTypes.array.isRequired,
  QuantityLabel: PropTypes.string.isRequired,
  setQuantities: PropTypes.func.isRequired,
};
export default function InvoiceQuantityInput({ Id, IdLabel, Quantities, QuantityLabel, setQuantities }) {
  //Quantities represent a state that contains the list quantity
  //SetQuantities is the setstate that set it
  //Idlabel is the label inside the list of quantities
  //ID is the ID of the product
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const { t, i18n } = useTranslation();
  var isLightMode = LightModeState == LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState == LightMode().type;
  }, [LightModeState]);
  var InputQuantity = 0;
  if (Quantities != undefined) {
    InputQuantity = Quantities.find((item) => item[IdLabel] === Id)[QuantityLabel];
  }
  const onChange = ({ target }) => {
    if (Quantities != undefined && setQuantities != undefined && QuantityLabel != undefined) {
      var newQuantities = Quantities.map((item) => {
        if (item.ProductCode === Id) {
          return { ...item, Quantity: parseInt(target.value) };
        } else {
          return item;
        }
      });
      setQuantities(newQuantities);
    }
  };
  const increment = () => {
    if (Quantities != undefined && setQuantities != undefined && QuantityLabel != undefined) {
      var newQuantities = Quantities.map((item) => {
        if (item.ProductCode === Id) {
          return { ...item, Quantity: InputQuantity + 1 };
        } else {
          return item;
        }
      });
      setQuantities(newQuantities);
    }
  };

  const decrement = () => {
    if (Quantities != undefined && setQuantities != undefined && QuantityLabel != undefined) {
      if (InputQuantity - 1 >= 1) {
        var newQuantities = Quantities.map((item) => {
          if (item.ProductCode === Id) {
            return { ...item, Quantity: InputQuantity - 1 };
          } else {
            return item;
          }
        });
        setQuantities(newQuantities);
      }
    }
  };

  return (
    <div className="flex flex-row  justify-center items-center  w-full m-2">
      <Button
        onClick={decrement}
        variant="text"
        size="sm"
        className=" rounded hover:scale-110 flex items-center m-1"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <i className="fa-solid fa-minus aspect-square"></i>
      </Button>

      <Input
        type="number"
        label="Quantity"
        variant="outlined"
        size="md"
        value={InputQuantity}
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
            color: isLightMode ? 'black' : 'white',
          },
        }}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
      />

      <Button
        onClick={increment}
        size="sm"
        variant="text"
        className="rounded hover:scale-110 flex items-center m-1"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <i className="fa-solid fa-plus aspect-square"></i>
      </Button>
    </div>
  );
}
