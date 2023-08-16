
import { useSelector,useDispatch } from 'react-redux';
import {Route,Routes} from "react-router-dom";
import Home from "./pages/home"
import Register from "./pages/register"
import Login from "./pages/login"
import Contact from "./pages/contact"
import Products from "./pages/products"
import ProductDetails from "./pages/products/Preview"
import {LightMode,DarkMode} from "./redux/actions/LightActions"
import Dev from "./pages/dev"
export default function App() {
  const LightModeState=useSelector(state=>state.lightMode)
  const root = document.getElementById("root");
  if(LightModeState==LightMode().type)
  {
    root.classList.remove("ContainerDarkMode")
    root.classList.add("ContainerWhiteMode")

  }
  else
  {
    root.classList.remove("ContainerWhiteMode")
    root.classList.add("ContainerDarkMode")
    
  }
  
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/Contact" element={<Contact/>}/>
      <Route path="/Products" element={<Products/>}/>
      <Route path="/ProductDetails" element={<ProductDetails/>}/>
      <Route path="/Dev" element={<Dev/>}/>
    </Routes>
  );
}
