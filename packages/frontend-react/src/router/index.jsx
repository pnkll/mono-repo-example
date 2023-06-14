import Demo from "../pages/Demo/Demo.jsx"
import { Navigate } from "react-router-dom"
import Main from "../pages/Main/Main.jsx"
import TableConstructor from "../pages/TableConstructor/TableConstructor.jsx"
import Tasks from "../pages/Tasks/Tasks.jsx"
import SignUp from "../pages/SignUp/SignUp.jsx"

export const publicRoutes = [
    { path: '', breadcrumb: '', component: <Navigate to='main' /> },
    { path: 'main', breadcrumb: 'Main', component: <Main /> },
    { path: 'demo', breadcrumb: 'Demo', component: <Demo /> },
    { path: 'constructor', breadcrumb: 'Constructor', component: <TableConstructor /> },
    { path: 'tasks', breadcrumb: 'Tasks', component: <Tasks /> },
    { path: 'signup', breadcrumb: 'SignUp', component: <SignUp /> },
]

export const privateRoutes = [
    { path: '', component: <Navigate to='demo' /> },
    { path: 'demo', component: <Demo /> },
]