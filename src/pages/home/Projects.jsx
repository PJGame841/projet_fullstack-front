import {Link} from "react-router-dom";
import './Projects.css';

function Projects({ project }) {
    return (
        <Link to={`/projects/${project._id}`} className="card">
            <img src={project.thumbnail} alt={project.title} width="300px" />
            <h2>{project.title}</h2>
            <p>{project.short_description}</p>
        </Link>
    )
}

export default Projects