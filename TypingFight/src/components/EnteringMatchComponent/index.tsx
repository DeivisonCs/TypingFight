import React, { useEffect, useState } from "react";
import socket, { offMatchAccepted, offMatchNotAvailable, onMatchAccepted, onMatchNotAvailable } from "../../service/SocketService";
import { useNavigate } from "react-router-dom";

import "./styles.css";

interface EnteringProps {
    closeComponent: () => void
}

interface Match {
    id: string,
    name: string,
    password: string,
    players: string[],
}

const EnteringMatchComponent:React.FC<EnteringProps> = ({closeComponent}) => {

    const [dots, setDots] = useState<string>("");
    const navigate = useNavigate();


    useEffect(() => {
        if(!socket.connected){
            socket.connect();
        }

        const handleMatchAccepted = (match: Match) => {
            navigate("/on-match", {state: match});
        };

        const handleMatchNotAvailable = () => {
            closeComponent();
        };

        onMatchAccepted(handleMatchAccepted);
        onMatchNotAvailable(handleMatchNotAvailable);

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
            offMatchNotAvailable(handleMatchNotAvailable);
        };
    }, []);

    return (
        <div id="entering-game-background">
            <div id="entering-game-div">
                <h2>Entrando na partida{dots}</h2>

                {/* <ButtonComponent label="Voltar" width="110px"/> */}
            </div>
        </div>
    );
}

export default EnteringMatchComponent;