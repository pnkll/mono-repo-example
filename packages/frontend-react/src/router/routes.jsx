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
import TableList from "../pages/TableList/TableList.jsx"
import TableById from "../pages/TableList/TableById/TableById.jsx"
import Page404 from "../pages/Page404/Page404.jsx"
import TaskList from "../pages/TaskList/TaskList.jsx"
import TaskById from "../pages/TaskList/TaskById/TaskById"
import EventsList from "../pages/EventsList/EventsList.jsx"

export const routes = (token) => {
    if (token) {
        return [
            {
                path: '/', element: <SidebarHeaderLayout />, children: [
                    { index: true, breadcrumb: 'Главная', element: <Main />, state: { hello: 'hfds' } },
                    {path: '*', element: <Navigate replace to='../404'/>},
                    {path: '404', breadcrumb: 'Раздел не найден', element: <Page404/>},
                    { path: 'signup', element: <Navigate to='../' /> },
                    { path: 'signin', element: <Navigate to='../' /> },
                    { path: 'demo', breadcrumb: 'Demo', element: <Demo /> },
                                        { path: 'settings/task-types', breadcrumb: 'Шаблоны', element: <TaskTypeList /> },
                    { path: 'settings/task-types/:id', breadcrumb: 'Шаблон', element: <TaskTypeById /> },
                    { path: 'settings/task-types/new', breadcrumb: 'Создание шаблона', element: <TaskTypeById /> },
                    { path: 'operator', breadcrumb: 'Operator', element: <Operator /> },
                    { path: 'settings', breadcrumb: 'Настройки', element: <Settings /> },
                    { path: 'settings/roles', breadcrumb: 'Роли', element: <RoleList /> },
                    { path: 'settings/roles/:id', breadcrumb: 'Роль', element: <RoleById /> },
                    { path: 'settings/roles/new', breadcrumb: 'Создание роли', element: <RoleById /> },
                    { path: 'profile', breadcrumb: 'Сотрудник', element: <Profile /> },
                    { path: 'users', breadcrumb: 'Сотрудники', element: <UsersList /> },
                    { path: 'users/:id', breadcrumb: 'Сотрудник', element: <Profile /> },
                    { path: 'tables', breadcrumb: 'Список таблиц', element: <TableList /> },
                    { path: 'tables/:id', breadcrumb: 'Таблица', element: <TableById /> },
                    { path: 'tables/new', breadcrumb: 'Редактор таблиц', element: <TableConstructor /> },
                    { path: 'tasks',breadcrumb: 'Список задач', element: <TaskList/>},
                    { path: 'tasks/:id',breadcrumb: 'Задача', element: <TaskById/>},
                    { path: 'events', breadcrumb: 'События', element: <EventsList/>}
                ]
            },
        ]
    } else {
        return [
            {path: '/', element: <AuthLayout/>, children:[
                {index: true, element: <Navigate to='signin'/>},
                {path: 'signin', element: <SignIn/>},
                {path: 'signup', element: <SignUp/>},
                {path: '*', element: <Navigate to='signin'/>}
            ]},
            {path: '*', breadcrumb: null, element: <>Такой страницы не существует</>},
        ]
    }
}