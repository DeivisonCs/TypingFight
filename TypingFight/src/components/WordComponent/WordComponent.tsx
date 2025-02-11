import React from "react";

import "./styles.css";

interface WordProps {
    word: string
    typed: number
}

const WordComponent: React.FC<WordProps> = ({word, typed}) => {


    return(
        <div className="word-div">
            {word.split('').map((letter, index) => (
                <span 
                    className={`fugaz-one-regular ${typed>index? 'typed': 'toType'}`}
                    key={index}
                >

                    {letter}
                </span>
            ))}
        </div>
    );
}

export default WordComponent;