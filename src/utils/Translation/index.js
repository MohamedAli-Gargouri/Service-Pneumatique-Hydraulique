
import { useTranslation } from 'react-i18next';
export default function TranslateText({TranslationPath}){
    const { t, i18n } = useTranslation();
    const translatedText = t(TranslationPath);

    return <>{translatedText}</>; 
}
export  function TranslateString(TranslationPath){
    const { t, i18n } = useTranslation();
        return t(TranslationPath)
  
}


