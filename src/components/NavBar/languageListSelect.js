import React from "react";
import { Select, Option } from "@material-tailwind/react";
import enflag from "../../assets/images/en_flag.png"
import frflag from "../../assets/images/fr_flag.png"
import tnflag from "../../assets/images/tn_flag.png"
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux/es/hooks/useSelector";
import {LightMode,DarkMode} from "../../redux/actions/LightActions"
export default function LanguageList() {
  const LightModeState=useSelector(state=>state.lightMode)
      //=======Setting Translation-start=================// 
  const { t, i18n } = useTranslation();
  const HandleLanguageChange=(SelectedLanguage)=>{
  i18n.changeLanguage(SelectedLanguage)
  }
  return (
    <div>
      <Select
              className={`rounded-none `}
              labelProps={{
                
                className: `before:content-none after:content-none`,
              }}
      value={i18n.language}
      onChange={(e)=>{HandleLanguageChange(e)}}
        size="md"
        variant="outlined"
        selected={(element) =>
          element &&
          React.cloneElement(element, {
            className: `flex items-center px-12 gap-2 pointer-events-none  ${LightModeState==LightMode().type?"":"TextDarkMode"}`,
          })
        }
      >
          <Option key={"en"} value={"en"} className={`flex items-center gap-2`}>
            <img
              src={enflag}
              alt={"en"}
              className={`h-5 w-5 rounded-full object-cover`}
            />
            {"English"}
          </Option>

          <Option key={"fr"} value={"fr"} className={`flex items-center gap-2`}>
            <img
              src={frflag}
              alt={"fr"}
              className="h-5 w-5 rounded-full object-cover"
            />
            {"Francais"}
          </Option>

          <Option key={"ar"} value={"ar"} className={`flex items-center gap-2`}>
            <img
              src={tnflag}
              alt={"ar"}
              className="h-5 w-5 rounded-full object-cover"
            />
            {"Arabic"}
          </Option>


      </Select>
    </div>
  );
}