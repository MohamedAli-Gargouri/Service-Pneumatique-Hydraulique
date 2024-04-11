import cartReducer, { CartListReducer } from './Cart';
import { combineReducers } from 'redux';

import accessTokenReducer from './accessToken';
import isLoggedReducer from './isLogged';
import lightReducer from './lightMode-reducer';
import LanguageReducer from './language-reducer';

const allReducers = combineReducers({
  lightMode: lightReducer,
  userAccessToken: accessTokenReducer,
  cartStatus: cartReducer,
  cartList: CartListReducer,
  language: LanguageReducer,
  isLogged: isLoggedReducer,
});
export default allReducers;
export type RootState = ReturnType<typeof allReducers>;
