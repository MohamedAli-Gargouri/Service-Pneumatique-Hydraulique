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
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode, DarkMode } from '../../redux/actions/LightActions';
import CountUp from 'react-countup';
import Footer from '../../components/footer';
import SideBar from '../../components/SideBar';
import React from 'react';
import TopBar from '../../components/Topbar';
import Topbarbg from '../../assets/images/Topbarbg.jpg';
import TranslatedText from '../../utils/Translation';
import { CreateToast } from '../../utils/Toast';
import ReactDOMServer from 'react-dom/server';
import SPHVideosrc from '../../assets/videos/SPH.mp4';
import Carousel from '../../components/Carousel';
export default function User_Control_Panel() {
  const LightModeState = useSelector((state) => state.lightMode);

  const [Info, SetInfo] = React.useState([
    {
      Name: 'Products',
      Count: 500,
      logo: <i className="fa-solid fa-boxes-stacked  fa-2x"></i>,
      msg: '',
      col: 'red',
    },
    {
      Name: 'Clients',
      Count: 10,
      logo: <i className="fa-solid fa-users fa-2x"></i>,
      msg: '',
      col: 'blue',
    },
    {
      Name: 'Employee',
      Count: 3,
      logo: <i className="fa-solid fa-user-gear fa-2x"></i>,
      msg: '',
      col: 'green',
    },
    {
      Name: 'Orders',
      Count: 50,
      logo: <i className="fa-solid fa-clipboard-check fa-2x"></i>,
      msg: '',
      col: 'yellow',
    },
  ]);
  return (
    <>
      <div className="flex flex-row items-stretch">
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
              SectionName={'Home'}
              Icon='<i className="fa-solid fa-house"></i>'
            />
          </section>

          <section className="w-full text-center">
            <Card
              className={`min-h-[82vh] m-2 ${
                LightModeState == LightMode().type
                  ? 'tc-whiteTheme_T1 bg-whiteTheme_T2'
                  : 'tc-darkTheme_T1 bg-darkTheme_T2'
              }`}
            >
              <div className="p-2 w-full gap-2 justify-center items-start  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Info.map((Insight, index) => {
                  return (
                    <Card className=" bg-inherit text-inherit mt-2 p-2 border-l-red-400  border-4 flex flex-col md:flex-row flex-wrap hover:scale-95 justify-evenly gap-2 items-center col-span-1">
                      <div className=" p-2 md:p-4 rounded-full bg-red-600 text-white self-center md:self-start ">
                        {Insight.logo}
                      </div>
                      <Typography variant="h6" className="">
                        <CountUp end={Insight.Count} duration={10} />
                      </Typography>

                      <Typography variant="lead" className="">
                        {Insight.Name}
                      </Typography>
                    </Card>
                  );
                })}

                <div className=" rounded-md aspect-video  w-full h-full mt-0 col-span-2">
                  <video
                    className=" rounded-md"
                    pl
                    width={'100%'}
                    height={'100%'}
                    controls
                  >
                    <source src={SPHVideosrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className="h-full w-full mt-0 col-span-2">
                  <Carousel />
                </div>
              </div>
            </Card>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
