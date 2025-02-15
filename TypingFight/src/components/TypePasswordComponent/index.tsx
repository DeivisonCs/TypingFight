import React, { useState } from "react";
import "./styles.css";
import ButtonComponent from "../ButtonComponent";
import InputComponent from "../InputComponent";

interface passCheckProps {
    pass: string
    onVerified: () => void
    onCanceled: () => void
}

const TypePasswordComponent:React.FC<passCheckProps> = ({pass, onVerified, onCanceled}) => {

    const [password, setPassword] = useState<string>("");

    function onsubmit() {
        if(password != pass){
            alert('Senha incorreta!');
            setPassword('');
            return;
        }
        
        onVerified();
    }

    return (
        <div id="entering-game-background">
            <div id="entering-game-div">
                <InputComponent 
                    id="password-field" 
                    name="password-field"
                    maxLength={30}
                    placeholder="Senha"
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />

                <div className="buttons-div">
                    <ButtonComponent label="Cancelar" width="110px" onClick={onCanceled} />
                    <ButtonComponent label="Confirmar" width="110px" onClick={onsubmit} />
                </div>
            </div>
        </div>
    );
}

export default TypePasswordComponent;