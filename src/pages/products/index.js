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
    Drawer,
    IconButton
  } from "@material-tailwind/react";
  import React from "react";
 import Navbar from "../../components/NavBar"
 import Pagination from "../../components/Pagination";
 import {LightMode,DarkMode} from "../../redux/actions/LightActions"
 import { useSelector } from "react-redux/es/hooks/useSelector";
import Footer from "../../components/footer"
import Productcard from "../../components/Card/ProductCard"
import FilterMenu from "../../components/FilterMenu"
import Breadcrump from "../../components/Breadcrump"

  export default function Products() {
    const smBreakpoint = 540;
    const LightModeState=useSelector(state=>state.lightMode)
    const [DisplayVariant, setDisplayVariant] = React.useState(window.innerWidth < smBreakpoint?0:1);
    const [MobileDraweropen, SetMobileDraweropen] = React.useState(false);
 
    const HandleDisplayVariantChange=(type)=>
    {
        setDisplayVariant(type)
    }
  const openMobileDrawer = () => SetMobileDraweropen(true);
  const closeMobileDrawer = () => SetMobileDraweropen(false);
    return (
        <div className={`Products w-full h-full`}> 
            
      <Drawer open={MobileDraweropen} onClose={closeMobileDrawer} className={`md:hidden p-4 bg ${LightModeState==LightMode().type?"bg-whiteTheme_T2":"bg-darkTheme_T2"}`}>
      <FilterMenu/>
      </Drawer>
     
      <Navbar/>
      <div className=" w-full pt-[20vh] md:pt-[15vh] ">
    <Breadcrump List={true} /*Parent={{PageUrl:"/Home",PageName:"Home"}}*/ Child={{PageUrl:"/Products",PageName:"Shop"}} />
    </div>
      <div class="mb-[1rem] pt-1 w-full grid grid-cols-8 sm:grid-cols-8 md:grid-cols-8 lg:grid-cols-8  ">

        
            <div class={`hidden md:block pl-3 col-span-2 ml-4   rounded-lg shadow-lg ${LightModeState==LightMode().type?"bg-whiteTheme_T2":"bg-darkTheme_T2"}`} >
                <div className="flex justify-center h-full w-full">
                    <div className=" p-2  w-full h-full">
                    <FilterMenu/>
                    </div>

                    

                </div>
                
                
            </div>

            <div className="fixed z-40 left-0 top-[50vh] Filter md:hidden">
                            <IconButton onClick={openMobileDrawer} size="lg"   className=" rounded-none rounded-r-full  hover:scale-105">
                            <i class="fa-solid fa-filter"></i>
                            </IconButton>
            </div>
    
            <div class="col-span-8  md:col-span-6 mt-4 w-full pr-1">

                <div className="flex flex-col justify-center items-stretch ">

                    <div className="filters grid grid-cols-1 md:grid-cols-2">
                        <div className=" col-span-1  flex justify-center items-center">

                                                
                            <p>Showing <b>5 of 5</b> Products </p>
                            
                            
                        
                        </div>

                        

                        <div className="col-span-1 flex justify-stretch flex-wrap p-3">
                            <div className="Order">
                            <Select  labelProps={{style:{color:LightModeState==LightMode().type?"black":"white"}}} variant="static" size="md" label="Sort by">
                            <Option>Default</Option>
                            <Option>Most Popular</Option>
                            <Option>Most Rated</Option>
                            <Option>Date</Option>
                            </Select>
                
                            </div>
                            <div>
                            <IconButton variant="text" className="md:hidden rounded-full " onClick={()=>{HandleDisplayVariantChange(0)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z"/></svg>
                            </IconButton>
                            </div>
                            <div>
                            <IconButton variant="text" className="rounded-full " onClick={()=>{HandleDisplayVariantChange(1)}}>
                            <svg width="16" height="10"><rect x="0" y="0" width="4" height="4"></rect><rect x="6" y="0" width="10" height="4"></rect><rect x="0" y="6" width="4" height="4"></rect><rect x="6" y="6" width="10" height="4"></rect></svg>
                            </IconButton>
                            </div>
                            
                            


                            <div className="hidden sm:block">
                            <IconButton variant="text" className="rounded-full "onClick={()=>{HandleDisplayVariantChange(2)}}>
                            <svg width="10" height="10"><rect x="0" y="0" width="4" height="4"></rect><rect x="6" y="0" width="4" height="4"></rect><rect x="0" y="6" width="4" height="4"></rect><rect x="6" y="6" width="4" height="4"></rect></svg>
                            </IconButton>
                            </div>


                            <div className="hidden lg:block">
                            <IconButton variant="text" className=" rounded-full " onClick={()=>{HandleDisplayVariantChange(3)}}>
                            <svg width="16" height="10"><rect x="0" y="0" width="4" height="4"></rect><rect x="6" y="0" width="4" height="4"></rect><rect x="12" y="0" width="4" height="4"></rect><rect x="0" y="6" width="4" height="4"></rect><rect x="6" y="6" width="4" height="4"></rect><rect x="12" y="6" width="4" height="4"></rect></svg>
                            </IconButton>
                            </div>


                        </div>

                        
                        
                        
                    </div>

                    <div className={`grid gap-4  ${DisplayVariant==1 ||DisplayVariant==0?"grid-cols-1":DisplayVariant==2?"grid-cols-2":"grid-cols-3"}`}>
                    
                        <div className=" col-span-1">
                        <Productcard variant={DisplayVariant} />
                        
                        </div>
                        <div className=" col-span-1">
                        <Productcard variant={DisplayVariant} />

                        </div>


                        <div className="col-span-1">
                        <Productcard variant={DisplayVariant} />

                        </div>
                        <div className="col-span-1">
                        <Productcard variant={DisplayVariant} />

                        </div>
                        <div className=" col-span-1">
                        <Productcard variant={DisplayVariant} />

                        </div>
                        <div className=" col-span-1">
                        <Productcard variant={DisplayVariant} />

                        </div>
                    
                        
                    </div>

                </div>

                

                
            
            
            </div>

            <div className=" col-span-8 Pagination flex justify-center items-center mt-4">
                <div>
                <Pagination/>
                </div>
                
                </div>
</div>
    
        

    <Footer/>
        </div>
      


    );
  }