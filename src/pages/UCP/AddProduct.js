import {
  Card,
} from '@material-tailwind/react';
import TranslatedText from '../../utils/Translation';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/LightActions';
import Footer from '../../components/footer';
import SideBar from '../../components/SideBar';
import React from 'react';
import TopBar from '../../components/Topbar';
import Topbarbg from '../../assets/images/Topbarbg.webp';
import AddProduct from '../../components/Product/Add';
export default function UCP_EditProduct() {
  const LightModeState = useSelector((state) => state.lightMode);
  return (
    <>
      <div className="flex flex-row items-stretch flex-nowrap">
        <aside
          className={`mb-2 rounded-b-xl p-4 shadow-lg ${
            LightModeState == LightMode().type
              ? 'tc-whiteTheme_T1 bg-whiteTheme_T2'
              : 'tc-darkTheme_T1 bg-darkTheme_T2'
          }   hidden xl:block w-[20vw] animate-fade`}
        >
          <SideBar />
        </aside>

        <main className="w-full min-h-screen flex flex-col justify-start items-center ">
          <section
            className=" flex flex-col justify-center items-stretch w-full text-center h-[17vh] p-4 shadow-xl shadow-blue-gray-900/ bg-cover"
            style={{ backgroundImage: `url(${Topbarbg})` }}
          >
            <TopBar
              SectionName={
                <TranslatedText TranslationPath="UCP.TopNav.TabTitles.AddProduct" />
              }
              Icon='<i className="fa-solid fa-plus"></i>'
            />
          </section>

          <section className="w-full flex justify-center  text-center">
            <Card
              className={`p-2 w-full  min-h-[82vh] m-2 ${
                LightModeState == LightMode().type
                  ? 'tc-whiteTheme_T1 bg-whiteTheme_T2'
                  : 'tc-darkTheme_T1 bg-darkTheme_T2'
              }`}
            >
              <AddProduct />
            </Card>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
