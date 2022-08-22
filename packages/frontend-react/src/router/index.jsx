import Demo from "../pages/Demo/Demo.jsx"
import { Navigate } from "react-router-dom"
import Main from "../pages/Main/Main.jsx"
import TableConstructor from "../pages/TableConstructor/TableConstructor.jsx"
import Tasks from "../pages/Tasks/Tasks.jsx"
import SignUp from "../pages/SignUp/SignUp.jsx"

export const publicRoutes = [
    { path: '', component: <Navigate to='main' /> },
    { path: 'main', component: <Main /> },
    { path: 'demo', component: <Demo /> },
    { path: 'constructor', component: <TableConstructor /> },
    { path: 'tasks', component: <Tasks /> },
    { path: 'signup', component: <SignUp /> }
]

export const privateRoutes = [
    { path: '', component: <Navigate to='demo' /> },
    { path: 'demo', component: <Demo /> },
]