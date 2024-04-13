import Navbar from 'components/NavBar';
import Footer from 'components/footer';
import React from 'react';
import Presentation from './Presentation';
import Services from './Services';
import HeroImage from 'assets/images/background1.webp';
import HeroCompressor from 'assets/images/HeroBannerCompressor.webp';
import Partners from './Partners';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Typography, Button } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { LightMode } from 'redux/actions/light-actions';
import { RootState } from 'types/components/general';
//Animations Config
const BannerLeftSideAnimations = {
  hidden: {
    opacity: 0,
    y: 0,
    x: -200,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const BannerRightSideAnimations = {
  hidden: {
    opacity: 0,
    y: 0,
    x: 200,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const Home = () => {
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const { t } = useTranslation();
  var isLightMode = LightModeState == LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState == LightMode().type;
  }, [LightModeState]);
  return (
    <React.Fragment>
      <Navbar />
      <div
        style={{ backgroundImage: `url(${HeroImage})` }}
        className=" grid grid-cols-2 justify-center items-center flex-wrap md:flex-nowrap gap-0 bg-cover aspect-video  h-[170vh] md:h-[100vh] w-full  "
      >
        <motion.div
          initial={'hidden'}
          variants={BannerLeftSideAnimations}
          animate={inView ? 'visible' : 'hidden'}
          ref={ref}
          className=" col-span-2 md:col-span-1 p-1 flex justify-center items-center order-2 mt-0 md:order-1 w-full aspect-square"
        >
          <img
            loading="lazy"
            className="m-0 aspect-square  max-w-[15rem] md:max-w-md  lg:max-w-xl Imageshadow"
            src={HeroCompressor}
          />
        </motion.div>

        <motion.div
          initial={'hidden'}
          variants={BannerRightSideAnimations}
          animate={inView ? 'visible' : 'hidden'}
          ref={ref}
          className="col-span-2 md:col-span-1 w-full order-1 mt-28 md:mt-0  md:h-full  flex justify-center  items-start md:items-center p-4"
        >
          <div
            style={{
              background: 'linear-gradient(to right, rgb(229, 57, 53,0.0), rgb(0, 0, 0,0.3))',
            }}
            className="w-full md:w-fit text-white-c Imageshadow text-center  backdrop-blur-md rounded-lg flex flex-col justify-start gap-0 items-center pt-3"
          >
            <Typography
              variant="h1"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {' '}
              {t('Home.HeroTitle')}
            </Typography>

            <Typography
              variant="h6"
              className=" italic"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {' '}
              {t('Home.HeroDescription')}
            </Typography>

            <div className="flex items-center justify-center h-full">
              <Button
                onClick={() => (window.location.href = './Contact')}
                color="white"
                variant="outlined"
                className=" italic shadowed-div flex items-center gap-3 m-4 hover:scale-x-105 hover:scale-y-105"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <i className="fa-solid fa-phone"></i>
                {t('Home.ContactusBtn')}
              </Button>

              <Button
                onClick={() => (window.location.href = './products')}
                color="white"
                variant="outlined"
                className=" italic shadowed-div flex items-center gap-3 m-4 hover:scale-x-105 hover:scale-y-105"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <i className="fa-solid fa-cart-shopping"></i>
                {t('Home.CheckProducts')}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
      <Presentation />
      <Services />
      <Partners />
      <Footer />
    </React.Fragment>
  );
};
export default Home;
