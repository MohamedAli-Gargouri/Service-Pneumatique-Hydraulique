import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import { useSelector } from "react-redux/es/hooks/useSelector";
  import {LightMode,DarkMode} from "../../redux/actions/LightActions"
  import TranslatedText from '../../utils/Translation';
  export default  function ProductCarouselCard({text, ProductImage, ProductName, ProductPrice}) {
    const LightModeState=useSelector(state=>state.lightMode)
    return (
      <Card className={`h-[38rem] hover:scale-105 ${LightModeState==LightMode().type?"tc-whiteTheme_T1 bg-whiteTheme_T2  ":"tc-darkTheme_T1 bg-darkTheme_T2 "}`}>
        <CardHeader shadow={false} floated={false} className="h-96 bg-gray-300 rounded-md Selected shadow-lg img border mx-1 my-1  p-4 hover:cursor-pointer">
        <img
        className=" aspect-square Imageshadow h-full w-full rounded-lg object-cover object-center shadow-x"
        src={ProductImage}
        />


        </CardHeader>
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography  className="font-medium">
              {ProductName}
            </Typography>
            <Typography  className="font-medium">
              {ProductPrice} TND
            </Typography>
          </div>
          <Typography
            variant="small"
            
            className="font-normal opacity-75"
          >
            {text}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
         
        <Button
          fullWidth={true}
          ripple={false}
           className=" bg-red-600 flex items-center m-2 gap-3 hover:scale-105 active:scale-100">
        <i className="fa-solid fa-eye"></i>


        <TranslatedText TranslationPath="Global.Actions.Discover" />
      </Button>
         <Button
          fullWidth={true}
          ripple={false}
           className=" bg-red-600 flex items-center m-2 gap-3 hover:scale-105 active:scale-100">
      <i className="fa-solid fa-cart-shopping"></i>

      <TranslatedText TranslationPath="Global.Actions.AddCart" />
      </Button>

        

        </CardFooter>
      </Card>
    );
  }