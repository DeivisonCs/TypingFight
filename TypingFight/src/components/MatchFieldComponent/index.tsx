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
    const [writeTime, setWriteTime] = useState(0);
    const [writeInterval, setWriteInterval] = useState<number|null>(null);

    function updatePoints() {
        let timePoints = points+1;

        if(writeTime <= 2){
            timePoints += 3;
        }
        else if(writeTime <= 4){
            timePoints += 2;
        }
        else{
            timePoints += 1;
        }

        if(timePoints > 100)
            timePoints = 100;

        console.log(timePoints)
        setPoints(timePoints);
    }

    function sortWord() {
        const nextWord = Math.floor(Math.random() * allWords.length);
        setWord(allWords[nextWord]);
    }

    function startTimer() {
        if(!writeInterval) {
            const interval = setInterval(() => {
                setWriteTime((prev) => prev + 1);
            }, 1000);
    
            setWriteInterval(interval);
        }
    }

    function resetTimer() {
        if(writeInterval){
            clearInterval(writeInterval);
        }

        updatePoints();
        setWriteTime(0);
        startTimer();
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {  
            if(event.key.toLowerCase() == word[letterIndex].toLowerCase()){
                setLetterIndex((prevIndex) => prevIndex + 1);
            }
        };

        if(player){
            startTimer();

            fetch('/words.txt')
                .then(response => response.text())
                .then(data => {
                    const wordArray = data.split(',').map(word => word.trim());
                    setWords(wordArray);
                })
                .catch((error) => console.error('Erro ao carregar as palavras:', error));
    
            if(letterIndex >= word.length){
                sortWord();
                setLetterIndex(0);
                resetTimer();
            }
    
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);

            if(writeInterval){
                clearInterval(writeInterval); 
            }
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