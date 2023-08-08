import { useSelector } from "react-redux/es/hooks/useSelector";
import {LightMode,DarkMode} from "../../redux/actions/LightActions"
import { useTranslation } from 'react-i18next';
export default function TranslateText({TranslationPath,TextColor}){
    const LightModeState=useSelector(state=>state.lightMode)
    const { t, i18n } = useTranslation();
    if(TextColor==undefined)
    {
        return(<p className={`${LightModeState==LightMode().type?"TextWhiteMode":"TextDarkMode"}`}>{t(TranslationPath)}</p>)
    }
    else
    {
        return(<p className={`Color:${TextColor}`}>{t(TranslationPath)}</p>)
    }
    
}

export  function TranslateString(TranslationPath){
    const { t, i18n } = useTranslation();
        return t(TranslationPath)
  
}
