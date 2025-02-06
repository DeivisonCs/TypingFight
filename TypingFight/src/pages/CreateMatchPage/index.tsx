import React, { useState } from "react";

import "./styles.css";

const CreateMatchPage: React.FC = () => {
    const [isProtected, setIsProtected] = useState(false);

    function changeProtect() {
        setIsProtected(!isProtected);
    }

    return (
        <section>
            <h1>Criar Partida</h1>
            <form>
                <div className="top-input-container">
                    <div className="input-field-div name-field-div">
                        <input
                            id="name-field"
                            name="name-field"
                            type="text"
                            maxLength={30}
                            placeholder="Nome da Partida"/>
                        <span className="input-bottom-line"></span>
                    </div>

                    <div className="input-field-div protected-field-div">
                        <label className="protected-field-label">Protegida:</label>
                        <div onClick={() => changeProtect()} className="protected-input-div">
                            <span className={isProtected? "protect-activated protected-input-changer" : "protect-deactivated protected-input-changer"}></span>
                        </div>
                        <span className="protected-field-legend">S/N</span>
                    </div>
                </div>
                
                { isProtected &&
                    (<div className="input-field-div password-field-div">
                        <input 
                            id="password-field" 
                            name="password-field" 
                            type="text" 
                            maxLength={30}
                            placeholder="Senha"/>
                        <span className="input-bottom-line"></span>
                    </div>)
                }
            </form>
        </section>
    )
}

export default CreateMatchPage;