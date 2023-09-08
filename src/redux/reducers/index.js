import LightModeReducer from './lightMode';
import isLoggedReducer from './isLogged';
import cartReducer,{CartListReducer} from './Cart';
import { combineReducers } from 'redux';
import LanguageReducer from './Language';
const allReducers = combineReducers({
  lightMode: LightModeReducer,
  isLogged: isLoggedReducer,
  cartStatus: cartReducer,
  cartList:CartListReducer,
  language:LanguageReducer
});
export default allReducers;
