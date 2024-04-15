import EditableField from "./EditableField.jsx";
import {Form, useSubmit} from "react-router-dom";

function EditableProject({ project }) {
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

export default EditableProject