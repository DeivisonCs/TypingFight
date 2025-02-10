import React, { useEffect, useState } from "react";
import ButtonComponent from "../ButtonComponent";

import "./styes.css";
import socket, { closeMatch, offMatchAccepted, onMatchAccepted } from "../../service/SocketService";
import { useNavigate } from "react-router-dom";

interface WaitingProps{
    matchId: string
    onClick: () => void
}

export interface Match {
    id: string,
    name: string,
    password: string,
    players: string[],
}

const WaitingPlayerComponent: React.FC<WaitingProps> = (props) => {
    const [dots, setDots] = useState<string>("");
    const navigate = useNavigate();

    function cancelMatch() {
        closeMatch(props.matchId);
        console.log(props.matchId);
        props.onClick();
    }

    useEffect(() => {
        if(!socket.connected){
            socket.connect();
        }

        const handleMatchAccepted = (match: Match) => {
            console.log(`Match accepted`);
            navigate("/on-match", {state: match});
        }

        onMatchAccepted(handleMatchAccepted);

        const waitingDotsInterval = setInterval(() => {
            setDots((prevDots) => {
                if (prevDots.length < 3) 
                    return prevDots + ".";
                else 
                    return "";
            });
        }, 500);

        return () => {
            clearInterval(waitingDotsInterval)
            offMatchAccepted(handleMatchAccepted);
        };
    }, []);

    return (
        <div id="waiting-component">
            <h1>Esperando outro jogador{dots}</h1>

            <ButtonComponent label="Cancelar" width="110px" onClick={cancelMatch}/>
        </div>
    )
}

export default WaitingPlayerComponent;