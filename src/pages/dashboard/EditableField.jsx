import {useEffect, useState} from "react";

function EditableField({ children, name, defaultValue, tag = 'p', type = 'text', required = false, editing = false }) {
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
                <input
                    type={type}
                    name={name}
                    autoFocus={true}
                    placeholder={name}
                    value={value}
                    required={required}
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