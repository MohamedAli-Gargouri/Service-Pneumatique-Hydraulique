import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
 
 export default function TabsCustomAnimation(props) {
  const data =props.data

  return (
    <Tabs id="custom-animation" value={props.DefaultSelectValue}>
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
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
          <TabPanel  key={value} value={value} className="">
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}