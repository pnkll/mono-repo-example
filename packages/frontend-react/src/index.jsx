import React from "react";
import {createRoot} from "react-dom/client"
import App from "./App.jsx";
//import './assets/index.css'
import './assets/styles/index.scss'
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux";
import {persistor, store} from "./store/store.js";
import {PersistGate} from "redux-persist/integration/react";

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
    <Provider store={store}>
        <PersistGate loading={'loading'} persistor={persistor} >
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </PersistGate>
    </Provider>
)