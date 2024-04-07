import React from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Typography } from '@material-tailwind/react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/LightActions';
import PropTypes from 'prop-types';
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
  const LightModeState = useSelector((state) => state.lightMode);
  return (
    <>
      <Dialog
        open={Open}
        handler={HandleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>
          <Typography
            variant="paragraph"
            color={color == undefined ? (LightModeState == LightMode().type ? 'black' : 'white') : color}
            className={`m-1 flex justify-center items-center gap-2 font-black  `}
          >
            <i className={Icon + ' mx-1'}></i>
            {Title}
          </Typography>
        </DialogHeader>
        <DialogBody divider={true}>{Content}</DialogBody>
        <DialogFooter>
          <Button variant="text" color="blue-gray" onClick={HandleOpen} className="mr-1">
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
          >
            <i color={color == undefined ? 'blue' : color} className={Icon + ' mx-1'}></i>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
