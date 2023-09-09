import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  IconButton,
  Popover,
  PopoverHandler,
  PopoverContent,
} from '@material-tailwind/react';
import { Textarea } from '@material-tailwind/react';
import TransactionsTable from '../../components/Table/Orders';
import Navbar from '../../components/NavBar';
import TranslatedText from '../../utils/Translation';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode, DarkMode } from '../../redux/actions/LightActions';
import PhoneInput from '../../components/Input/Phone';
import Order from '../../components/Table/Order';
import Footer from '../../components/footer';
import SideBar from '../../components/SideBar';
import React from 'react';
import TopBar from '../../components/Topbar';
import Topbarbg from '../../assets/images/Topbarbg.webp';
import Product from '../../components/Product/Edit';
export default function UCP_EditProduct() {
  const LightModeState = useSelector((state) => state.lightMode);
  return (
    <>
      <div className="flex flex-row items-stretch">
        <aside
          className={`mb-2 rounded-b-xl p-4 shadow-lg${
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
                <TranslatedText TranslationPath="UCP.TopNav.TabTitles.EditProduct" />
              }
              Icon='<i className="fa-solid fa-box"></i>'
            />
          </section>

          <section className="w-full flex justify-center  text-center">
            <Card
              className={`p-2 w-full  min-h-[82vh] m-2   ${
                LightModeState == LightMode().type
                  ? 'tc-whiteTheme_T1 bg-whiteTheme_T2'
                  : 'tc-darkTheme_T1 bg-darkTheme_T2'
              }`}
            >
              <Product />
            </Card>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
