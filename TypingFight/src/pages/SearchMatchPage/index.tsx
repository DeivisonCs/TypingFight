import React, { useEffect, useRef, useState } from "react";

import "./styles.css";
import ButtonComponent from "../../components/ButtonComponent";
import socket, { onGetMatches, getMatches, offGetMatches, enterMatch } from "../../service/SocketService";
import { useNavigate } from "react-router-dom";

export interface Match {
    id: string,
    name: string,
    password: string,
    players: string[],
}


const SearchMatchPage: React.FC = () => {
    const hasExecuted = useRef(false);
    const [allMatches, setMatches] = useState<Match[]>([]);
    const navigate = useNavigate();

    function getAllMatches() {
        getMatches();
    }

    function setIdOnMatch(match: Match){
        match.players.push('');
        match.players[1] = match.players[0];
        match.players[0] = getId();
    }

    function selectMatch(match: Match) {
        console.log('Entering Match');
        enterMatch(match);
        setIdOnMatch(match);
        navigate("/on-match", {state: match});
    }

    function getId(){
        return socket.id!.slice(0, 2);
    }

    useEffect(() => {

        if(!socket.connected){
            socket.connect();
        }

        const handleGetMatches = (matches: Match[]) => {        
            setMatches(matches);
        };

        onGetMatches(handleGetMatches);

        if (!hasExecuted.current) {
            getAllMatches();
            hasExecuted.current = true;
        }

        return () => {
            offGetMatches(handleGetMatches);
        };
    }, []);

    return (
        <section id="search-match-section">
            <div className="matches-container">
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Protegida</th>
                        </tr>
                    </thead>
                    <tbody>

                        {allMatches.map((match) => {
                                return (
                                <tr key={match.id}>
                                    <td>{match.name}</td>
                                    <td>{match.password? 'Sim': 'Não'}</td>
                                    <td><ButtonComponent label="Entrar" width="fit-content" onClick={() => selectMatch(match)}/></td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div className="buttons-container">
                <ButtonComponent label="Voltar" width="250px" linkTo="/"/>
            </div>
        </section>
    )
}

export default SearchMatchPage;