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
  export default  function ProductList({text, ProductImage, ProductName, ProductPrice}) {
    const LightModeState=useSelector(state=>state.lightMode)
    return (
      <Card className={`h-[38rem] hover:scale-105 ${LightModeState==LightMode().type?"ContainerExtraWhiteMode":"ContainerExtraWhiteMode"}`}>
        <CardHeader shadow={false} floated={false} className="h-96 bg-gray-300 rounded-md Selected shadow-lg img border mx-1 my-1  p-4 hover:cursor-pointer">
        <img
        className=" Imageshadow h-full w-full rounded-lg object-cover object-center shadow-x"
        src={ProductImage}
        />


        </CardHeader>
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              {ProductName}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              {ProductPrice} TND
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
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
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
</svg>


        Discover
      </Button>
         <Button
          fullWidth={true}
          ripple={false}
           className=" bg-red-600 flex items-center m-2 gap-3 hover:scale-105 active:scale-100">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
</svg>

        Add to Cart
      </Button>

        

        </CardFooter>
      </Card>
    );
  }