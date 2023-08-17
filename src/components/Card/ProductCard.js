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
  export default  function ProductCard({text, ProductImage, ProductName, ProductPrice, variant}) {
    const [isHovered, setIsHovered] = React.useState(false);

    if(variant==1)
    {
        return (
            <Card className="ContainerLightDarkMode rounded-none shadow-lg p-1 pr-4 m-1  ">
              <div className="grid grid-cols-5">
      
                  <div className="ProductImage bg-gray-300  col-span-1 flex  justify-center items-center " onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>        
                   <img src={isHovered?productSample1:productSample2} className=" cover-full Imageshadow" />
                  </div>
      
                  <div className="ProductDescription col-span-3 ml-4">
      
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
      
                  <div className=" Product Actions col-span-1 flex-col flex items-end justify-center w-full">
                      
      
                      <div className="Review">
                      <Rating />
                      </div>
                      <div className="Actions flex flex-wrap justify-center items-center">
                          <div className="Preview mr-2">
                          <IconButton size="sm" variant="text" className="rounded-full hover:scale-150">
                          <i class="fa-regular fa-eye fa-lg"></i>
                          </IconButton>
      
                          </div>
      
                          <div className="AddCart ml-2">
                          <Button size="sm" variant="outlined" className="focus:ring-0 flex items-center gap-3 p-4 hover:scale-105">
                          <i class="fa-solid fa-cart-shopping fa-sm"></i>
                          <span class="hidden md:inline">Add cart </span>
                          </Button>
                          </div>
      
      
                      </div>
      
                  </div>
                  </div>
      
               
            </Card>
          );
    }
    if(variant==2 ||variant==3)
    {
        return (
            <Card className=" rounded-none shadow-lg p-1  m-1 flex flex-col flex-wrap items-stretch justify-center  ">
              
              <div className="image-container  bg-gray-300 col-span-1 flex flex-col  justify-center items-center" 
              onMouseEnter={() =>{
             setIsHovered(true); 
            }}
              onMouseLeave={() => setIsHovered(false)}>
              <img id="ProductImg" src={isHovered?productSample1:productSample2} className=" h-[45vh] w-[100%] Imageshadow animate-fade" />

                <div class="hover-content p-4 w-full">
                    
                <div className="Actions flex flex-wrap justify-center items-center">
                          <div className="Preview mr-2">
                          <IconButton size="sm" variant="text" className="rounded-full hover:scale-150">
                          <i class="fa-regular fa-eye fa-lg"></i>
                          </IconButton>
      
                          </div>
      
                          <div className="AddCart ml-2">
                          <Button size="sm" variant="outlined" className="focus:ring-0 flex items-center gap-3 p-4 hover:scale-105">
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

                          <Typography   variant="h5" className={`font-body text-center`}>
                          MX-74070
                          </Typography>
                          <div className="Price text-center">
                            <Typography   variant="small"  color="green" className={`font-bold`}>
                            1000 TND
                                </Typography> 
                            </div>
                          
                          <Typography   variant="p" className={` font-light text-center`}>
                          Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing. Sed lectus.
                          </Typography>


                          
              </div>

             

            <div className="Review text-center">
            <Rating />
            </div>

            

              

      
               
            </Card>
          );
    }
    
    
  }