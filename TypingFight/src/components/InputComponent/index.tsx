import React from "react";
import "./styles.css";

interface inputProps {
    id: string,
    name: string,
    type: string,
    maxLength: number,
    placeholder: string;
}

const InputComponent: React.FC<inputProps> = ({id, name, type, maxLength, placeholder}) => {
    return (
        <div className="input-field-div">
            <input
                id={id}
                name={name}
                type={type}
                maxLength={maxLength}
                placeholder={placeholder}/>
            <span className="input-bottom-line"></span>
        </div>
    )
}

export default InputComponent;