import './Home.css'
import Projects from "./Projects.jsx";
import {useLoaderData} from "react-router-dom";
import {fetchProjects} from "../../services/projects.js";
import {logout} from "../../services/auth.js";

function Home() {
    const { projects } = useLoaderData();

    return (
        <>
            <h1>Projets</h1>
            <div className="projects">
                {projects.map(project => (
                    <Projects key={project._id} project={project}/>
                ))}
            </div>
        </>
    )
}

export async function homeLoader() {
    return { projects: await fetchProjects() }
}

export async function homeAction({ request }) {
    const formData = await request.formData();
    if (formData.get('action') === 'logout') {
        logout();
    }

    return null;
}

export default Home
