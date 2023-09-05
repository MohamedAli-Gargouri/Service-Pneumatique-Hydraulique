
import {
Typography,
Card
  } from "@material-tailwind/react";
  import React from "react";
  import TranslatedText from "../../utils/Translation"
  import ServiceImage from "../../assets/images/service.png"
import { useSelector } from "react-redux/es/hooks/useSelector";
import {LightMode,DarkMode} from "../../redux/actions/LightActions"
import ReactCardFlip from 'react-card-flip';
import HertzLogo from "../../assets/images/partners/Hertz.png"
import WIKALogo from "../../assets/images/partners/Wika.png"
import OMILogo from "../../assets/images/partners/OMI.jpg"
import AirWorkLogo from "../../assets/images/partners/airwork.jpg"
import Waircom from "../../assets/images/partners/waircom.jpg"
import CDCPneumatiqueLogo from "../../assets/images/partners/pneumatics corps.jpg"
import UskonLogo from "../../assets/images/partners/UKSON.jpg"
import ESKALogo from "../../assets/images/partners/ESKA.jpg"
import CastelloLogo from "../../assets/images/partners/Castello.jpg"
import MMLogo from "../../assets/images/partners/mm.jpg"
import JorcLogo from "../../assets/images/partners/jorc.jpg"
import websiteBackgroundimg from "../../assets/images/partners/WebsiteBackground.jpg"
const Partners =()=>{
  const Partners=[
    {PartnerID:1,PartnerName:"Hertz",Website:"www.hertz-kompressoren.com",logo:HertzLogo},
    {PartnerID:2,PartnerName:"WIKA",Website:"www.wika.fr",logo:WIKALogo},
    {PartnerID:3,PartnerName:"OMI",Website:"  www.omi-italy.it",logo:OMILogo},
    {PartnerID:4,PartnerName:"Air Work",Website:"www.airwork.it",logo:AirWorkLogo},
    {PartnerID:5,PartnerName:"Waircom",Website:"www.waircom-mbs.com",logo:Waircom},
    {PartnerID:6,PartnerName:"CDC Pneumatics Corp",Website:"www.cdcpneumatics.com",logo:CDCPneumatiqueLogo},
    {PartnerID:7,PartnerName:"Uskon",Website:"www.us-kon.com.tr",logo:UskonLogo},
    {PartnerID:8,PartnerName:"Eska",Website:"www.eskavalve.com",logo:ESKALogo},
    {PartnerID:9,PartnerName:"Castello",Website:"www.castelloitalia.it",logo:CastelloLogo},
    {PartnerID:10,PartnerName:"mminternational",Website:"www.mminternational.net",logo:MMLogo},
    {PartnerID:11,PartnerName:"Jorc",Website:"www.jorc.eu",logo:JorcLogo}
  ]
  const LightModeState=useSelector(state=>state.lightMode)
  const [PartnersCards,SetPartnersCards]=React.useState(Array(Partners.length).fill(true))
  const [hasExecuted, setHasExecuted] = React.useState(false); 
  const HandleCardFlip=((index)=>{
    const Prevstate=[...PartnersCards];
    Prevstate[index]=!Prevstate[index]
    SetPartnersCards(Prevstate)
  })
  const handleScroll = () => {
    // Check if the action has already been executed
    if (!hasExecuted) {
      // Calculate the position of the item you're interested in
      const itemElement = document.getElementById('PartnersGrid'); // Replace with your item's ID
      
      if (itemElement) {
        const rect = itemElement.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Check if the item is within a certain range of the viewport
        if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5) {
          SetPartnersCards(Array(Partners.length).fill(false));
          setHasExecuted(true); // Mark the action as executed
        }
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
    return (<React.Fragment>

      
 <div className={`flex items-center justify-center h-full pt-4 pb-4 ${LightModeState==LightMode().type?"bg-whiteTheme_T2":"bg-darkTheme_T2"} `}>
        <hr className=" border-red-600 rounded-lg w-[30%] h-[0.35rem] bg-red-600 m-4"/>
        <Typography  variant="h4"  className={` text-center font-extrabold `}>
          Our Partners
          </Typography>
          <hr className=" border-red-600 rounded-lg w-[30%] h-[0.35rem] bg-red-600 m-4"/>
        </div>

        <div id="PartnersGrid" className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 flex-wrap justify-center items-center p-2 md:p-10">

          {Partners.map((Partner,index)=>{

            return(
              <Card key={Partner.PartnerID}  onClick={()=>HandleCardFlip(index)} className=" shadow-lg backdrop-blur-md col-span-1 h-40 w-full hover:cursor-pointer md:hover:scale-95">
              <ReactCardFlip 
              isFlipped={PartnersCards[index]}
               flipDirection="horizontal"
               flipSpeedBackToFront={2} 
               flipSpeedFrontToBack={2}
               containerStyle={{ height:"100%", width:"100%"}}
               >
              <div className=" rounded-lg h-full  w-full flex justify-center items-center ">
                <img className=" w-fit h-fit" src={ Partner.logo}/>
                
              </div>
      
              <div style={{backgroundImage:`url(${websiteBackgroundimg})`}} className="p-4 bg-cover bg-center rounded-lg h-full w-full flex justify-center items-center ">
              <Typography variant="h6"  className=" italic whitespace-pre-wrap" >
                {Partner.Website}
              </Typography>
                </div>
              
            </ReactCardFlip>
            </Card>
            )

          })}

        </div>

  
    </React.Fragment>)
}
export default Partners;