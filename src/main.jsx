import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, redirect, RouterProvider} from 'react-router-dom'
import App from './pages/home/App.jsx'
import Login from './pages/login/Login.jsx'
import './index.css'
import {isLoggedIn, login} from "./services/auth.js";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import {fetchProject, fetchProjects, updateProject} from "./services/projects.js";

const router = createBrowserRouter([
    {
        path: '/',
        loader: async () => {
            return { projects: await fetchProjects() }
        },
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
    },
    {
        path: '/dashboard/:projectId?',
        loader: async ({ params }) => {
            const isLogged = await isLoggedIn();
            if (!isLogged) {
                return redirect('/login');
            }

            const data = {}
            if (params.projectId) {
                data.selectedProject = params.projectId;
            }

            return { ...data, projects: await fetchProjects() };
        },
        action: async ({ params, request }) => {
            if (params.projectId) {
                const formData = await request.formData();
                const editedProject = {}
                for (let [key, value] of formData.entries()) {
                    editedProject[key] = value;
                }

                const project = await updateProject(params.projectId, editedProject);

                return { project };
            }
        },
        element: <Dashboard />,
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
