import {useState} from "react";
import "./EditableProject.css";

function EditableProject() {
    const { project } = useLoaderData();

    const [projectState, setProjectState] = useState(project);

    const submit = useSubmit();

    const handleAddImage = () => {
        if (projectState.images.length >= 5) return;

        const newProject = { ...project };
        newProject.images.push('https://cdn-icons-png.flaticon.com/512/5360/5360938.png');
        setProjectState(newProject);
    }

    const handleDeleteImage = (index) => () => {
        const newProject = { ...project };
        newProject.images.splice(index, 1);
        setProjectState(newProject);
    }

    return (
        <>
            {project._id ? (
                <Form method="delete">
                    <button type="submit">Delete</button>
                </Form>
            ) : null}

            <Form method="put" onChange={(e) => {
                if (!project._id) return;
                console.log("form change")
                submit(e.currentTarget)
            }}>
                <EditableField name="title" defaultValue={project.title} tag="h2" required/>
                <EditableField name="short_description" defaultValue={project.short_description} required/>
                <EditableField name="description" defaultValue={project.description} required/>
                <EditableField name="thumbnail" defaultValue={project.thumbnail} required>
                    <img src={project.thumbnail} alt="project thumbnail"/>
                </EditableField>
                {projectState.images.length !== 0 ? projectState.images.map((image, index) => (
                    <div className="imageField" key={index}>
                        <EditableField name={`images[${index}]`} defaultValue={image}>
                            <img src={image} alt="project image"/>
                        </EditableField>

                        <button type="button" onClick={handleDeleteImage(index)}>Supprimer</button>
                    </div>
                )) : null}
                <button type="button" onClick={handleAddImage}>Ajouter une image</button>

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

    if (!project) {
        return redirect('/dashboard');
    }

    return { project };
}

export async function editableProjectAction({ params, request }) {
    if (request.method === 'DELETE') {
        return { project: await deleteProject(params.projectId) }
    }

    const formData = await request.formData();
    const editedProject = {}
    for (let [key, value] of formData.entries()) {
        if (("" + key).includes("images")) {
            if (!editedProject.images) {
                editedProject.images = [];
            }

            editedProject.images.push(value);
            continue;
        }

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