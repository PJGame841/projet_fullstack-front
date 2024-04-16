import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, redirect, RouterProvider} from 'react-router-dom'
import Home, {homeAction, homeLoader} from './pages/home/Home.jsx'
import Login, {loginAction, loginLoader} from './pages/login/Login.jsx'
import './index.css'
import Dashboard, {dashboardLoader} from "./pages/dashboard/Dashboard.jsx";
import {logout} from "./services/auth.js";
import LandingPage, { landingPageLoader} from "./components/LandingPage/LandingPage.jsx";
import EditableProject, {
    editableProjectAction,
    editableProjectLoader,
    newProjectLoader
} from "./pages/dashboard/EditableProject.jsx";
import About from "./pages/about/About.jsx";
import Project, {projectLoader} from "./pages/projects/Project.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        loader: landingPageLoader,
        element: <LandingPage />,
        children: [
            {
                path: '/',
                loader: homeLoader,
                action: homeAction,
                element: <Home />,
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/projects/:projectId',
                loader: projectLoader,
                element: <Project />,
            },
            {
                path: '/login',
                loader: loginLoader,
                action: loginAction,
                element: <Login />,
            },
            {
                path: '/dashboard',
                loader: dashboardLoader,
                element: <Dashboard />,
                children: [
                    {
                        path: '/dashboard/new',
                        loader: newProjectLoader,
                        action: editableProjectAction,
                        element: <EditableProject />
                    },
                    {
                        path: '/dashboard/:projectId',
                        loader: editableProjectLoader,
                        action: editableProjectAction,
                        element: <EditableProject />
                    }
                ]
            }
        ]
    },
    {
        path: '/logout',
        loader: () => {
            logout();
            return redirect('/login');
        }
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
