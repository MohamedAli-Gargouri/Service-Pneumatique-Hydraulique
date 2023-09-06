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
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode, DarkMode } from '../../redux/actions/LightActions';
import TranslatedText from '../../utils/Translation';
export default function InputWithDropdown({ InputLabel }) {
  const LightModeState = useSelector((state) => state.lightMode);
  const { countries } = useCountries();

  // Find the index of Tunisia in the countries array
  const tunisiaIndex = countries.findIndex(
    (country) => country.name === 'Tunisia',
  );

  // Initialize the country state with the index of Tunisia
  const [country, setCountry] = React.useState(tunisiaIndex);

  const { name, flags, countryCallingCode } = countries[country];

  return (
    <div className="relative flex w-full">
      <Menu placement="bottom-start">
        <MenuHandler>
          <Button
            ripple={false}
            variant="text"
            color="blue-gray"
            className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
          >
            <img
              src={flags.svg}
              alt={name}
              className="h-4 w-4 rounded-full object-cover"
            />
            {countryCallingCode}
          </Button>
        </MenuHandler>
        <MenuList
          className={`${
            LightModeState == LightMode().type
              ? 'bg-whiteTheme_T2'
              : 'bg-darkTheme_T2'
          } max-h-[20rem] max-w-[18rem]`}
        >
          {countries.map(({ name, flags, countryCallingCode }, index) => {
            return (
              <MenuItem
                Z
                key={name}
                value={name}
                className="flex items-center gap-2"
                onClick={() => setCountry(index)}
              >
                <img
                  src={flags.svg}
                  alt={name}
                  className="h-5 w-5 rounded-full object-cover"
                />
                {name} <span className="ml-auto">{countryCallingCode}</span>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
      <Input
        type="tel"
        placeholder={InputLabel}
        className={`rounded-l-none !border-t-blue-gray-200 focus:!border-t-blue-500`}
        labelProps={{
          className: `before:content-none after:content-none`,
        }}
        containerProps={{
          className: 'min-w-0',
        }}
      />
    </div>
  );
}
InputWithDropdown.propTypes = {
  InputLabel: PropTypes.string.isRequired,
};
