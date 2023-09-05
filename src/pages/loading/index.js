
 import { Spinner } from "@material-tailwind/react";
 import { Waveform } from '@uiball/loaders'

export default function LoginCard() {

    return (

      <div className={`h-screen w-screen flex flex-col justify-center items-center gap-11 tc-whiteTheme_T1 bg-whiteTheme_T2 `}>

          <Waveform 
          size={40}
          lineWeight={3.5}
          speed={1} 
          color="red" 
          />
        
      </div>

    );
  }



