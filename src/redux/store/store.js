import { createStore } from 'redux';
import rootReducers from '../reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import an encryption library like CryptoJS
import CryptoJS from 'crypto-js';

// Define a secret key for encryption
const secretKey = process.env.REACT_APP_REDUX_LOCALSTORAGE_SECRETKEY;

const encryptState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    const encryptedState = CryptoJS.AES.encrypt(serializedState, secretKey).toString();
    return encryptedState;
  } catch (err) {
    console.error('Encryption error:', err);
    return null;
  }
};

const decrypteState= (encryptedState) => {
  try {
    const decryptedState = CryptoJS.AES.decrypt(encryptedState, secretKey).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedState);
  } catch (err) {
    console.error('Decryption error:', err);
    return undefined;
  }
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['lightMode', 'isLogged','language','cartList','isRemembered','userAccessToken'],
  serialize: encryptState, // Use the custom serialize function
  deserialize:decrypteState,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
const persistor = persistStore(store);

export default store;
export { persistor };
