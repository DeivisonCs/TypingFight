import React, { useEffect, useRef, useState } from "react";

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
    const writeInterval = useRef<ReturnType<typeof setInterval> | null>(null);

    function calculatePoints(): number{
        let timePoints = points+1;

        if(writeTime <= 1){
            timePoints += 3;
        }
        else if(writeTime <= 3){
            timePoints += 2;
        }
        else{
            timePoints += 1;
        }

        return Math.min(timePoints, 100);
    }

    function updatePoints() {
        setPoints(calculatePoints());
    }

    function sortWord() {
        const nextWord = Math.floor(Math.random() * allWords.length);
        setWord(allWords[nextWord]);
    }

    function startTimer() {
        if(writeInterval.current){
            clearInterval(writeInterval.current);
        }

        writeInterval.current = setInterval(() => {
            setWriteTime((prev) => prev + 1);
        }, 1000);
    }

    function resetTimer() {
        updatePoints();
        setWriteTime(0);
        startTimer();
    }

    function loadWords() {
        fetch('/words.txt')
            .then(response => response.text())
            .then(data => {
                const wordArray = data.split(',').map(word => word.trim());
                setWords(wordArray);
            })
            .catch((error) => console.error('Erro ao carregar as palavras:', error));
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {  
            if(event.key.toLowerCase() == word[letterIndex].toLowerCase()){
                setLetterIndex((prevIndex) => prevIndex + 1);
            }
        };

        if(player){
            startTimer();
            loadWords();
    
            if(letterIndex >= word.length){
                sortWord();
                setLetterIndex(0);
                resetTimer();
            }
    
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);

            if(writeInterval.current){
                clearInterval(writeInterval.current);
                writeInterval.current = null;
            }
        };
    }, [letterIndex, word]);

    const sectionStyle = {
        backgroundColor: player ? 'rgb(253, 63, 63)' : 'rgb(83, 83, 255)',
        height: player ? '65vh' : '35vh',
    };

    return (
        <section 
            className="player-field-section" 
            style={sectionStyle}>
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