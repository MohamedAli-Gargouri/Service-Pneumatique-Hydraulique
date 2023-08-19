import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Rating,
    IconButton
  } from "@material-tailwind/react";
  import "./ProductCard.css"
   import productSample1 from "../../assets/images/products/Product1.png"
   import productSample2 from "../../assets/images/products/product_2.png"
   import React from "react";
   import { useSelector } from "react-redux/es/hooks/useSelector";
   import {LightMode,DarkMode} from "../../redux/actions/LightActions"
  export default  function ProductCard({text, ProductImage, ProductName, ProductPrice, variant}) {
    const [isHovered, setIsHovered] = React.useState(false);
    const LightModeState=useSelector(state=>state.lightMode)
    if(variant==1)
    {
        return (
            <Card className={`${LightModeState==LightMode().type?"tc-whiteTheme_T1 bg-whiteTheme_T2  ":"tc-darkTheme_T1 bg-darkTheme_T2 "} rounded-none shadow-lg p-1 pr-4 m-1  `}>
              <div className="grid grid-cols-5 gap-0">
      
                  <div className="ProductImage bg-gray-300  col-span-2 sm:col-span-1 flex   justify-center items-center " onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>        
                   <img src={isHovered?productSample1:productSample2} className=" bg-cover Imageshadow" />
                  </div>
      
                  <div className="ProductDescription col-span-2 sm:col-span-3 ml-1">
      
                      <div className="flex flex-col justify-center items-start">
                          <div className="Product Catalog ">
                          <Typography   variant="h6" className={`font-light`}>
                              Compressor
                          </Typography>
                          </div>
                          <div className="Product Title  ">
                          <Typography   variant="h5" className={`font-body`}>
                          MX-74070
                          </Typography>
                          </div>

                          <div className="Price">
                            <Typography   variant="small"  color="green" className={`font-bold`}>
                             1000 TND
                          </Typography> 
                            </div>

                          <div className="Product Content  ">
                          <Typography   variant="p" className={` font-light`}>
                          Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing. Sed lectus.
                          </Typography>
                          </div>
      
                          
                      </div>
      
                  </div>
      
                  <div className=" Product Actions col-span-1 flex-col flex gap-2 items-center justify-center w-full">
                      
      
                      
                      <Rating className={"flex-wrap justify-center items-center"} unratedColor="red" />
                    
                      
                          
                          <IconButton  onClick={()=>{window.location.href = '/ProductDetails'}} size="sm" variant="text" className=" rounded-full hover:scale-150">
                          <i class="fa-regular fa-eye fa-lg"></i>
                          </IconButton>
      
                          
      
                          
                          <Button size="sm" variant="filled" className="focus:ring-0 flex items-center gap-3 p-4 hover:scale-105">
                          <i class="fa-solid fa-cart-shopping fa-sm"></i>
                          <span class="hidden md:inline">Add cart </span>
                          </Button>
                          
      
      
                      
      
                  </div>
                  </div>
      
               
            </Card>
          );
    }
    if(variant==2 ||variant==3 || variant==0)
    {
        return (
            <Card className={`${LightModeState==LightMode().type?"tc-whiteTheme_T1 bg-whiteTheme_T2  ":"tc-darkTheme_T1 bg-darkTheme_T2 "}  rounded-none shadow-lg p-1  m-1 flex flex-col flex-wrap items-stretch justify-center `}>
              
              <div className="image-container  bg-gray-300 col-span-1 flex flex-col  justify-center items-center" 
              onMouseEnter={() =>{
             setIsHovered(true); 
            }}
              onMouseLeave={() => setIsHovered(false)}>
              <img id="ProductImg" src={isHovered?productSample1:productSample2} className=" bg-cover h-[45vh] w-[100%] Imageshadow animate-fade" />

                <div class="hover-content p-4 w-full">
                    
                <div className="Actions flex flex-wrap justify-center items-center">
                          <div className="Preview mr-2">
                          <IconButton onClick={()=>{window.location.href = '/ProductDetails'}} size="sm" variant="text" className="rounded-full hover:scale-150">
                          <i class="fa-regular fa-eye fa-lg"></i>
                          </IconButton>
      
                          </div>
      
                          <div className="AddCart ml-2">
                          <Button size="sm" variant="filled" className="focus:ring-0 flex items-center gap-3 p-4 hover:scale-105">
                          <i class="fa-solid fa-cart-shopping fa-sm"></i>
                          <span class="hidden md:inline">Add cart </span>
                          </Button>
                          </div>
      
      
                      </div>
                
                </div>
              </div>


              <div className="Description">
                
                          
                          <Typography   variant="h6" className={`font-light text-center`}>
                              Compressor
                          </Typography>

                          <Typography   variant="h6" className={`font-body text-center`}>
                          MX-74070
                          </Typography>
                          
                          <div className="Price text-center">
                            <Typography variant="h6"  color={"green"}   className={` font-body`}>
                            1000 TND
                                </Typography> 
                            </div>
                          <Typography   variant="p" className={` font-light text-center`}>
                          Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing. Sed lectus.
                          </Typography>


                          
              </div>

             

            <div className="Review text-center">
            <Rating className={"flex-wrap justify-center items-center"} unratedColor="red" />
            </div>

            

              

      
               
            </Card>
          );
    }
    
    
  }