import {useEffect, useState} from 'react'
import './App.css'
import Project from "./Project.jsx";
import {useLoaderData} from "react-router-dom";

function fetchProjects() {
    return fetch('/api/projects')
        .then(response => response.json())
}

function App() {
    const { projects } = useLoaderData();

    return (
        <>
            <h1>Projets</h1>
            <div className="projects">
                {projects.map(project => (
                    <Project key={project._id} project={project}/>
                ))}
                {projects.map(project => (
                    <Project key={project._id} project={project}/>
                ))}
                {projects.map(project => (
                    <Project key={project._id} project={project}/>
                ))}
            </div>
        </>
    )
}

export default App
