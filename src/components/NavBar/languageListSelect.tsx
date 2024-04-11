import React from 'react';
import enflag from '../../assets/images/en_flag.webp';
import frflag from '../../assets/images/fr_flag.webp';
import tnflag from '../../assets/images/tn_flag.webp';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { Menu, MenuHandler, MenuList, MenuItem, Typography, IconButton } from '@material-tailwind/react';
import { RootState } from 'redux/reducers';
import { SetArabic, SetEnglish, SetFrench } from 'redux/actions/language-actions';
export default function LanguageList() {
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const LocalStorageLanguage = useSelector((state: RootState) => state.language);
  const [SelectedLanguage, setSelectedLanguage] = React.useState(LocalStorageLanguage);
  const dispatch = useDispatch();
  //=======Setting Translation-start=================//
  const { t, i18n } = useTranslation();
  const HandleLanguageChange = (SelectedLanguage) => {
    dispatch(SelectedLanguage == 'fr' ? SetFrench() : SelectedLanguage == 'en' ? SetEnglish() : SetArabic());
    setSelectedLanguage(SelectedLanguage);
    i18n.changeLanguage(SelectedLanguage);
  };
  return (
    <>
      <Menu>
        <MenuHandler>
          <IconButton
            variant="text"
            className="rounded-full p-0"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <img
              loading="lazy"
              src={SelectedLanguage == 'en' ? enflag : SelectedLanguage == 'fr' ? frflag : tnflag}
              alt={'language'}
              className={`p-0`}
            />
          </IconButton>
        </MenuHandler>
        <MenuList
          className=" background-secondary text-primary"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <MenuItem
            className="flex items-center gap-2"
            onClick={() => HandleLanguageChange('en')}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <img loading="lazy" src={enflag} alt={'en'} className={`h-5 w-5 rounded-full object-cover`} />
            <Typography variant="small" className="font-normal">
              English
            </Typography>
          </MenuItem>

          <MenuItem
            className="flex items-center gap-2"
            onClick={() => HandleLanguageChange('fr')}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <img loading="lazy" src={frflag} alt={'fr'} className={`h-5 w-5 rounded-full object-cover`} />
            <Typography variant="small" className="font-normal">
              Frencais
            </Typography>
          </MenuItem>

          <MenuItem
            className="flex items-center gap-2"
            onClick={() => HandleLanguageChange('ar')}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <img loading="lazy" src={tnflag} alt={'ar'} className={`h-5 w-5 rounded-full object-cover`} />
            <Typography variant="small" className="font-normal">
              Arab
            </Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
