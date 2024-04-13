import { Card } from '@material-tailwind/react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/light-actions';
import Footer from '../../components/footer';
import SideBar from '../../components/SideBar';
import React from 'react';
import TopBar from '../../components/Topbar';
import Topbarbg from '../../assets/images/Topbarbg.webp';
import InboxTable from '../../components/Table/Inbox';
import { useTranslation } from 'react-i18next';
import { RootState } from 'types/components/general';
export default function UCP_Inbox() {
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const { t } = useTranslation();
  var isLightMode = LightModeState === LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState === LightMode().type;
  }, [LightModeState]);
  return (
    <>
      <div className="flex flex-row items-stretch">
        <aside className={`background-secondary mb-2 rounded-b-xl p-4 shadow-lg hidden xl:block w-[20vw]`}>
          <SideBar />
        </aside>

        <main className="w-full min-h-screen flex flex-col justify-start items-center ">
          <section
            className=" flex flex-col justify-center items-stretch w-full text-center h-[17vh] p-4 shadow-xl shadow-blue-gray-900/ bg-cover"
            style={{ backgroundImage: `url(${Topbarbg})` }}
          >
            <TopBar SectionName={t('UCP.TopNav.TabTitles.Inbox')} Icon='<i className="fa-solid fa-inbox"></i>' />
          </section>

          <section className=" flex  w-full justify-center  text-center">
            <Card
              className={`background-secondary p-2 w-full  min-h-[82vh] m-2 `}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <InboxTable />
            </Card>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
