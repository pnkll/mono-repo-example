import Demo from "@pages/Demo/Demo"
import EventsList from "@pages/EventsList/EventsList"
import Main from "@pages/Main/Main"
import Operator from "@pages/Operator/Operator"
import Page404 from "@pages/Page404/Page404"
import Profile from "@pages/Profile/Profile"
import RoleById from "@pages/Roles/RoleById/RoleById"
import RoleList from "@pages/Roles/RoleList"
import Settings from "@pages/Settings/Settings"
import SignIn from "@pages/SignIn/SignIn"
import SignUp from "@pages/SignUp/SignUp"
import TableConstructor from "@pages/TableConstructor/TableConstructor"
import TableById from "@pages/TableList/TableById/TableById"
import TableList from "@pages/TableList/TableList"
import TaskById from "@pages/TaskList/TaskById/TaskById"
import TaskList from "@pages/TaskList/TaskList"
import TaskTypeById from "@pages/TaskTypeList/TaskTypeById/TaskTypeById"
import TaskTypeList from "@pages/TaskTypeList/TaskTypeList"
import UsersList from "@pages/UsersList/UsersList"
import AuthLayout from "@src/page_layouts/AuthLayout/AuthLayout"
import SidebarHeaderLayout from "@src/page_layouts/SidebarHeaderLayout/SidebarHeaderLayout"

import { Navigate } from "react-router-dom"
import TaskCreate from "@pages/TaskList/TaskCreate/TaskCreate"


export const routes = (token) => {
    if (token) {
        return [
            {
                path: '/', element: <SidebarHeaderLayout />, children: [
                    { index: true, breadcrumb: 'Главная', element: <Main />, state: { hello: 'hfds' } },
                    { path: '*', element: <Navigate replace to='../404' /> },
                    { path: '404', breadcrumb: 'Раздел не найден', element: <Page404 /> },
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
                    { path: 'tasks', breadcrumb: 'Список задач', element: <TaskList /> },
                    { path: 'tasks/:id', breadcrumb: 'Задача', element: <TaskById /> },
                    { path: 'tasks/new', breadcrumb: 'Задача', element: <TaskCreate /> },
                    { path: 'events', breadcrumb: 'События', element: <EventsList /> }
                ]
            },
        ]
    } else {
        return [
            {
                path: '/', element: <AuthLayout />, children: [
                    { index: true, element: <Navigate to='signin' /> },
                    { path: 'signin', element: <SignIn /> },
                    { path: 'signup', element: <SignUp /> },
                    { path: '*', element: <Navigate to='signin' /> }
                ]
            },
            { path: '*', breadcrumb: null, element: <>Такой страницы не существует</> },
        ]
    }
}