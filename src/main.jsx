import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, redirect, RouterProvider} from 'react-router-dom'
import Home, { homeLoader } from './pages/home/Home.jsx'
import Login, {loginAction, loginLoader} from './pages/login/Login.jsx'
import './index.css'
import Dashboard, {dashboardAction, dashboardLoader} from "./pages/dashboard/Dashboard.jsx";
import {logout} from "./services/auth.js";
import LandingPage, {landingPageLoader} from "./components/LandingPage/LandingPage.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        loader: landingPageLoader,
        element: <LandingPage />,
        children: [
            {
                path: '/',
                loader: homeLoader,
                element: <Home />,
            },
            {
                path: '/login',
                loader: loginLoader,
                action: loginAction,
                element: <Login />,
            },
            {
                path: '/dashboard/:projectId?',
                loader: dashboardLoader,
                action: dashboardAction,
                element: <Dashboard />,
            },
            {
                path: '/logout',
                loader: () => {
                    logout();
                    return redirect('/login');
                }
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
