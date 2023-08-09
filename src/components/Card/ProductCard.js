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
   import productSample1 from "../../assets/images/products/Product1.png"
  export default  function ProductCard({text, ProductImage, ProductName, ProductPrice}) {
    return (
      <Card className=" shadow-md pr-2 m-2">
        <div className="grid grid-cols-5">

            <div className="ProductImage bg-gray-300  col-span-1 flex  justify-center items-center">        
             <img src={productSample1} className=" cover-full Imageshadow" />
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
                    <div className="Product Content  ">
                    <Typography   variant="p" className={` font-light`}>
                    Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing. Sed lectus.
                    </Typography>
                    </div>

                    
                </div>

            </div>

            <div className=" Product Actions col-span-1 flex-col flex items-end justify-center w-full">
                <div className="Price">
                <Typography   variant="small"  color="green" className={`font-bold`}>
                1000 TND
                    </Typography> 
                </div>

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