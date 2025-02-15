import React, { useEffect, useState } from "react";

import "./styles.css";
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";
import socket, { createMatch, offMatchCreated, onMatchCreated } from "../../service/SocketService";
import WaitingPlayerComponent from "../../components/WaitingPlayerComponent";

const CreateMatchPage: React.FC = () => {
    const [isProtected, setIsProtected] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [waitingPlayer, setWaiting] = useState(false);
    let [matchId, setMatchId] = useState('');

    function changeProtect() {
        setIsProtected(!isProtected);
    }

    function validDataInput(){
        if(name == ''){
            alert("Informe o nome da partida");
            return false;
        }

        if(isProtected && password == ''){
            alert("Informe a senha ou desative a proteção de sala");
            return false;
        }

        return true;
    }

    function onSubmit() {
        if(validDataInput()){
            createMatch(name, password);
            setWaiting(true);
        }
    }

    function cancelWaiting(){
        setWaiting(false);
    }

    useEffect(() => {
        if(!socket.connected){
            socket.connect();
        }

        const handleMatchCreated = (roomId: string) => {
            setMatchId(roomId);
        }
    
        onMatchCreated(handleMatchCreated);

        return () => {
            offMatchCreated(handleMatchCreated);
        };
    }, []);

    return (
        <section id="create-match-section">
            <form>
                <h1>Criar Partida</h1>
                <div className="top-input-container">
                    <InputComponent 
                        id="name-field"
                        name="name-field"
                        type="text"
                        value={name}
                        maxLength={30}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome da Partida"/>

                    <div className="input-field-div protected-field-div">
                        <label className="protected-field-label">Protegida:</label>
                        <div onClick={() => changeProtect()} className="protected-input-div">
                            <span className={isProtected? "protect-activated protected-input-changer" : "protect-deactivated protected-input-changer"}></span>
                        </div>
                        <span className="protected-field-legend">S/N</span>
                    </div>
                </div>
                
                { isProtected &&(
                    <InputComponent 
                    id="password-field"
                    name="password-field"
                    type="text"
                    value={password}
                    maxLength={30}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"/>)
                }

            </form>

            <div className="buttons-container">
                <ButtonComponent label="Voltar" width="250px" linkTo="/"/>
                <ButtonComponent label="Criar" width="250px" onClick={onSubmit}/>
            </div>

            {waitingPlayer && <WaitingPlayerComponent matchId={matchId} onClick={cancelWaiting}/>}
        </section>
    )
}

export default CreateMatchPage;