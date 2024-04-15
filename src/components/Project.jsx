function Project({ project }) {
    return (
        <div>
            <h2>{project.title}</h2>
            <p>{project.short_description}</p>
        </div>
    )
}

export default Project