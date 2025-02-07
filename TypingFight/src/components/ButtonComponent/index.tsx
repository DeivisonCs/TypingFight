import React from "react";

import { Link } from 'react-router-dom';

import './styles.css';

interface ButtonProps {
    label: string,
    width: string,
    linkTo?: string,
    onClick?: () => void;
}

const ButtonComponent: React.FC<ButtonProps> = ({label, width, linkTo, onClick}) => {
    return (
        <span>
            {  linkTo ? 
                (

                    <Link to={linkTo}>
                        <button onClick={onClick? onClick : undefined} style={{width: width, fontFamily:"fugaz-one-regular"}}>
                            <p>{label}</p>
                        </button>
                    </Link>
                ) :
                (
                    <button onClick={onClick? onClick : undefined} style={{width: width, fontFamily:"fugaz-one-regular"}}>
                        <p>{label}</p>
                    </button>
                )
            }
        </span>
    );
}

export default ButtonComponent;