import Demo from "../pages/Demo.jsx"
import { Navigate } from "react-router-dom"

export const publicRoutes = [
    { path: '', component: <Navigate to='demo' /> },
    { path: 'demo', component: <Demo /> },
]

export const privateRoutes = [
    { path: '', component: <Navigate to='demo' /> },
    { path: 'demo', component: <Demo /> },
]