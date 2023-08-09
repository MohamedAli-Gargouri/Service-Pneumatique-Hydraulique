
import { useSelector,useDispatch } from 'react-redux';
import {Route,Routes} from "react-router-dom";
import Home from "./pages/home"
import Register from "./pages/register"
import Login from "./pages/login"
import Contact from "./pages/contact"
import Products from "./pages/products"
import ProductDetails from "./pages/products/Preview"
export default function App() {
  const counter=useSelector(state=>state.counter)
  const dispatch=useDispatch()
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/Contact" element={<Contact/>}/>
      <Route path="/Products" element={<Products/>}/>
      <Route path="/ProductDetails" element={<ProductDetails/>}/>
    </Routes>
  );
}
