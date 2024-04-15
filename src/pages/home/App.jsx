import {useEffect, useState} from 'react'
import './App.css'
import Project from "../../components/Project.jsx";

function fetchProjects() {
    return fetch('/api/projects')
        .then(response => response.json())
}

function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects().then(data => setProjects(data.data));
    }, []);

  return (
    <>
        <div>
            <h1>Projects</h1>
            {projects.map(project => (
                <Project key={project._id} project={project} />
            ))}
        </div>
    </>
  )
}

export default App
