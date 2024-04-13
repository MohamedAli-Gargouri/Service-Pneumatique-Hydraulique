import { Tooltip, Typography } from '@material-tailwind/react';
import React from 'react';
import PropTypes from 'prop-types';
TooltipCustomStyles.propTypes = {
  Header: PropTypes.string.isRequired,
  Content: PropTypes.string.isRequired,
};
import { LightMode } from '../../redux/actions/light-actions';
import { useSelector } from 'react-redux';
import { RootState } from 'types/components/general';
export default function TooltipCustomStyles({ Header, Content }) {
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  return (
    <Tooltip
      placement="bottom"
      className={`border border-blue-gray-50 px-4 py-3 shadow-xl shadow-black/10`}
      content={
        <div className="w-80">
          <Typography
            className="font-medium"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {Header}
          </Typography>
          <Typography
            variant="small"
            className="font-normal opacity-80"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {Content}
          </Typography>
        </div>
      }
    >
      <i className="fa-solid fa-align-left"></i>
    </Tooltip>
  );
}
