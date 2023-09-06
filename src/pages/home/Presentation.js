import Navbar from '../../components/NavBar';
import Footer from '../../components/footer';
import { Typography } from '@material-tailwind/react';
import React from 'react';
import { Button } from '@material-tailwind/react';
import TranslatedText from '../../utils/Translation';
import SPHLogo from '../../assets/images/SPH Logo.png';
import ProductCarousel from '../../components/Carousel/productsCarousel';

import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode, DarkMode } from '../../redux/actions/LightActions';

const Presentation = () => {
  const LightModeState = useSelector((state) => state.lightMode);
  return (
    <React.Fragment>
      <div
        className={`Presentation flex flex-wrap  items-center justify-center `}
      >
        <div className=" flex flex-col flex-wrap  justify-center items-center">
          <div className="col-span-12">
            <div className="flex items-center justify-center h-full mt-4">
              <hr className="border-red-600 rounded-lg w-[30%] h-[0.35rem] bg-red-600 m-4" />
              <img
                src={SPHLogo}
                alt="image 3"
                className="block  object-fit: cover w-1/5 h-1/1 relative "
              />
              <hr className="border-red-600 rounded-lg w-[30%] h-[0.35rem] bg-red-600 m-4" />
            </div>
          </div>

          <div className="col-span-12">
            <div className="flex items-center justify-center h-full">
              <div className="block container mx-auto relative">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12">
                    <div className="flex items-center justify-center">
                      <Typography
                        variant="h1"
                        
                        className={` text-center m-4 `}
                      >
                        <TranslatedText TranslationPath="Home.Services.Service_SubTitle" />
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12">
            <div className="flex items-center justify-center h-full">
              <Typography variant="paragraph"  className={`m-4 `}>
                <TranslatedText TranslationPath="Home.Presentation" />{' '}
              </Typography>
            </div>
          </div>
        </div>

        <div className=" w-full col-span-12">
          <ProductCarousel />
        </div>
      </div>
    </React.Fragment>
  );
};
export default Presentation;
