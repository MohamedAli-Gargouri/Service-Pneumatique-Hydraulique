import { Tooltip, Typography } from '@material-tailwind/react';
import React from 'react';
import PropTypes from 'prop-types';
TooltipCustomStyles.propTypes = {
  Header: PropTypes.string.isRequired,
  Content: PropTypes.string.isRequired,
};
import { LightMode } from '../../redux/actions/LightActions';
import { useSelector } from 'react-redux';
export default function TooltipCustomStyles({ Header, Content }) {
  const LightModeState = useSelector((state) => state.lightMode);
  return (
    <Tooltip
      placement="bottom"
      className={`border border-blue-gray-50 px-4 py-3 shadow-xl shadow-black/10`}
      content={
        <div className="w-80">
          <Typography className="font-medium">{Header}</Typography>
          <Typography variant="small" className="font-normal opacity-80">
            {Content}
          </Typography>
        </div>
      }
    >
      <i className="fa-solid fa-align-left"></i>
    </Tooltip>
  );
}
