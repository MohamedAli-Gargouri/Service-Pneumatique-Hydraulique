import { Typography, Card } from '@material-tailwind/react';
import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/light-actions';
import ReactCardFlip from 'react-card-flip';
import HertzLogo from '../../assets/images/partners/Hertz.webp';
import WIKALogo from '../../assets/images/partners/Wika.webp';
import OMILogo from '../../assets/images/partners/OMI.webp';
import AirWorkLogo from '../../assets/images/partners/airwork.webp';
import Waircom from '../../assets/images/partners/waircom.webp';
import CDCPneumatiqueLogo from '../../assets/images/partners/pneumatics corps.webp';
import UskonLogo from '../../assets/images/partners/UKSON.webp';
import ESKALogo from '../../assets/images/partners/ESKA.webp';
import CastelloLogo from '../../assets/images/partners/Castello.webp';
import MMLogo from '../../assets/images/partners/mm.webp';
import JorcLogo from '../../assets/images/partners/jorc.webp';
import websiteBackgroundimg from '../../assets/images/partners/WebsiteBackground.webp';
import useElementInViewport from '../../utils/hooks/useElementInViewport';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { RootState } from 'types/components/general';
//Animations Config
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
const Partners = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const Partners = [
    {
      PartnerID: 1,
      PartnerName: 'Hertz',
      Website: 'www.hertz-kompressoren.com',
      logo: HertzLogo,
    },
    {
      PartnerID: 2,
      PartnerName: 'WIKA',
      Website: 'www.wika.fr',
      logo: WIKALogo,
    },
    {
      PartnerID: 3,
      PartnerName: 'OMI',
      Website: '  www.omi-italy.it',
      logo: OMILogo,
    },
    {
      PartnerID: 4,
      PartnerName: 'Air Work',
      Website: 'www.airwork.it',
      logo: AirWorkLogo,
    },
    {
      PartnerID: 5,
      PartnerName: 'Waircom',
      Website: 'www.waircom-mbs.com',
      logo: Waircom,
    },
    {
      PartnerID: 6,
      PartnerName: 'CDC Pneumatics Corp',
      Website: 'www.cdcpneumatics.com',
      logo: CDCPneumatiqueLogo,
    },
    {
      PartnerID: 7,
      PartnerName: 'Uskon',
      Website: 'www.us-kon.com.tr',
      logo: UskonLogo,
    },
    {
      PartnerID: 8,
      PartnerName: 'Eska',
      Website: 'www.eskavalve.com',
      logo: ESKALogo,
    },
    {
      PartnerID: 9,
      PartnerName: 'Castello',
      Website: 'www.castelloitalia.it',
      logo: CastelloLogo,
    },
    {
      PartnerID: 10,
      PartnerName: 'mminternational',
      Website: 'www.mminternational.net',
      logo: MMLogo,
    },
    {
      PartnerID: 11,
      PartnerName: 'Jorc',
      Website: 'www.jorc.eu',
      logo: JorcLogo,
    },
  ];
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const [PartnersCards, SetPartnersCards] = React.useState(Array(Partners.length).fill(true));
  const PartnersGridRef: any = React.useRef<HTMLDivElement>();
  const HandleShowcase = () => {
    SetPartnersCards(Array(Partners.length).fill(false));
  };
  const IsElementInView = useElementInViewport(PartnersGridRef, 0, HandleShowcase, true);
  const { t } = useTranslation();
  var isLightMode = LightModeState === LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState === LightMode().type;
  }, [LightModeState]);
  const HandleCardFlip = (index: any) => {
    const Prevstate = [...PartnersCards];
    Prevstate[index] = !Prevstate[index];
    SetPartnersCards(Prevstate);
  };

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
        <Typography
          variant="h4"
          className={` text-center font-extrabold `}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {t('Home.Partners.Partner_Title')}
        </Typography>
        <motion.hr
          initial={'hiddenRight'}
          variants={Animations}
          animate={inView ? 'visible' : 'hiddenRight'}
          ref={ref}
          className="border-accent-primary background-accent-primary rounded-lg w-[30%] h-[0.35rem] m-4"
        />
      </div>

      <Typography
        variant="small"
        className={` mt-4 text-center font-extrabold `}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {t('Home.Partners.Partner_Description')}
      </Typography>

      <div
        ref={PartnersGridRef}
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 flex-wrap justify-center items-center p-2 md:p-10"
      >
        {Partners.map((Partner, index) => {
          return (
            <Card
              key={Partner.PartnerID}
              onClick={() => HandleCardFlip(index)}
              className="bg-white-c shadow-lg backdrop-blur-md col-span-1 h-40 w-full hover:cursor-pointer md:hover:scale-95"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <ReactCardFlip
                isFlipped={PartnersCards[index]}
                flipDirection="horizontal"
                flipSpeedBackToFront={2}
                flipSpeedFrontToBack={2}
                containerStyle={{ height: '100%', width: '100%' }}
              >
                <div className=" rounded-lg h-full  w-full flex justify-center items-center ">
                  <img loading="lazy" className=" w-fit h-fit" src={Partner.logo} />
                </div>

                <div
                  style={{ backgroundImage: `url(${websiteBackgroundimg})` }}
                  className="p-4 bg-cover bg-center rounded-lg h-full w-full flex justify-center items-center "
                >
                  <Typography
                    variant="h6"
                    className=" italic whitespace-pre-wrap"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {Partner.Website}
                  </Typography>
                </div>
              </ReactCardFlip>
            </Card>
          );
        })}
      </div>
    </React.Fragment>
  );
};
export default Partners;
