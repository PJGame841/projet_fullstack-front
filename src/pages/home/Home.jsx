import './Home.css'
import Projects from "./Projects.jsx";
import {useLoaderData} from "react-router-dom";
import {fetchProjects} from "../../services/projects.js";
import {logout} from "../../services/auth.js";
import {useEffect, useState} from "react";
import {TextField} from "@mui/material";

function Home() {
    const { projects } = useLoaderData();

    const [projectsState, setProjectsState] = useState(projects);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const toSearch = search.split(" ");

        const filteredProjects = projects.filter(
            project =>
                (toSearch.length === 1 && toSearch[0] === '') ||
                toSearch.find(search => project.title.toLowerCase().includes(search.toLowerCase()) ||
                    project.keywords.find(keyword => keyword.includes(search.toLowerCase()))
                )
        );


        setProjectsState(filteredProjects);
    }, [search]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

    return (
        <>
            <h1>Projets</h1>
            <TextField className="searchInput" label="Recherche" value={search} onChange={handleSearch} placeholder="Nom du projet ou mot clés"/>
            <div className="projects">
                {projectsState.map(project => (
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
    } else if (formData.get('action') === 'search') {

    }

    return null;
}

export default Home
