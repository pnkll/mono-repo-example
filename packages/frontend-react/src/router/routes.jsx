import { isNil } from "lodash"
import Demo from "../pages/Demo/Demo.jsx"
import { Navigate, Outlet } from "react-router-dom"
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
import SidebarHeaderLayout from "../page_layouts/SidebarHeaderLayout/SidebarHeaderLayout.jsx"
import AuthLayout from "../page_layouts/AuthLayout/AuthLayout.jsx"
import UsersList from "../pages/UsersList/UsersList.jsx"

export const routes = (token) => {
    if (token) {
        return [
            {
                path: '/', element: <SidebarHeaderLayout />, children: [
                    { index: true, breadcrumb: 'Главная', element: <Main />, state: { hello: 'hfds' } },
                    {path: '*', breadcrumb: null, element: <>Такого раздела не существует</>},
                    { path: 'signup', element: <Navigate to='../' /> },
                    { path: 'signin', element: <Navigate to='../' /> },
                    { path: 'demo', breadcrumb: 'Demo', element: <Demo /> },
                    { path: 'constructor', breadcrumb: 'Constructor', element: <TableConstructor /> },
                    { path: 'settings/task-types', breadcrumb: 'Шаблоны', element: <TaskTypeList /> },
                    { path: 'settings/task-types/:id', breadcrumb: 'Шаблон', element: <TaskTypeById /> },
                    { path: 'settings/task-types/new', breadcrumb: 'Создание шаблона', element: <TaskTypeById /> },
                    { path: 'operator', breadcrumb: 'Operator', element: <Operator /> },
                    { path: 'settings', breadcrumb: 'Настройки', element: <Settings /> },
                    { path: 'settings/roles', breadcrumb: 'Роли', element: <RoleList /> },
                    { path: 'settings/roles/:id', breadcrumb: 'Роль', element: <RoleById /> },
                    { path: 'settings/roles/new', breadcrumb: 'Создание роли', element: <RoleById /> },
                    { path: 'profile', breadcrumb: 'Сотрудник', element: <Profile /> },
                    { path: 'users', breadcrumb: 'Сотрудник', element: <UsersList /> },
                    { path: 'users/:id', breadcrumb: 'Сотрудник', element: <Profile /> },
                ]
            },
        ]
    } else {
        return [
            {path: '/', element: <AuthLayout/>, children:[
                {index: true, element: <Navigate to='signin'/>},
                {path: 'signin', element: <SignIn/>},
                {path: 'signup', element: <SignUp/>},
            ]},
            {path: '*', breadcrumb: null, element: <>Такой страницы не существует</>},
        ]
    }
}