import SignIn from "@pages/SignIn/SignIn";
import SignUp from "@pages/SignUp/SignUp";
import AuthLayout from "@src/page_layouts/AuthLayout/AuthLayout";
import { Navigate } from "react-router-dom";

export const noAuthRoutes = [
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