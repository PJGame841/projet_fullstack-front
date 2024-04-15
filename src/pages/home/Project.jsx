import './Project.css';

function Project({ project }) {
    return (
        <div className="card">
            <h2>{project.title}</h2>
            <p>{project.short_description}</p>
        </div>
    )
}

export default Project