import React from "react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import AddCategory from "../Category/Add"
 import CategoryTable from "../Table/Category"
export default function Category(props) {
  const mdbreakpoint=720
  const CategoryTabs = [
    {
      label: "Manage Categories",
      value: "Manage",

    },
    {
      label: "Add Category",
      value: "Add",
    },
    
  ];
  return (
    <>
      <Dialog
        open={props.Open}
        handler={props.HandleOpen}
        size={window.innerWidth<mdbreakpoint?"xxl":"xl"}
        className="]"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>
            
        <Typography  variant="p"  className={`m-1 flex justify-center items-center gap-2 font-black  `}>
        <div dangerouslySetInnerHTML={{ __html: props.Icon }}></div> {props.Title}
        </Typography> 
            </DialogHeader>
        <DialogBody divider className=" max-h-[70vh] overflow-scroll">
           {props.Content}

           <Tabs value="Manage" className="" >
      <TabsHeader
        className="bg-transparent"
        indicatorProps={{
          className: "bg-gray-900/10 shadow-none !text-gray-900",
        }}
      >
        {CategoryTabs.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {value=="Manage"?<i class="fa-solid fa-list-check h-5 w-5 m-1"></i>:<i class="fa-solid fa-plus h-5 w-5 m-1"></i>}
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {CategoryTabs.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {value=="Manage"?<CategoryTable/>:<AddCategory/>}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
           
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            onClick={props.HandleOpen}
            className="mr-1"
          >
            <i class="fa-solid fa-arrow-left mx-1"></i>
            <span>Back</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}