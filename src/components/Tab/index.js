import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {LightMode,DarkMode} from "../../redux/actions/LightActions"
 import React from "react";
 export default function TabsCustomAnimation(props) {
  const data =props.data
  const LightModeState=useSelector(state=>state.lightMode)
  return (
    <Tabs id="custom-animation"  value={props.DefaultSelectValue}>
      <TabsHeader>
        {data.map(({ label, value,icon  }) => (
          <Tab key={value} value={value} className="m-4">
            {icon}
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody
      className="m-0"
        animate={{
          initial: { y: 250 },
          mount: { y: 0 },
          unmount: { y: 250 },
        }}
      >
        {data.map(({ value, desc }) => (
          <TabPanel   key={value} value={value}  className={`${LightModeState==LightMode().type?" tc-whiteTheme_T1":" tc-darkTheme_T1"}`}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}