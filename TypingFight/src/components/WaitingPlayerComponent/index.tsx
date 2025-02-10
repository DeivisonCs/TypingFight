import React, { useEffect, useState } from "react";
import ButtonComponent from "../ButtonComponent";

import "./styes.css";
import { closeMatch } from "../../service/SocketService";

interface WaitingProps{
    matchId: string
    onClick: () => void
}

const WaitingPlayerComponent: React.FC<WaitingProps> = (props) => {
    const [dots, setDots] = useState<string>("");

    function onCancel() {
        closeMatch(props.matchId);
        console.log(props.matchId);
        props.onClick();
    }

    useEffect(() => {
        const waitingDotsInterval = setInterval(() => {
            setDots((prevDots) => {
                if (prevDots.length < 3) 
                    return prevDots + ".";
                else 
                    return "";
            });
        }, 500);

        return () => clearInterval(waitingDotsInterval);
    }, []);

    return (
        <div id="waiting-component">
            <h1>Esperando outro jogador{dots}</h1>

            <ButtonComponent label="Cancelar" width="110px" onClick={onCancel}/>
        </div>
    )
}

export default WaitingPlayerComponent;