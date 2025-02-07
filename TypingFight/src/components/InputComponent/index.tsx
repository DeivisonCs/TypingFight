import React from "react";
import "./styles.css";

interface inputProps {
    id: string,
    name: string,
    type: string,
    maxLength: number,
    placeholder: string,
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent: React.FC<inputProps> = ({id, name, type, maxLength, placeholder, value, onChange}) => {
    return (
        <div className="input-field-div">
            <input
                id={id}
                name={name}
                value={value}
                type={type}
                maxLength={maxLength}
                placeholder={placeholder}
                onChange={onChange}/>
            <span className="input-bottom-line"></span>
        </div>
    )
}

export default InputComponent;