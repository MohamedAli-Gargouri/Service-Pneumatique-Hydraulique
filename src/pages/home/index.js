import Navbar from '../../components/NavBar';
import Footer from '../../components/footer';
import React from 'react';
import PresentationSection from './PresentationSection';
import ServicesSection from './ServicesSection';
import HeroImage from '../../assets/images/background1.png';
import HeroCompressor from '../../assets/images/HeroBannerCompressor.png';
import Partners from './Partners';
import Employees from './Employees';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode, DarkMode } from '../../redux/actions/LightActions';
import TranslatedText from '../../utils/Translation';
import { Typography, Button } from '@material-tailwind/react';
const Home = () => {
  const LightModeState = useSelector((state) => state.lightMode);
  return (
    <React.Fragment>
      <Navbar />
      <div
        style={{ backgroundImage: `url(${HeroImage})` }}
        className=" flex justify-center items-center flex-wrap gap-1 bg-cover aspect-video  h-[170vh] md:h-[100vh] w-full  "
      >
        <div className=" order-2 mt-0 md:order-1 w-full animate-LeftToRight md:w-fit md:h-[70%] aspect-square">
          <img
            className="m-0  animate-rotate   Imageshadow"
            src={HeroCompressor}
          />
        </div>

        <div className=" order-1 mt-28 h-[50%] md:mt-0  w-full md:h-full md:w-[50%] flex justify-center  items-start md:items-center p-4">
          <div
            style={{
              background:
                'linear-gradient(to right, rgb(229, 57, 53,0.0), rgb(0, 0, 0,0.3))',
            }}
            className="w-full md:w-fit  text-white Imageshadow text-center animate-RightToLeft  hover:scale-105 backdrop-blur-md rounded-lg flex flex-col justify-start gap-0 items-center pt-3"
          >
            <Typography variant="h1">
              <TranslatedText TranslationPath="Home.HeroTitle" />
            </Typography>

            <Typography variant="h7" className=" italic">
              <TranslatedText TranslationPath="Home.HeroDescription" />
            </Typography>

            <div className="flex items-center justify-center h-full">
              <Button
                onClick={() => (window.location.href = './Contact')}
                color="white"
                variant="outlined"
                className=" italic shadowed-div flex items-center gap-3 m-4 hover:scale-x-105 hover:scale-y-105"
              >
                <i class="fa-solid fa-phone"></i>

                <TranslatedText TranslationPath="Home.ContactusBtn" />
              </Button>

              <Button
                onClick={() => (window.location.href = './products')}
                color="white"
                variant="outlined"
                className=" italic shadowed-div flex items-center gap-3 m-4 hover:scale-x-105 hover:scale-y-105"
              >
                <i class="fa-solid fa-cart-shopping"></i>
                <TranslatedText TranslationPath="Home.CheckProducts" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <PresentationSection />
      <ServicesSection />
      <Partners />
      <Footer />
    </React.Fragment>
  );
};
export default Home;
