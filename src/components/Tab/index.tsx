import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/light-actions';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { RootState } from 'redux/reducers';
AnimatedTab.propTypes = {
  data: PropTypes.array.isRequired,
  DefaultSelectValue: PropTypes.string,
};
export default function AnimatedTab({ data, DefaultSelectValue }) {
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const { t, i18n } = useTranslation();
  var isLightMode = LightModeState == LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState == LightMode().type;
  }, [LightModeState]);
  return (
    <Tabs id="custom-animation" className=" overflow-scroll" value={DefaultSelectValue}>
      <TabsHeader
        className=" overflow-auto "
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {data.map(({ label, value, icon }) => (
          <Tab
            key={value}
            value={value}
            className="m-1 "
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
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
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
