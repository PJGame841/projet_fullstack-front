import {useState} from "react";

function EditableField({ children, name, defaultValue, tag = 'p', type = 'text' }) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(defaultValue);

    const CustomTag = tag || 'p';
    const Children = children || value;

    return (
        <div>
            {isEditing ? (
                <input
                    type={type}
                    name={name}
                    autoFocus={true}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            setIsEditing(false);
                        }
                    }}
                    onBlur={() => {
                        setIsEditing(false)
                    }}
                />
            ) : (
                <>
                    <input type="hidden" name={name} value={value}/>
                    <CustomTag onClick={() => setIsEditing(true)}>{Children}</CustomTag>
                </>
            )}
        </div>
    );
}

export default EditableField;