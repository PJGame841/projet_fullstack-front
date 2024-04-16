
export function fetchProjects() {
    return fetch('/api/projects')
        .then(response => response.json())
        .then(data => data.data)
}

export function fetchProject(projectId) {
    return fetch(`/api/projects/${projectId}`)
        .then(response => response.json())
        .then(data => data.data)
}

export function createProject(project) {
    return fetch('/api/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
    })
        .then(response => response.json())
        .then(data => {
            if (!data.valid) {
                throw new Error(data.message)
            } else {
                return data.data
            }
        })
}

export function updateProject(projectId, project) {
    return fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
    })
        .then(response => response.json())
        .then(data => data.data)
}

export function deleteProject(projectId) {
    return fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => data.data)
}