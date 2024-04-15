import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, redirect, RouterProvider} from 'react-router-dom'
import App from './pages/home/App.jsx'
import Login from './pages/login/Login.jsx'
import './index.css'
import {isLoggedIn, login} from "./services/auth.js";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/login',
        loader: async () => {
            return await isLoggedIn() ? redirect('/') : null;
        },
        action: async ({ request }) => {
            const formData = await request.formData();
            try {
                const loggedIn = await login(formData.get('username'), formData.get('password'));
                if (loggedIn) {
                    return null;
                } else {
                    return { loginError: "Bad username/password" };
                }
            } catch (e) {
                return { loginError: e.message };
            }
        },
        element: <Login />,
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
