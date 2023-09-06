import React from 'react';
import { useCountries } from 'use-react-countries';
import {
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from '@material-tailwind/react';
import Multiselect from 'multiselect-react-dropdown';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode, DarkMode } from '../../redux/actions/LightActions';
import TranslatedText from '../../utils/Translation';
import './MultiSelect.css';
export default function MultiSelect({ Data, DataLabelName, SelectData }) {
  const LightModeState = useSelector((state) => state.lightMode);
  const OnSubCategorySelect = (Selected) => {
    console.log(SelectData.current);
    SelectData.current = Selected;
    console.log(SelectData.current);
  };
  const OnSubCategoryRemove = (Selected) => {
    console.log(SelectData.current);
    SelectData.current = Selected;
    console.log(SelectData.current);
  };

  const setPlaceholderStyle = (placeholderColor) => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
          .multiSelectContainer input::placeholder {
            color: ${placeholderColor} !important;
          }
        `;
    document.head.appendChild(styleTag);
  };

  if (LightModeState == LightMode().type) {
    setPlaceholderStyle('black');
  } else {
    setPlaceholderStyle('white');
  }
  return (
    <div className=" relative w-full">
      <Multiselect
        placeholder="Product Sub-Categories"
        style={{
          multiselectContainer: {
            width: '100%',
          },
          searchBox: {
            borderColor: '#b0bec5',
            fontSize: '14px',
            minHeight: '50px',
          },
          inputField: {},
          chips: {
            background: '#e53935',
          },
          option: {
            color: 'inherit',
          },
          optionContainer: {
            background: `${
              LightModeState == LightMode().type
                ? 'white'
                : 'rgba(51, 51, 51, 1)'
            }`,
          },
        }}
        options={Data} // Options to display in the dropdown
        selectedValues={SelectData.current} // Preselected value to persist in dropdown
        onSelect={OnSubCategorySelect} // Function will trigger on select event
        onRemove={OnSubCategoryRemove} // Function will trigger on remove event
        displayValue={DataLabelName} // Property name to display in the dropdown options
      />

      <i class=" absolute top-4 right-3  text-blue-gray-500 fa-solid fa-arrow-down-short-wide"></i>
    </div>
  );
}
MultiSelect.propTypes = {
  InputLabel: PropTypes.string.isRequired,
  Data: PropTypes.array.isRequired,
  DataLabelName: PropTypes.string.isRequired,
  SelectData: PropTypes.any,
};
