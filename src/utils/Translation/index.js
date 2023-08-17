import { useSelector } from "react-redux/es/hooks/useSelector";
import {LightMode,DarkMode} from "../../redux/actions/LightActions"
import { useTranslation } from 'react-i18next';
export default function TranslateText({TranslationPath}){
    const LightModeState=useSelector(state=>state.lightMode)
    const { t, i18n } = useTranslation();

        return t(TranslationPath)
    
    
    
}

export  function TranslateString(TranslationPath){
    const { t, i18n } = useTranslation();
        return t(TranslationPath)
  
}


