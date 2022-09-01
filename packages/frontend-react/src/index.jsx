import React from "react";
import { createRoot } from "react-dom/client"
import App from "./App.jsx";
import './assets/index.css'
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux";
import { store } from "./store/store.js";

const container = document.getElementById('root')
const root = createRoot(container)

root.render(

    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>)