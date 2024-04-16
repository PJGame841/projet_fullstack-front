
import "./Project.css";
import {useLoaderData} from "react-router-dom";
import {fetchProject} from "../../services/projects.js";

function Project() {
    const { project } = useLoaderData();

    return (
        <div>
            <h1>{project.title}</h1>
            <div className="keywords">
                {project.keywords.map((keyword, index) => (
                    <span key={index}>{keyword}</span>
                ))}
            </div>
            <p>{project.short_description}</p>
            {project.images.map((image, index) => (
                <img key={index} src={image} alt={project.title + "-" + index} />
            ))}
            <p>{project.description}</p>

        </div>
    );
}

export async function projectLoader({ params }) {
    return { project: await fetchProject(params.projectId) };
}

export default Project;