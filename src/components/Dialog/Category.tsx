import React from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';
import AddCategory from '../Category/Add';
import CategoryTable from '../Table/Category';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/light-actions';
import PropTypes from 'prop-types';
import { RootState } from 'types/components/general';
import { useTranslation } from 'react-i18next';
CategoryDialog.propTypes = {
  Icon: PropTypes.string,
  Open: PropTypes.bool.isRequired,
  HandleOpen: PropTypes.func.isRequired,
  Title: PropTypes.node.isRequired,
  Content: PropTypes.string,
};
export default function CategoryDialog({ Icon, Open, HandleOpen, Title, Content }) {
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const mdbreakpoint = 720;
  const { t } = useTranslation();
  const CategoryTabs = [
    {
      label: t('UCP.CategoryTable.TabFilter.Manage'),
      value: 'Manage',
    },
    {
      label: t('UCP.CategoryTable.TabFilter.Add'),
      value: 'Add',
    },
  ];
  return (
    <>
      <Dialog
        open={Open}
        handler={HandleOpen}
        size="xxl"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <div
            className={`m-1 flex justify-center items-center gap-2 font-black  `}
            dangerouslySetInnerHTML={{ __html: Icon }}
          ></div>{' '}
          {Title}
        </DialogHeader>
        <DialogBody
          divider
          className="p-0 m-0 h-full w-full overflow-scroll"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {Content}

          <Tabs value="Manage">
            <TabsHeader
              className="p-0!"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {CategoryTabs.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {value === 'Manage' ? (
                    <i className="fa-solid fa-list-check h-5 w-5 m-1"></i>
                  ) : (
                    <i className="fa-solid fa-plus h-5 w-5 m-1"></i>
                  )}
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody
              className={`w-full h-full `}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {CategoryTabs.map(({ value }) => (
                <TabPanel className="w-full h-full" key={value} value={value}>
                  {value === 'Manage' ? (
                    <CategoryTable HandleOpen={HandleOpen} />
                  ) : (
                    <AddCategory HandleOpen={HandleOpen} />
                  )}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </DialogBody>
        <DialogFooter placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Button
            variant="text"
            onClick={HandleOpen}
            className="mr-1"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <i className="fa-solid fa-arrow-left mx-1"></i>
            <span>{t('UCP.CategoryTable.TabActions.Back')}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
