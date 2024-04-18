
export function click(project_id) {
    return fetch(`/api/metrics/${project_id}/click`, {
        method: "POST"
    })
        .then(response => response.json())
        .then(data => {
            if (!data.valid) console.error(data.message)
        });
}