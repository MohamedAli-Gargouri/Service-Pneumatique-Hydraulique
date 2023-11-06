import LightModeReducer from './lightMode';
import cartReducer,{CartListReducer} from './Cart';
import { combineReducers } from 'redux';
import LanguageReducer from './Language';
import accessTokenReducer from "./accessToken"
import isLoggedReducer from "./isLogged"
const allReducers = combineReducers({
  lightMode: LightModeReducer,
  userAccessToken: accessTokenReducer,
  cartStatus: cartReducer,
  cartList:CartListReducer,
  language:LanguageReducer,
  isLogged:isLoggedReducer
});
export default allReducers;
