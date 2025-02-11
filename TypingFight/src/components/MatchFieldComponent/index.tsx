import React, { useEffect, useRef, useState } from "react";

import "./styles.css";
import PointsBarComponent from "../PointsBarComponent";
import WordComponent from "../WordComponent/WordComponent";
import socket, { registerPoints } from "../../service/SocketService";

interface MatchProps {
    player: string
    matchId: string
    score: number
}

const MatchFieldComponent: React.FC<MatchProps> = (matchInfo) => {
    const myId = socket.id!.slice(0, 2);
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
        else if(writeTime <= 2){
            timePoints += 2;
        }
        else{
            timePoints += 1;
        }

        console.log(timePoints)
        return Math.min(timePoints, 100);
    }

    function updatePoints() {
        const newPoints = calculatePoints();
        setPoints(newPoints);
        registerPoints(matchInfo.matchId, newPoints);
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

        if(matchInfo.player){
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
        backgroundColor: matchInfo.player == myId ? 'rgb(253, 63, 63)' : 'rgb(83, 83, 255)',
        height: matchInfo.player == myId? '65vh' : '35vh',
    };

    return (
        <section 
            className="player-field-section" 
            style={sectionStyle}>
                <PointsBarComponent 
                    myId={myId}
                    player={matchInfo.player} 
                    score={matchInfo.score}/>

                {matchInfo.player == myId &&
                    <div>
                        <WordComponent word={word} typed={letterIndex}/>
                    </div>
                }
        </section>
    )
}

export default MatchFieldComponent;