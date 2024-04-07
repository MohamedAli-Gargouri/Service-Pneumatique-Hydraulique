import React from 'react';
import { countries, getEmojiFlag } from 'countries-list';
import { Input, Menu, MenuHandler, MenuList, MenuItem, Button } from '@material-tailwind/react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/LightActions';
import PropTypes from 'prop-types';
PhoneInput.propTypes = {
  internationalDialRef: PropTypes.object.isRequired,
  phoneNumberRef: PropTypes.object.isRequired,
};
import { useTranslation } from 'react-i18next';
export default function PhoneInput({ internationalDialRef, phoneNumberRef }) {
  const LightModeState = useSelector((state) => state.lightMode);
  const countryArray = Object.entries(countries);
  const [country, setCountry] = React.useState(['TN', countries.TN]);
  const selectedCountryName = country.name;
  const { t, i18n } = useTranslation();
  var isLightMode = LightModeState == LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState == LightMode().type;
  }, [LightModeState]);
  React.useEffect(() => {
    internationalDialRef.current = country[1].phone[0];
  }, [country]);

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
              loading="lazy"
              key={country[0]}
              src={'https://flagcdn.com/' + country[0].toLocaleLowerCase() + '.svg'}
              alt={selectedCountryName}
              className="h-4 w-4 rounded-full object-cover"
            />
            {country[1].name}
          </Button>
        </MenuHandler>
        <MenuList className={` max-h-[20rem] max-w-[18rem]`}>
          {countryArray.map((country, index) => {
            return (
              <MenuItem
                key={country[0]}
                value={country[0]}
                className="flex items-center gap-2"
                onClick={() => setCountry(country)}
              >
                <img
                  loading="lazy"
                  src={'https://flagcdn.com/' + country[0].toLocaleLowerCase() + '.svg'}
                  alt={country[0]}
                  className="h-5 w-5 rounded-full object-cover"
                />
                {country[1].name} <span className="ml-auto">{country[1].phone[0]}</span>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
      <Input
        inputRef={phoneNumberRef}
        type="number"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        placeholder={''}
        label={''}
        variant="outlined"
        className={`rounded-l-none !border-t-blue-gray-200 focus:!border-t-blue-500`}
        labelProps={{
          className: `before:content-none after:content-none`,
        }}
        containerProps={{
          style: {
            maxWidth: '100%',
            minWidth: '10px',
          },
        }}
      />
    </div>
  );
}
