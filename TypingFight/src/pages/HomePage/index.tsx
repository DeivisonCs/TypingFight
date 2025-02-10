import React from "react";
import './styles.css';
import ButtonComponent from "../../components/ButtonComponent";

const HomePage: React.FC = () => {
    return (
        <section id="home-page">
            <h1 id="home-title" className="fugaz-one-regular">Typing Fight</h1>


            <div id="nav-buttons">
                <ButtonComponent label="Buscar Partidas" width="250px" linkTo="/search-match"/>
                <ButtonComponent label="Criar Partida" width="250px" linkTo="/create-match"/>
            </div>
        </section>
    );
}

export default HomePage;