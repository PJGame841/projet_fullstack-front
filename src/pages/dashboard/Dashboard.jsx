import './Dashboard.css';
import {useState} from "react";
import {Link, useLoaderData} from "react-router-dom";
import EditableProject from "./EditableProject.jsx";

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

export default Dashboard;