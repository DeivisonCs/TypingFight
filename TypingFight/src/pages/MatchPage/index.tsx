import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export interface Match {
    id: string,
    name: string,
    password: string,
    players: string[],
}

const MatchPage: React.FC = () => {
    const location = useLocation();
    const match: Match = location.state;

    useEffect(() => {
        console.log('Match entered ' + match.name);
    }, []);

    return(
        <div>
            <h1>MatchPage</h1>
            <h1>{match.players[0]}</h1>
            <h1>{match.players[1]}</h1>
        </div>
    )
}

export default MatchPage;