import React from 'react';
import { Collapse, Button, Badge, IconButton } from '@material-tailwind/react';
import NotificationTable from '../Table/Notification';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/light-actions';
import { useTranslation } from 'react-i18next';
import { RootState } from 'redux/reducers';
export default function Notification() {
  const [open, setOpen] = React.useState(false);
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const { t, i18n } = useTranslation();
  var isLightMode = LightModeState == LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState == LightMode().type;
  }, [LightModeState]);
  const toggleOpen = () => setOpen((cur) => !cur);

  return (
    <div className="relative ">
      <Badge content="5" className="" placement="top-end">
        <IconButton
          variant="text"
          className=" text-white-c rounded-full"
          onClick={toggleOpen}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <i className="fa-solid fa-bell"></i>
        </IconButton>
      </Badge>
      <Collapse open={open} className={`z-50 w-[90vw] md:w-[40vw] top-[3rem] right-[-3rem] absolute md:right-[0.5rem]`}>
        <div
          className={`background-secondary overflow-auto rounded-lg shadow-lg w-full h-full p-0  flex flex-col  justify-stretch items-end`}
        >
          <div style={{ backgroundColor: '#e53935', color: 'white' }} className={`text-center w-full  `}>
            <p>{t('UCP.Notifications.Title')}</p>
          </div>
          <div className="Body p-2 w-full">
            <NotificationTable />
          </div>

          <div className="footer  texw-full flex  justify-center items-center">
            <Button
              variant="text"
              className="mb-1 mr-1"
              onClick={() => {
                window.location.href = '/UCP/Inbox';
              }}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {t('UCP.Notifications.TabActions.ViewAll')}
            </Button>
          </div>
        </div>
      </Collapse>
    </div>
  );
}
