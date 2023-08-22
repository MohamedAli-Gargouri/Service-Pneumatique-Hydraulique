import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography
} from "@material-tailwind/react";
 
export default function Category(props) {
 
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
            
        <Typography  variant="p" color="blue" className={`m-1 flex justify-center items-center gap-2 font-black  `}>
        <div dangerouslySetInnerHTML={{ __html: props.Icon }}></div> {props.Title}
        </Typography> 
            </DialogHeader>
        <DialogBody divider>
           {props.Content}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={props.HandleOpen}
            className="mr-1"
          >
            <i class="fa-solid fa-xmark mx-2"></i>
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="red" onClick={()=>{props.Action();props.HandleOpen();}}>
          <i class="fa-solid fa-trash-can mx-2"></i>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}