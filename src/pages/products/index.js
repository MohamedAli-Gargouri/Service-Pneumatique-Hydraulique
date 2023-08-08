import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
    ListItemSuffix,
    ListItem,
    List,
    Select,
    Option,
    IconButton
  } from "@material-tailwind/react";
  import React from "react";
 import Navbar from "../../components/NavBar"
 import Pagination from "../../components/Pagination";
 import TranslatedText from "../../utils/Translation";
 import {TranslateString} from "../../utils/Translation";
 import { useSelector } from "react-redux/es/hooks/useSelector";
import Footer from "../../components/footer"
import FilterMenuMobile from "../../components/FilterMenu/FilterMenuMobile";
import Productcard from "../../components/Card/ProductCard"
import FilterMenu from "../../components/FilterMenu"
  export default function Products() {
    const LightModeState=useSelector(state=>state.lightMode)
    return (
        <div className="Products">     
      <Navbar/>
     

      <div class="mb-[1rem] mt-[5rem] grid grid-cols-8 sm:grid-cols-8 md:grid-cols-8 lg:grid-cols-8 gap-1">

        
    <div class=" p-4 col-span-2 m-1">
        <div className="flex justify-center h-full w-full">
            <div className="w-full h-full">
            <FilterMenu/>
            </div>

            <div className="VerticalLine h-full w-full ml-4"></div>

        </div>
        
        
    </div>
    
    <div class="  p-4 col-span-6 m-1">

        <div className="flex flex-col justify-center items-center">

            <div className="filters grid grid-cols-2  w-full h-full">

                <div className=" col-span-1  ">
                  <p>Showing <b>5 of 5</b> Products </p>
                </div>

                <div className=" col-span-1   flex justify-end">
                

                <div className="flex justify-center">
                     <div className="Filter">
                    <Select variant="static" label="Sort by">
                    <Option>DefaultL</Option>
                    <Option>Most Popular</Option>
                    <Option>Most Rated</Option>
                    <Option>Date</Option>
                    </Select>
        
                     </div>

                     <div>
                     <IconButton variant="text" className="rounded-full ">
                     <svg width="16" height="10"><rect x="0" y="0" width="4" height="4"></rect><rect x="6" y="0" width="10" height="4"></rect><rect x="0" y="6" width="4" height="4"></rect><rect x="6" y="6" width="10" height="4"></rect></svg>
                    </IconButton>
                     </div>


                     <div>
                     <IconButton variant="text" className="rounded-full ">
                     <svg width="10" height="10"><rect x="0" y="0" width="4" height="4"></rect><rect x="6" y="0" width="4" height="4"></rect><rect x="0" y="6" width="4" height="4"></rect><rect x="6" y="6" width="4" height="4"></rect></svg>
                    </IconButton>
                     </div>


                     <div>
                     <IconButton variant="text" className="rounded-full ">
                     <svg width="16" height="10"><rect x="0" y="0" width="4" height="4"></rect><rect x="6" y="0" width="4" height="4"></rect><rect x="12" y="0" width="4" height="4"></rect><rect x="0" y="6" width="4" height="4"></rect><rect x="6" y="6" width="4" height="4"></rect><rect x="12" y="6" width="4" height="4"></rect></svg>
                    </IconButton>
                     </div>


                     <div>
                     <IconButton variant="text" className="rounded-full">
                     <svg width="22" height="10"><rect x="0" y="0" width="4" height="4"></rect><rect x="6" y="0" width="4" height="4"></rect><rect x="12" y="0" width="4" height="4"></rect><rect x="18" y="0" width="4" height="4"></rect><rect x="0" y="6" width="4" height="4"></rect><rect x="6" y="6" width="4" height="4"></rect><rect x="12" y="6" width="4" height="4"></rect><rect x="18" y="6" width="4" height="4"></rect></svg>
                    </IconButton>
                     </div>




                </div>

                </div>
                
                
            </div>

            <div className="ProductsContainer">
            <ul>
                <li className="m-2">
                <Productcard/>
                
                </li>
                <li className="m-2">
                <Productcard/>

                </li>


                <li className="m-2">
                <Productcard/>

                </li>
                <li className="m-2">
                <Productcard/>

                </li>
                <li className="m-2">
                <Productcard/>

                </li>
                <li className="m-2">
                <Productcard/>

                </li>
            </ul>
                
            </div>

        </div>

        <div className="Pagination flex justify-center mt-4">
        <Pagination/>
        </div>

        
    
       
    </div>
</div>
    
        

    <Footer/>
        </div>
      


    );
  }