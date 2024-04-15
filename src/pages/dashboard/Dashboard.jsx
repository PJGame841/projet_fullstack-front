import './Dashboard.css';
import {Link, redirect, useLoaderData} from "react-router-dom";
import EditableProject from "./EditableProject.jsx";
import {isLoggedIn} from "../../services/auth.js";
import {fetchProjects, updateProject} from "../../services/projects.js";

function Dashboard() {
    const { selectedProject, projects } = useLoaderData();
    const project = projects.find(project => project._id === selectedProject);

    return (
        <div className={"content"}>
            <div className={"side-nav"}>
                <h2>Liste des projets</h2>
                <hr />
                {projects.map(project => (
                    <Link key={project._id} to={selectedProject === project._id ? '/dashboard' : `${project._id}`}>
                        <h3>{project.title}</h3>
                    </Link>
                ))}
            </div>
            <div className={"container"}>
                <h1>Dashboard</h1>
                <div className={"main-content"}>
                    {project ? <EditableProject project={project} /> : <h3>Selectionnez un projet</h3>}
                </div>
            </div>
        </div>
    );
}

export async function dashboardLoader({ params }) {
    const isLogged = await isLoggedIn();
    if (!isLogged) {
        return redirect('/login');
    }

    const data = {}
    if (params.projectId) {
        data.selectedProject = params.projectId;
    }

    return { ...data, projects: await fetchProjects() };
}

export async function dashboardAction({ params, request }) {
    if (params.projectId) {
        const formData = await request.formData();
        const editedProject = {}
        for (let [key, value] of formData.entries()) {
            editedProject[key] = value;
        }

        const project = await updateProject(params.projectId, editedProject);

        return { project };
    }
}

export default Dashboard;