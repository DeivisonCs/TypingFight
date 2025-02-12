import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MatchFieldComponent from "../../components/MatchFieldComponent";

import "./styles.css";
import socket, { offPointsUpdate, onPointsUpdate } from "../../service/SocketService";
import EndGameComponent from "../../components/EndGameComponent";

export interface Match {
    id: string,
    name: string,
    password: string,
    players: string[],
}

const MatchPage: React.FC = () => {
    const location = useLocation();
    const match: Match = location.state;
    const [enemyPoints, setEnemyPoints] = useState(0);
    const [myPoints, setMyPoints] = useState(0);
    const [matchStatus, setMatchStatus] = useState(true);

    useEffect(() => {
        if(myPoints >= 100 || enemyPoints >= 100){
            setMatchStatus(false);
        }

    }, [myPoints, enemyPoints]);

    useEffect(() => {

        if(!socket.connected){
            socket.connect();
        }
        
        const handlePointsUpdate = (output: any) => {
            if(output.player == match.players[0]){
                setMyPoints(output.points);
            }
            else{
                setEnemyPoints(output.points);
            }
        }

        onPointsUpdate(handlePointsUpdate);

        return () => {
            offPointsUpdate(handlePointsUpdate);
        };
    }, []);


    return(
        <section id="on-match-section">
            <MatchFieldComponent 
                player={match.players[1]} 
                matchId={match.id} 
                score={enemyPoints}
                status={matchStatus}/>

            <MatchFieldComponent 
                player={match.players[0]} 
                matchId={match.id} 
                score={myPoints}
                status={matchStatus}/>

            { !matchStatus && 
                <EndGameComponent result={myPoints >= 100} matchId={match.id} players={match.players}/>
            }
        </section>
    )
}

export default MatchPage;