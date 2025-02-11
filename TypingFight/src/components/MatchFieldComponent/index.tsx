import React, { useEffect, useState } from "react";

import "./styles.css";
import PointsBarComponent from "../PointsBarComponent";
import WordComponent from "../WordComponent/WordComponent";

interface MatchProps {
    player: boolean
}

const MatchFieldComponent: React.FC<MatchProps> = ({player}) => {
    const [points, setPoints] = useState(0);
    const [letterIndex, setLetterIndex] = useState(0);
    const [allWords, setWords] = useState<string[]>([]);
    const [word, setWord] = useState('Ler');

    function updatePoints() {
        setPoints((prevPoints) => prevPoints+10);
    }

    function sortWord() {
        const nextWord = Math.floor(Math.random() * allWords.length);
        setWord(allWords[nextWord]);
    }

    useEffect(() => {
        fetch('/words.txt')
            .then(response => response.text())
            .then(data => {
                const wordArray = data.split(',').map(word => word.trim());
                setWords(wordArray);
            })
            .catch((error) => console.error('Erro ao carregar as palavras:', error));


        const handleKeyDown = (event: KeyboardEvent) => {  
            if(event.key.toLowerCase() == word[letterIndex].toLowerCase()){
                setLetterIndex((prevIndex) => prevIndex + 1);
            }

        };

        if(letterIndex >= word.length){
            sortWord();
            setLetterIndex(0);
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [letterIndex]);

    return (
        <section 
            className="player-field-section" 
            style={{'backgroundColor': player? 'rgb(253, 63, 63)': 'rgb(83, 83, 255)', 
                'height': player? '65vh': '35vh'
            }}>
                <PointsBarComponent player={player} points={points}/>

                {player &&
                    <div>
                        <WordComponent word={word} typed={letterIndex}/>
                    </div>
                }
        </section>
    )
}

export default MatchFieldComponent;