import React from "react";
import TranslatedText from "../../utils/Translation"
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
 import { useSelector } from "react-redux/es/hooks/useSelector";
import {LightMode,DarkMode} from "../../redux/actions/LightActions"
export default function Category({Icon,Open,HandleOpen,Title,Content}) {
  const LightModeState=useSelector(state=>state.lightMode)
  const mdbreakpoint=720
  const CategoryTabs = [
    {
      label: <TranslatedText TranslationPath="UCP.CategoryTable.TabFilter.Manage"/>,
      value: "Manage",

    },
    {
      label: <TranslatedText TranslationPath="UCP.CategoryTable.TabFilter.Add"/>,
      value: "Add",
    },
    
  ];
  return (
    <>
      <Dialog
        open={Open}
        handler={HandleOpen}
        size="xxl"
        className={` ${LightModeState==LightMode().type?"bg-whiteTheme_T1 tc-whiteTheme_T1":"bg-darkTheme_T1 tc-darkTheme_T1"}`}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>
            
        <Typography  variant="p" color={LightModeState==LightMode().type?"black":"white"}  className={`m-1 flex justify-center items-center gap-2 font-black  `}>
        <div dangerouslySetInnerHTML={{ __html: Icon }}></div> {Title}
        </Typography> 
            </DialogHeader>
        <DialogBody divider className=" h-full w-full overflow-scroll">
           {Content}

           <Tabs value="Manage"  >
      <TabsHeader
        className=""
        indicatorProps={{
          className: ` ${LightModeState==LightMode().type?" tc-whiteTheme_T1":" tc-darkTheme_T1"}`
        }}
      >
        {CategoryTabs.map(({ label, value }) => (
          <Tab style={{ textWrap:"nowrap"}}  key={value} value={value}>
            {value=="Manage"?<i class="fa-solid fa-list-check h-5 w-5 m-1"></i>:<i class="fa-solid fa-plus h-5 w-5 m-1"></i>}
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className={`w-full h-full ${LightModeState==LightMode().type?" tc-whiteTheme_T1":" tc-darkTheme_T1"}`}>
        {CategoryTabs.map(({ value, desc }) => (
          <TabPanel className="w-full h-full" key={value} value={value}>
            {value=="Manage"?<CategoryTable HandleOpen={HandleOpen}/>:<AddCategory HandleOpen={HandleOpen}/>}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
           
        </DialogBody>
        <DialogFooter >
          <Button
            variant="text"
            onClick={HandleOpen}
            className="mr-1"
          >
            <i class="fa-solid fa-arrow-left mx-1"></i>
            <span><TranslatedText TranslationPath="UCP.CategoryTable.TabActions.Back"/></span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}