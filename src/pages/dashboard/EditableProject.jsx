import EditableField from "./EditableField.jsx";
import {Form, useLoaderData, useSubmit} from "react-router-dom";
import {fetchProject, updateProject} from "../../services/projects.js";

function EditableProject() {
    const { project } = useLoaderData();
    const submit = useSubmit();

    return (
        <Form method="put" onChange={(e) => {
            submit(e.currentTarget)
        }}>
            <EditableField name="title" defaultValue={project.title} tag="h2" />
            <EditableField name="short_description" defaultValue={project.short_description} />
            <EditableField name="description" defaultValue={project.description} />
            <EditableField name="thumnail" defaultValue={project.thumbnail}>
                <img src={project.thumbnail} alt="project thumbnail" />
            </EditableField>

            {/*<button type="submit">Save</button>*/}
        </Form>
    )
}

export async function editableProjectLoader({ params }) {
    return { project: await fetchProject(params.projectId) }
}

export async function editableProjectAction({ params, request }) {
    if (params.projectId) {
        const formData = await request.formData();
        const editedProject = {}
        for (let [key, value] of formData.entries()) {
            editedProject[key] = value;
        }

        const project = await updateProject(params.projectId, editedProject);

        return { project };
    }
}

export default EditableProject