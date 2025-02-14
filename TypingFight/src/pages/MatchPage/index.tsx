import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MatchFieldComponent from "../../components/MatchFieldComponent";

import "./styles.css";
import socket, { offPlayerLeftMatch, offPointsUpdate, onPlayerLeftMatch, onPointsUpdate } from "../../service/SocketService";
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
            if(output.player == getId()){
                setMyPoints(output.points);
            }
            else{
                setEnemyPoints(output.points);
            }
        }

        const handlePlayerLeftMatch = () => {
            alert("Enemy Player Left Match")
            setMyPoints(100);
        }

        onPointsUpdate(handlePointsUpdate);
        onPlayerLeftMatch(handlePlayerLeftMatch);

        return () => {
            offPointsUpdate(handlePointsUpdate);
            offPlayerLeftMatch(handlePlayerLeftMatch);
        };
    }, []);

    function getPlayer(enemy: boolean) {
        if(enemy) {
            return match.players.find(player => player != getId())!;
        }

        return match.players.find(player => player == getId())!
    }

    function getId(){
        return socket.id!.slice(0, 2);
    }

    return(
        <section id="on-match-section">
            <MatchFieldComponent 
                player={getPlayer(true)} 
                matchId={match.id} 
                score={enemyPoints}
                status={matchStatus}/>

            <MatchFieldComponent 
                player={getPlayer(false)} 
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