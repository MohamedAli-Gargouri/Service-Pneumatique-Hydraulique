import { Typography } from '@material-tailwind/react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import logo from '../../assets/images/SPH Logo.webp';
import { LightMode } from '../../redux/actions/light-actions';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { RootState } from 'redux/reducers';
export default function FooterWithSocialLinks() {
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const { t, i18n } = useTranslation();
  var isLightMode = LightModeState == LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState == LightMode().type;
  }, [LightModeState]);
  const currentYear = new Date().getFullYear();
  const List = [
    {
      title: t('Global.Footer.Title1'),
      items: [
        {
          label: t('Global.Footer.Adress'),
          value: t('Global.Footer.Adress_Value1'),
        },
        {
          label: t('Global.Footer.Phone'),
          value: '(+216) 74 21 18 76',
        },
        {
          label: t('Global.Footer.Fax'),
          value: '(+216) 74 22 66 09',
        },
        {
          label: t('Global.Footer.Email'),
          value: 'sph@sph-tn.com',
        },
      ],
    },
    {
      title: t('Global.Footer.Title2'),
      items: [
        {
          label: t('Global.Footer.Adress'),
          value: t('Global.Footer.Adress_Value2'),
        },
        {
          label: t('Global.Footer.Phone'),
          value: '(+216) 74 22 70 74',
        },
        {
          label: t('Global.Footer.Fax'),
          value: '(+216) 74 22 70 78',
        },
        {
          label: t('Global.Footer.Email'),
          value: 'info@sph-tn.com',
        },
      ],
    },
  ];
  return (
    <footer className={`footer relative w-full p-4 `}>
      <hr className="border-accent-primary background-accent-primary rounded-lg  h-[0.35rem]" />

      <div className=" mx-auto w-full px-0 text-center">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-6">
          <div className={` col-span-6 md:col-span-1 md:mt-4 md:mb-6 flex flex-wrap justify-center items-center`}>
            <img loading="lazy" src={logo} alt="logo-ct" className=" max-w-[5rem] aspect-video m-4" />{' '}
            <h5>Service Pneumatique Hydraulique</h5>
          </div>

          <div className=" col-span-6 md:col-span-5 grid md:grid-cols-2 items-center justify-center gap-1">
            {List.map(({ title, items }, index) => (
              <ul key={'FOOTER' + index}>
                <Typography
                  variant="small"
                  className={` underline underline-offset-2 mt-4 mb-3 font-medium opacity-40`}
                >
                  {title}
                </Typography>
                {items.map((link, index) => (
                  <li key={'LINK' + index}>
                    <div className=" flex flex-col md:flex-row justify-center items-center gap-1">
                      <Typography
                        as="h6"
                        className={` font-thin opacity-60 mr-1 py-1.5  transition-colors hover:opacity-75 `}
                      >
                        {link.label}:
                      </Typography>

                      <Typography
                        as="small"
                        href="#"
                        className={` leading-4 font-normal transition-colors hover:opacity-75 `}
                      >
                        {link.value}
                      </Typography>
                    </div>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className={`w-full  flex  flex-col  flex-wrap justify-center items-center mt-5`}>
          <Typography variant="small" className={`mb-4 text-center font-normal  md:mb-0 `}>
            &copy; {currentYear}{' '}
            <a href="https://www.facebook.com/ServicePneumatiqueHydraulique">{t('Global.Footer.Rights')}</a>
          </Typography>
          <Typography as="small" className={' underline underline-offset-4'}>
            {t('Global.Footer.Dev')}
          </Typography>
        </div>
      </div>
    </footer>
  );
}
