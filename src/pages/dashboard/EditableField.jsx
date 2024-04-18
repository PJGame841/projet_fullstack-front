import {useEffect, useState} from "react";
import {TextField} from "@mui/material";

function EditableField({ children, name, defaultValue, tag = 'p', required = false, editing = false, rows = 1, multiline = false }) {
    const [isEditing, setIsEditing] = useState(!defaultValue || editing);
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    const CustomTag = tag || 'p';
    const Children = children || value;

    return (
        <div>
            {isEditing ? (
                <TextField
                    name={name}
                    label={name}
                    autoFocus={true}
                    placeholder={name}
                    value={value}
                    rows={rows}
                    multiline={multiline}
                    required={required}
                    InputProps={{ style: { color: "white" }}}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter' && value) {
                            setIsEditing(false);
                        }
                    }}
                    onBlur={() => {
                        if (!value) return;
                        setIsEditing(false)
                    }}
                />
            ) : (
                <>
                    <input type="hidden" name={name} value={value} />
                    <CustomTag onClick={() => setIsEditing(true)}>{Children}</CustomTag>
                </>
            )}
        </div>
    );
}

export default EditableField;