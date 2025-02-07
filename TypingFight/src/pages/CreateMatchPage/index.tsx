import React, { useEffect, useState } from "react";

import "./styles.css";
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";
import socket, { createMatch, onMatchCreated } from "../../service/SocketService";

const CreateMatchPage: React.FC = () => {
    const [isProtected, setIsProtected] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    function changeProtect() {
        setIsProtected(!isProtected);
    }

    function onSubmit() {
        console.log("submited with name: " + name);
        createMatch(name);
    }

    const handleMatchCreated = (roomId: string) => {
        console.log(`Match created with ID: ${roomId}`);
    }

    onMatchCreated(handleMatchCreated);

    useEffect(() => {
        if(!socket.connected){
            socket.connect();
        }
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
        </section>
    )
}

export default CreateMatchPage;