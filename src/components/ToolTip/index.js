import { Tooltip, Typography } from '@material-tailwind/react';

export default function TooltipCustomStyles(props) {
  return (
    <Tooltip
      placement="bottom"
      className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
      content={
        <div className="w-80">
          <Typography color="blue-gray" className="font-medium">
            {props.Header}
          </Typography>
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal opacity-80"
          >
            {props.Content}
          </Typography>
        </div>
      }
    >
      <i class="fa-solid fa-align-left"></i>
    </Tooltip>
  );
}
