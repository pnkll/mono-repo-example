import { isNil } from "lodash"
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
import Profile from "../pages/Profile/Profile.jsx"

export const routes = (token) => {
    if (token) {
        return [
            // {
            //     path: "/",
            //     element: <Dashboard />,
            //     children: [
            //         {
            //             path: "messages",
            //             element: <DashboardMessages />,
            //         },
            //         { path: "tasks", element: <DashboardTasks /> },
            //     ],
            // },
            // { path: "team", element: <AboutPage /> },
            // { path: '', breadcrumb: '', element: <Navigate to='main' /> },
            { path: '', breadcrumb: '', element: <Navigate to='main' /> },
            { path: 'signup', element: <Navigate to='../' /> },
            { path: 'signin', element: <Navigate to='../' /> },
            { path: 'main', breadcrumb: 'Main', element: <Main /> },
            { path: 'demo', breadcrumb: 'Demo', element: <Demo /> },
            { path: 'constructor', breadcrumb: 'Constructor', element: <TableConstructor /> },
            { path: 'settings/task-types', breadcrumb: 'Шаблоны', element: <TaskTypeList /> },
            { path: 'settings/task-types/:id', element: <TaskTypeById /> },
            { path: 'settings/task-types/new', element: <TaskTypeById /> },
            { path: 'call-center', breadcrumb: 'Call center', element: <CallCenter /> },
            { path: 'operator', breadcrumb: 'Operator', element: <Operator /> },
            { path: 'settings', breadcrumb: 'Настройки', element: <Settings /> },
            { path: 'settings/roles', breadcrumb: 'Роли', element: <RoleList /> },
            { path: 'settings/roles/:id', breadcrumb: 'Роль', element: <RoleById /> },
            { path: 'settings/roles/new', breadcrumb: 'Создание роли', element: <RoleById /> },
            { path: 'profile', breadcrumb: 'Сотрудник', element: <Profile /> }
        ]
    } else {
        return [
            { path: '', breadcrumb: '', element: <Navigate to='signin' /> },
            { path: '*', breadcrumb: '', element: <Navigate to='signin' /> },
            { path: 'signup', breadcrumb: 'SignUp', element: <SignUp /> },
            { path: 'signin', breadcrumb: 'SignIn', element: <SignIn /> },
        ]
    }
}