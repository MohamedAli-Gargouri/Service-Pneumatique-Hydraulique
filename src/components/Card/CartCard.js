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
   import QuantityInput from "../Input/Quantity"
  export default  function ProductCard({text, ProductImage, ProductName, ProductPrice}) {
    const [isHovered, setIsHovered] = React.useState(false);

        return (
            <Card className=" shadow-md p-2 m-2" >
              <div className="flex flex-col justify-center items-stretch">
      
                  <div className=" bg-gray-300 w-full " onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>        
                   <img src={isHovered?productSample1:productSample2} className=" w-full h-full cover-full Imageshadow" />
                  </div>
      

      
                      <div className="flex flex-row gap-2 justify-center items-center">
                          <div className="Product Catalog ">
                          <Typography   variant="p" className={`font-light`}>
                              Compressor
                          </Typography>
                          </div>
                          <div className="Product Title  ">
                          <Typography   variant="p" className={`font-body`}>
                          MX-74070
                          </Typography>
                          </div>

                          <div className="Price">
                            <Typography   variant="p"  color="green" className={`font-bold`}>
                             1000 TND
                          </Typography> 
                            </div>


      
                          
                      </div>
      
                  
      
                 
                    <div className="flex flex-row w-full  justify-evenly ">
                    <div className="Love my-2">
                          <IconButton size="sm" variant="text" className="rounded-full hover:scale-150">
                          <i class="fa-solid fa-heart"></i>
                          </IconButton>
      
                    </div>
                    <div className="Trash my-2">
                          <IconButton size="sm" variant="text" className="rounded-full hover:scale-150">
                          <i class="fa-solid fa-trash"></i>
                          </IconButton>
      
                    </div>
                    </div>
                        
                          <div className="relative w-full flex flex-wrap justify-center items-center">
                          <QuantityInput/>
                          </div>
      
                          
                     
      
                  
                  </div>
      
               
            </Card>
          );
    

    
    
  }