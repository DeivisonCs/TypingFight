import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MatchFieldComponent from "../../components/MatchFieldComponent";

import "./styles.css";

export interface Match {
    id: string,
    name: string,
    password: string,
    players: string[],
}

const MatchPage: React.FC = () => {
    // const location = useLocation();
    // const match: Match = location.state;
    const match: Match = {
        id: 'id',
        name: 'teste',
        password: 'dasd',
        players: [
            'player 1',
            'player 2'
        ]
    };

    useEffect(() => {
        console.log('Match entered ' + match.name);
    }, []);

    return(
        <section id="on-match-section">
            <MatchFieldComponent player={false}/>
            <MatchFieldComponent player={true}/>
        </section>
    )
}

export default MatchPage;