import { Typography } from '@material-tailwind/react';
import React from 'react';
import TranslatedText from '../../utils/Translation';
import ServiceImage from '../../assets/images/service.png';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode, DarkMode } from '../../redux/actions/LightActions';

const Services = () => {
  const LightModeState = useSelector((state) => state.lightMode);
  return (
    <React.Fragment>
      <div
        className={`flex items-center justify-center h-full pt-4 pb-4 ${
          LightModeState == LightMode().type
            ? 'bg-whiteTheme_T2'
            : 'bg-darkTheme_T2'
        } `}
      >
        <hr className=" border-red-600 rounded-lg w-[30%] h-[0.35rem] bg-red-600 m-4" />
        <Typography variant="h4" className={` text-center font-extrabold `}>
          <TranslatedText TranslationPath="Home.Services.Service_Title" />
        </Typography>
        <hr className=" border-red-600 rounded-lg w-[30%] h-[0.35rem] bg-red-600 m-4" />
      </div>
      <div>
        <div className="flex flex-wrap  flex-col md:flex-row md:flex-nowrap">
          <div className=" flex justify-center items-center m-4 md:w-1/3 md:h-1/3 animate-LeftToRight">
            <img
              src={ServiceImage}
              alt="image 3"
              className=" aspect-square animate-rotate object-fit: cover w-[80%] h-1/1"
            />
          </div>
          <div className=" text-center flex flex-col items-center justify-center md:items-start flex-wrap animate-RightToLeft ">
            <Typography
              variant="h1"
              color="inherit"
              className={`m-1 font-extrabold  `}
            >
              <TranslatedText TranslationPath="Home.Services.Service1" />
            </Typography>
            <Typography
              variant="h1"
              color="inherit"
              className={`m-1 font-extrabold `}
            >
              <TranslatedText TranslationPath="Home.Services.Service2" />
            </Typography>

            <Typography
              variant="h1"
              color="inherit"
              className={`m-1 font-extrabold `}
            >
              <TranslatedText TranslationPath="Home.Services.Service3" />
            </Typography>
            <Typography
              variant="p"
              color="inherit"
              className={`m-1 font-black p-4 `}
            >
              <TranslatedText TranslationPath="Home.Services.Service_Description" />
            </Typography>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Services;
