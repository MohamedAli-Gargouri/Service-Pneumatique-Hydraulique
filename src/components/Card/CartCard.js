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
            <Card className=" shadow-md pr-2 m-2">
              <div className="grid grid-cols-1">
      
                  <div className="ProductImage bg-gray-300  col-span-1 flex  justify-center items-center " onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>        
                   <img src={isHovered?productSample1:productSample2} className=" cover-full Imageshadow" />
                  </div>
      
                  <div className="ProductDescription col-span-1 ml-4">
      
                      <div className="flex flex-col justify-center items-center">
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
                            <Typography   variant="medium"  color="green" className={`font-bold`}>
                             1000 TND
                          </Typography> 
                            </div>


      
                          
                      </div>
      
                  </div>
      
                  <div className="col-span-1 flex-col flex-wrap flex items-center  justify-center">
                    <div className="flex flex-row w-full justify-between ">
                    <div className="Love mx-4">
                          <IconButton size="sm" variant="filled" className="rounded-full hover:scale-150">
                          <i class="fa-solid fa-heart"></i>
                          </IconButton>
      
                    </div>
                    <div className="Trash mx-4">
                          <IconButton size="sm" variant="filled" className="rounded-full hover:scale-150">
                          <i class="fa-solid fa-trash"></i>
                          </IconButton>
      
                    </div>
                    </div>
                        
                          <div className="">
                          <QuantityInput/>
                          </div>
      
                          
                     
      
                  </div>
                  </div>
      
               
            </Card>
          );
    

    
    
  }