import { Typography } from '@material-tailwind/react';
import React from 'react';
import TranslatedText from '../../utils/Translation';
import ServiceImage from '../../assets/images/service.webp';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/LightActions';

import useElementInViewport from '../../utils/hooks';
const Services = () => {
  const LightModeState = useSelector((state) => state.lightMode);

  const [AnimateServicesList,SetAnimateServicesList]=React.useState(false)
  const [AnimateServicesImg,SetAnimateServicesImg]=React.useState(false)

  const ServicesListRef=React.useRef()
  const CompressorImgRef=React.useRef()
  const HandleAnimatingServiceImg=()=>
  {
    SetAnimateServicesImg(true)
  }
  const HandleAnimatingServiceList=()=>
  {
    SetAnimateServicesList(true)
  }
  const IsElementInImgView=useElementInViewport(CompressorImgRef,0,HandleAnimatingServiceImg,true)
  const IsElementInListView=useElementInViewport(ServicesListRef,0,HandleAnimatingServiceList,true)
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
          <div ref={CompressorImgRef} className={`${ AnimateServicesImg&&"animate-QuickLeftToRight"} flex justify-center items-center m-4 md:w-1/3 md:h-1/3`}>
            <img
              src={ServiceImage}
              alt="image 3"
              className=" aspect-square animate-rotate object-fit: cover w-[80%] h-1/1"
            />
          </div>
          <div ref={ServicesListRef} className={` ${AnimateServicesList&&"animate-QuickRightToLeft"} text-center flex flex-col items-center justify-center md:items-start flex-wrap`}>
            <Typography
              variant="h1"
              
              className={`m-1 font-extrabold  `}
            >
              <TranslatedText TranslationPath="Home.Services.Service1" />
            </Typography>
            <Typography
              variant="h1"
              
              className={`m-1 font-extrabold `}
            >
              <TranslatedText TranslationPath="Home.Services.Service2" />
            </Typography>

            <Typography
              variant="h1"
              
              className={`m-1 font-extrabold `}
            >
              <TranslatedText TranslationPath="Home.Services.Service3" />
            </Typography>
            <Typography
              variant="paragraph"
              
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
