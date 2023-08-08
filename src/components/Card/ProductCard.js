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
      <Card className=" rounded-l-md pr-4">
        <div className="grid grid-cols-5">

            <div className="ProductImage bg-red-200  col-span-1 flex  justify-center items-center">
             
             <img src={productSample1} className="w-[90%] h-[90%] Imageshadow" />
            </div>

            <div className="ProductDescription col-span-3 ml-4">

                <div className="flex-wrap flex justify-center items-center">
                    <div className="Product Catalog w-full">
                    <Typography   variant="h6" className={`font-light`}>
                        Compressor
                    </Typography>
                    </div>
                    <div className="Product Title w-full ">
                    <Typography   variant="h5" className={`font-body`}>
                    MX-74070
                    </Typography>
                    </div>
                    <div className="Product Content w-full ">
                    <Typography   variant="p" className={` font-light`}>
                    Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing. Sed lectus.
                    </Typography>
                    </div>

                    
                </div>

            </div>

            <div className="Product Actions col-span-1 flex-col flex items-end justify-center">
                <div className="Price">
                <Typography   variant="small"  color="green" className={`font-bold`}>
                1000 TND
                    </Typography> 
                </div>

                <div className="Review">
                <Rating />
                </div>
                <div className="Actions flex  justify-center items-center">
                    <div className="Preview mx-1">
                    <IconButton variant="text" className="rounded-full hover:scale-150">
                    <i class="fa-regular fa-eye fa-lg"></i>
                    </IconButton>

                    </div>

                    <div className="AddCart mx-1">
                    <Button size="sm" className="flex items-center gap-3 hover:scale-105">
                    <i class="fa-solid fa-cart-shopping fa-sm"></i>
                    Add to Cart
                    </Button>
                    </div>


                </div>

            </div>
            </div>

         
      </Card>
    );
  }