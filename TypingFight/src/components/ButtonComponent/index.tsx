import React from "react";

import { Link } from 'react-router-dom';

import './styles.css';

interface ButtonProps {
    label: string;
    width: string;
    linkTo: string;
}

const ButtonComponent: React.FC<ButtonProps> = ({label, width, linkTo}) => {
    return (
        <span>
            <Link to={linkTo}>
                <button style={{width: width, fontFamily:"fugaz-one-regular"}}>
                    <p>{label}</p>
                </button>
            </Link>
        </span>
    );
}

export default ButtonComponent;