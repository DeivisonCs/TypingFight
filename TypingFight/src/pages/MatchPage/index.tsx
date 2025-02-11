import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MatchFieldComponent from "../../components/MatchFieldComponent";

import "./styles.css";
import socket, { offPointsUpdate, onPointsUpdate } from "../../service/SocketService";

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
    // const match: Match = {
    //     id: 'id',
    //     name: 'teste',
    //     password: 'dasd',
    //     players: [
    //         'player 1',
    //         'player 2'
    //     ]
    // };

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
            <MatchFieldComponent player={match.players[1]} matchId={match.id} score={enemyPoints}/>
            <MatchFieldComponent player={match.players[0]} matchId={match.id} score={myPoints}/>
            {/* <h1>{match.players}</h1> */}
        </section>
    )
}

export default MatchPage;