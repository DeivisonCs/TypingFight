import React, { useEffect, useRef, useState } from "react";

import "./styles.css";
import ButtonComponent from "../../components/ButtonComponent";
import socket, { onGetMatches, getMatches, offGetMatches, enterMatch, onMatchesUpdate, offMatchesUpdate } from "../../service/SocketService";
import EnteringMatchComponent from "../../components/EnteringMatchComponent";
import TypePasswordComponent from "../../components/TypePasswordComponent";

export interface Match {
    id: string,
    name: string,
    password: string,
    players: string[],
}


const SearchMatchPage: React.FC = () => {
    const hasExecuted = useRef(false);
    const [allMatches, setMatches] = useState<Match[]>([]);
    const [checkingPassword, setCheckingPassowrd] = useState(false);
    const [entering, setEntering] = useState(false);
    const [matchSelected, setMatchSelected] = useState<Match>();

    function getAllMatches() {
        getMatches();
    }

    function doEnterMatch(match: Match) {
        setEntering(true);
        enterMatch(match);
    }

    function selectMatch(match: Match) {
        setMatchSelected(match);

        if(match.password){
            setCheckingPassowrd(true);
            return;
        }

        doEnterMatch(match);
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

    useEffect(() => {

        const handleMatchesUpdate = (matches: Match[]) => {
            setMatches(matches);
        }

        onMatchesUpdate(handleMatchesUpdate);

        return () => offMatchesUpdate(handleMatchesUpdate);
    }, [])

    return (
        <>
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
        
        {entering && <EnteringMatchComponent closeComponent={() => setEntering(false)}/>}
        {checkingPassword && 
            <TypePasswordComponent 
                pass={matchSelected!.password} 
                onVerified={() => doEnterMatch(matchSelected!)}
                onCanceled={() => setCheckingPassowrd(false)}/>}
        </>
    )
}

export default SearchMatchPage;