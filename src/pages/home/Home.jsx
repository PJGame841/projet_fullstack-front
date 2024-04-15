import './Home.css'
import Project from "./Project.jsx";
import {useLoaderData} from "react-router-dom";
import {fetchProjects} from "../../services/projects.js";

function Home() {
    const { projects } = useLoaderData();

    return (
        <>
            <h1>Projets</h1>
            <div className="projects">
                {projects.map(project => (
                    <Project key={project._id} project={project}/>
                ))}
            </div>
        </>
    )
}

export async function homeLoader() {
    return { projects: await fetchProjects() }
}

export default Home
