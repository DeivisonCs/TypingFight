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

        const handlePointsUpdate = (points: number, player: string) => {
            if(player != socket.id!.slice(0, 2)){
                setEnemyPoints(points);
            }
        }

        onPointsUpdate(handlePointsUpdate);
        console.log('Match entered ' + match.name);

        return () => {
            offPointsUpdate(handlePointsUpdate);
        };
    }, []);

    return(
        <section id="on-match-section">
            <MatchFieldComponent player={false} matchId={match.id} enemyPoints={enemyPoints}/>
            <MatchFieldComponent player={true} matchId={match.id}/>
            {/* <h1>{match.players}</h1> */}
        </section>
    )
}

export default MatchPage;