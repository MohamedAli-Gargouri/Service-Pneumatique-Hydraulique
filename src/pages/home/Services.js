import { Typography } from '@material-tailwind/react';
import React from 'react';
import TranslatedText from '../../utils/Translation';
import ServiceImage from '../../assets/images/service.webp';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { LightMode } from '../../redux/actions/LightActions';
const Animations = {
  hidden: {
    opacity: 0,
    y: 0,
    x: 0,
    scale: 0.5,
  },
  hiddenLeft: {
    opacity: 0,
    y: 0,
    x: -200,
    scale: 0.5,
  },
  hiddenRight: {
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

const ListAnimations = {
  hidden: { opacity: 0, x: 200 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      delay: 0.4 + index * 0.1,
    },
  }),
};

const Services = () => {
  const LightModeState = useSelector((state) => state.lightMode);
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const { t, i18n } = useTranslation();
  var isLightMode = LightModeState == LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState == LightMode().type;
  }, [LightModeState]);
  return (
    <React.Fragment>
      <div className={`flex items-center justify-center h-full pt-4 pb-4 `}>
        <motion.hr
          initial={'hiddenLeft'}
          variants={Animations}
          animate={inView ? 'visible' : 'hiddenLeft'}
          ref={ref}
          className="border-accent-primary background-accent-primary rounded-lg w-[30%] h-[0.35rem] m-4"
        />
        <Typography variant="h4" className={` text-center font-extrabold `}>
          {t('Home.Services.Service_Title')}
        </Typography>

        <motion.hr
          initial={'hiddenRight'}
          variants={Animations}
          animate={inView ? 'visible' : 'hiddenRight'}
          ref={ref}
          className="border-accent-primary background-accent-primary rounded-lg w-[30%] h-[0.35rem] m-4"
        />
      </div>
      <div>
        <div className="flex flex-wrap  flex-col md:flex-row md:flex-nowrap">
          <motion.div
            initial={'hiddenLeft'}
            variants={Animations}
            animate={inView ? 'visible' : 'hiddenLeft'}
            ref={ref}
            className={`flex justify-center items-center m-4 md:w-1/3 md:h-1/3`}
          >
            <img
              loading="lazy"
              src={ServiceImage}
              alt="image 3"
              className=" aspect-square object-fit: cover w-[80%] h-1/1"
            />
          </motion.div>

          <motion.div className={` text-center flex flex-col items-center justify-center md:items-start flex-wrap`}>
            <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={ListAnimations} custom={2}>
              <Typography variant="h1" className={`m-1 font-extrabold  `}>
                {t('Home.Services.Service1')}
              </Typography>
            </motion.div>

            <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={ListAnimations} custom={3}>
              <Typography variant="h1" className={`m-1 font-extrabold `}>
                {t('Home.Services.Service2')}
              </Typography>
            </motion.div>

            <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={ListAnimations} custom={4}>
              <Typography variant="h1" className={`m-1 font-extrabold `}>
                {t('Home.Services.Service3')}
              </Typography>
            </motion.div>
            <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={ListAnimations} custom={5}>
              <Typography variant="paragraph" className={`m-1 font-black p-4 `}>
                {t('Home.Services.Service_Description')}
              </Typography>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Services;
