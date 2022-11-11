import Demo from "@pages/Demo/Demo";
import { TaskDetailsPage } from "@pages/entities/task/TaskDetailsPage/index";
import { TaskEditPage } from "@pages/entities/task/TaskEditPage/index";
import EventsList from "@pages/EventsList/EventsList";
import Main from "@pages/Main/Main";
import Operator from "@pages/Operator/Operator";
import OrganizationPage from "@pages/OrganizationPage/OrganizationPage";
import Page404 from "@pages/Page404/Page404";
import Profile from "@pages/Profile/Profile";
import RoleById from "@pages/Roles/RoleById/RoleById";
import RoleList from "@pages/Roles/RoleList";
import Settings from "@pages/Settings/Settings";
import TableConstructor from "@pages/TableConstructor/TableConstructor";
import TableById from "@pages/TableList/TableById/TableById";
import TableList from "@pages/TableList/TableList";
import TaskCreate from "@pages/TaskList/TaskCreate/TaskCreate";
import TaskList from "@pages/TaskList/TaskList";
import TaskTypeById from "@pages/TaskTypeList/TaskTypeById/TaskTypeById";
import TaskTypeList from "@pages/TaskTypeList/TaskTypeList";
import UsersList from "@pages/UsersList/UsersList";
import { MainTemplate } from "@src/shared/ui/templates/main/index";
import { Navigate } from "react-router-dom";

export const authRoutes = [
    {
        path: '/', element: <MainTemplate />, children: [
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
            { path: 'tasks/:id', breadcrumb: 'Задача', element: <TaskDetailsPage /> },
            {path: 'tasks/:id/edit', breadcrumb: 'Редактирование', element: <TaskEditPage/>},
            { path: 'tasks/new', breadcrumb: 'Задача', element: <TaskCreate /> },
            { path: 'events', breadcrumb: 'События', element: <EventsList /> },
            { path: 'organization/:id', breadcrumb: 'Организация', element: <OrganizationPage/>},
            { path: 'organization', breadcrumb: null}
        ]
    },
]