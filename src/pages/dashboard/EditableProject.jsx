import {useState} from "react";
import EditableField from "./EditableField.jsx";
import {Form} from "react-router-dom";

function EditableProject({ project }) {
    return (
        <Form method="put">
            <EditableField name="title" defaultValue={project.title} tag="h2" />
            <EditableField name="short_description" defaultValue={project.short_description} />
            <EditableField name="description" defaultValue={project.description} />
            <EditableField name="thumnail" defaultValue={project.thumbnail}>
                <img src={project.thumbnail} />
            </EditableField>

            <button type="submit">Save</button>
        </Form>
    )
}

export default EditableProject