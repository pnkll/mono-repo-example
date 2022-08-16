import React from "react";
import { createRoot } from "react-dom/client"
import App from "./components/App.jsx";
import './assets/index.css'
import { BrowserRouter } from "react-router-dom"

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>)