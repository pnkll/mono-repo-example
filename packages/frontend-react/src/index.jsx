import { createRoot } from "react-dom/client"
import App from "@src/app/App";
import '@assets/styles/index.scss'
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux";
import { persistor, store } from "@store/store"
import { PersistGate } from "redux-persist/integration/react";

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)