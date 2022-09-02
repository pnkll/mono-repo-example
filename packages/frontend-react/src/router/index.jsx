import Demo from "../pages/Demo/Demo.jsx"
import { Navigate } from "react-router-dom"
import Main from "../pages/Main/Main.jsx"
import TableConstructor from "../pages/TableConstructor/TableConstructor.jsx"
import SignUp from "../pages/SignUp/SignUp.jsx"
import SignIn from "../pages/SignIn/SignIn.jsx"
import CallCenter from "../pages/CallCenter/CallCenter.jsx"
import Operator from "../pages/Operator/Operator.jsx"
import Settings from "../pages/Settings/Settings.jsx"
import RoleList from "../pages/Roles/RoleList.jsx"
import RoleById from "../pages/Roles/RoleById/RoleById.jsx"
import TaskTypeList from "../pages/TaskTypeList/TaskTypeList.jsx"
import TaskTypeById from "../pages/TaskTypeList/TaskTypeById/TaskTypeById.jsx"

export const publicRoutes = [
    { path: '', breadcrumb: '', element: <Navigate to='main' /> },
    { path: 'main', breadcrumb: 'Main', element: <Main /> },
    { path: 'demo', breadcrumb: 'Demo', element: <Demo /> },
    { path: 'constructor', breadcrumb: 'Constructor', element: <TableConstructor /> },
    { path: 'task-types', breadcrumb: 'Шаблоны', element: <TaskTypeList /> },
    { path: 'task-types/:id', element: <TaskTypeById /> },
    { path: 'signup', breadcrumb: 'SignUp', element: <SignUp /> },
    { path: 'signin', breadcrumb: 'SignIn', element: <SignIn /> },
    { path: 'call-center', breadcrumb: 'Call center', element: <CallCenter /> },
    { path: 'operator', breadcrumb: 'Operator', element: <Operator /> },
    { path: 'settings', breadcrumb: 'Settings', element: <Settings /> },
    { path: 'roles', breadcrumb: 'Roles', element: <RoleList /> },
    { path: 'roles/:id', breadcrumb: 'Роль', element: <RoleById /> },
    
]

export const privateRoutes = [
    { path: '', element: <Navigate to='demo' /> },
    { path: 'demo', element: <Demo /> },
]