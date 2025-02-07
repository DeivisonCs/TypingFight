import React, { useEffect, useRef } from "react";

import "./styles.css";
import ButtonComponent from "../../components/ButtonComponent";
import socket, { onGetMatches, getMatches, offGetMatches } from "../../service/SocketService";

const SearchMatchPage: React.FC = () => {
    const hasExecuted = useRef(false);
    // const hasListenerAdded = useRef(false);

    function getAllMatches() {
        console.log("requisição feita");
        getMatches();
    }


    useEffect(() => {

        if(!socket.connected){
            socket.connect();
        }

        const handleGetMatches = (matches: any) => {
            console.log("matches");
            console.log(matches);
            matches.forEach((match: any) => {
                console.log("=" + match);
            });
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
                        <tr>
                            <td>nome</td>
                            <td>s/n</td>
                            <td><ButtonComponent label="Entrar" width="fit-content"/></td>
                        </tr>
                        <tr>
                            <td>nome</td>
                            <td>s/n</td>
                            <td><ButtonComponent label="Entrar" width="fit-content"/></td>
                        </tr>
                        <tr>
                            <td>nome</td>
                            <td>s/n</td>
                            <td><ButtonComponent label="Entrar" width="fit-content"/></td>
                        </tr>
                        <tr>
                            <td>nome</td>
                            <td>s/n</td>
                            <td><ButtonComponent label="Entrar" width="fit-content"/></td>
                        </tr>
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