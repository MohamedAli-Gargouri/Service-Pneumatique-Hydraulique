import React from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Typography } from '@material-tailwind/react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/light-actions';
import PropTypes from 'prop-types';
import { RootState } from 'types/components/general';
ConfirmDialog.propTypes = {
  Open: PropTypes.bool.isRequired,
  color: PropTypes.string,
  Title: PropTypes.node.isRequired,
  Icon: PropTypes.string.isRequired,
  Content: PropTypes.node,
  Action: PropTypes.func.isRequired,
  HandleOpen: PropTypes.func.isRequired,
};
export default function ConfirmDialog({ Open, color, Title, Icon, Content, Action, HandleOpen }) {
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  return (
    <>
      <Dialog
        open={Open}
        handler={HandleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Typography
            variant="paragraph"
            color={color == undefined ? (LightModeState == LightMode().type ? 'black' : 'white') : color}
            className={`m-1 flex justify-center items-center gap-2 font-black  `}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <i className={Icon + ' mx-1'}></i>
            {Title}
          </Typography>
        </DialogHeader>
        <DialogBody
          divider={true}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {Content}
        </DialogBody>
        <DialogFooter placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Button
            variant="text"
            color="blue-gray"
            onClick={HandleOpen}
            className="mr-1"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <i className="fa-solid fa-xmark mx-2"></i>
            <span>Cancel</span>
          </Button>
          <Button
            variant="text"
            color={color == undefined ? 'blue' : color}
            onClick={() => {
              Action();
              HandleOpen();
            }}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <i color={color == undefined ? 'blue' : color} className={Icon + ' mx-1'}></i>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
