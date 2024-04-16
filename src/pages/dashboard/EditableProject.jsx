
function EditableProject() {
    const { project } = useLoaderData();
    const submit = useSubmit();

    return (
        <>
            {project._id ? (
                <Form method="delete">
                    <button type="submit">Delete</button>
                </Form>
            ) : null}

            <Form method="put" onChange={(e) => {
                if (!project._id) return;
                submit(e.currentTarget)
            }}>
                <EditableField name="title" defaultValue={project.title} tag="h2" required />
                <EditableField name="short_description" defaultValue={project.short_description} required />
                <EditableField name="description" defaultValue={project.description} required />
                <EditableField name="thumbnail" defaultValue={project.thumbnail} required>
                    <img src={project.thumbnail} alt="project thumbnail" />
                </EditableField>

                {!project._id ? (
                    <button type="submit">Save</button>
                ) : null}
            </Form>
        </>
)
}
import EditableField from "./EditableField.jsx";
import {Form, redirect, useLoaderData, useSubmit} from "react-router-dom";

import {createProject, deleteProject, fetchProject, updateProject} from "../../services/projects.js";

export function newProjectLoader() {
    return { project: {} };
}

export async function editableProjectLoader({ params }) {
    const project = await fetchProject(params.projectId);

    console.log("Loading project id");

    if (!project) {
        return redirect('/dashboard');
    }

    return { project };
}

export async function editableProjectAction({ params, request }) {
    console.log(params, request)
    if (request.method === 'DELETE') {
        return { project: await deleteProject(params.projectId) }
    }

    const formData = await request.formData();
    const editedProject = {}
    for (let [key, value] of formData.entries()) {
        editedProject[key] = value;
    }

    let project;
    if (params.projectId) {
        project = await updateProject(params.projectId, editedProject);

        return { project };
    } else {
        project = await createProject(editedProject);



        return redirect(`/dashboard/${project._id}`);
    }
}

export default EditableProject