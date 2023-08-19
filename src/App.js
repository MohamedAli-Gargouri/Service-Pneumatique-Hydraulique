import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {Route,Routes} from "react-router-dom";
import Home from "./pages/home"
import Register from "./pages/register"
import Login from "./pages/login"
import Contact from "./pages/contact"
import Products from "./pages/products"
import ProductDetails from "./pages/products/Preview"
import {LightMode,DarkMode} from "./redux/actions/LightActions"
import Dev from "./pages/test"
import Cart from './components/Cart';
import Loading from "./pages/loading"
export default function App() {
  const LightModeState=useSelector(state=>state.lightMode)
  const root = document.getElementById("root");
  if(LightModeState==LightMode().type)
  {
    root.classList.remove("bg-darkTheme_T1")
    root.classList.add("bg-whiteTheme_T1")

    root.classList.remove("tc-darkTheme_T1")
    root.classList.add("tc-whiteTheme_T1")

  }
  else
  {
    root.classList.remove("bg-whiteTheme_T1")
    root.classList.add("bg-darkTheme_T1")

    root.classList.remove("tc-whiteTheme_T1")
    root.classList.add("tc-darkTheme_T1")
    
  }
  
  return (<div className='animate-fade w-full'>
            <Cart />
            <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Home" element={<Home/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Register" element={<Register/>}/>
            <Route path="/Contact" element={<Contact/>}/>
            <Route path="/Products" element={<Products/>}/>
            <Route path="/ProductDetails" element={<ProductDetails/>}/>
            <Route path="/Dev" element={<Dev/>}/>
            <Route path="/Loading" element={<Loading/>}/>
            </Routes>
          </div>
  );
}
