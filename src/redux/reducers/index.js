import LightModeReducer from "./lightMode";
import isLoggedReducer from "./isLogged"
import cartReducer from "./Cart"
import {combineReducers} from 'redux';

const allReducers=combineReducers({
    lightMode:LightModeReducer,
    isLogged:isLoggedReducer,
    cartStatus:cartReducer,
})
export default allReducers