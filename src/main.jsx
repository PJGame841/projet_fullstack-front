import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home, { homeLoader } from './pages/home/Home.jsx'
import Login, {loginAction, loginLoader} from './pages/login/Login.jsx'
import './index.css'
import Dashboard, {dashboardAction, dashboardLoader} from "./pages/dashboard/Dashboard.jsx";

const router = createBrowserRouter([
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
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
