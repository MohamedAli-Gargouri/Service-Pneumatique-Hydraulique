import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography
} from "@material-tailwind/react";
 
export default function DeleteConfirm(props) {
 
  return (
    <>
      <Dialog
        open={props.Open}
        handler={props.HandleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>
            
        <Typography  variant="p" color={props.color==undefined?"blue":props.color} className={`m-1 flex justify-center items-center gap-2 font-black  `}>
        <div dangerouslySetInnerHTML={{ __html: props.Icon }}></div> {props.Title}
        </Typography> 
            </DialogHeader>
        <DialogBody divider>
           {props.Content}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="blue-gray"
            onClick={props.HandleOpen}
            className="mr-1"
          >
            <i class="fa-solid fa-xmark mx-2"></i>
            <span>Cancel</span>
          </Button>
          <Button variant="text" color={props.color==undefined?"blue":props.color} onClick={()=>{props.Action();props.HandleOpen();}}>
          <span dangerouslySetInnerHTML={{ __html: props.Icon }}></span>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}