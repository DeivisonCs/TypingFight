import React from "react";

import "./styles.css";
import ButtonComponent from "../ButtonComponent";
import { endGame } from "../../service/SocketService";
import { useNavigate } from "react-router-dom";

interface EndGameProps {
    result: boolean
    matchId: string
    players: string[]
}


const EndGameComponent:React.FC<EndGameProps> = (endProps) => {
    const navigate = useNavigate();

    function closeGame(){
        endGame(endProps.matchId);
        navigate('/');
    }

    return (
        <div id="end-game-background">
            <div id="end-game-div" className={endProps.result? 'winner': 'loser'}>
                {endProps.result?
                    <h2>Pro Player?</h2>
                    :
                    <h2>Melhore</h2>
                }

                <ButtonComponent label="Voltar" width="110px" onClick={closeGame}/>
            </div>
        </div>
    )
}

export default EndGameComponent;