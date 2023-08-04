import LightModeReducer from "./lightMode";
import isLoggedReducer from "./isLogged"
import {combineReducers} from 'redux';

const allReducers=combineReducers({
    lightMode:LightModeReducer,
    isLogged:isLoggedReducer
})
export default allReducers