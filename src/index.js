import React,{Suspense} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import i18next from "i18next"
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import store,{persistor} from "./redux/store/store"
import './i18n';
import Loading from "./pages/loading"
import { PersistGate } from "redux-persist/integration/react";
//=========font & icons configuration-start ==========//

//=========font & icons configuration-end ==========//
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
    <BrowserRouter>
    <Suspense fallback={<Loading/>}>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
    </Suspense>
    </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
