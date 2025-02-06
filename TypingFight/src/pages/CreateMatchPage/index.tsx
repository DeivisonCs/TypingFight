import React, { useState } from "react";

import "./styles.css";
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";

const CreateMatchPage: React.FC = () => {
    const [isProtected, setIsProtected] = useState(false);

    function changeProtect() {
        setIsProtected(!isProtected);
    }

    return (
        <section id="create-match-section">
            <form>
                <h1>Criar Partida</h1>
                <div className="top-input-container">
                    {/* <div className="input-field-div name-field-div">
                        <input
                            id="name-field"
                            name="name-field"
                            type="text"
                            maxLength={30}
                            placeholder="Nome da Partida"/>
                        <span className="input-bottom-line"></span>
                    </div> */}
                    <InputComponent 
                        id="name-field"
                        name="name-field"
                        type="text"
                        maxLength={30}
                        placeholder="Nome da Partida"/>

                    <div className="input-field-div protected-field-div">
                        <label className="protected-field-label">Protegida:</label>
                        <div onClick={() => changeProtect()} className="protected-input-div">
                            <span className={isProtected? "protect-activated protected-input-changer" : "protect-deactivated protected-input-changer"}></span>
                        </div>
                        <span className="protected-field-legend">S/N</span>
                    </div>
                </div>
                
                { isProtected &&
                    (
                    // <div className="input-field-div password-field-div">
                    //     <input 
                    //         id="password-field" 
                    //         name="password-field" 
                    //         type="text" 
                    //         maxLength={30}
                    //         placeholder="Senha"/>
                    //     <span className="input-bottom-line"></span>
                    // </div>
                    
                    <InputComponent 
                    id="password-field"
                    name="password-field"
                    type="text"
                    maxLength={30}
                    placeholder="Senha"/>)
                }

            </form>

            <div className="buttons-container">
                <ButtonComponent label="Voltar" width="250px" linkTo="/"/>
                <ButtonComponent label="Criar" width="250px"/>
            </div>
        </section>
    )
}

export default CreateMatchPage;