import React, { useState } from "react";

import "./styles.css";
import PointsBarComponent from "../PointsBarComponent";

interface MatchProps {
    player: boolean
}

const MatchFieldComponent: React.FC<MatchProps> = ({player}) => {
    const [points, setPoints] = useState(0);

    function updatePoints() {
        setPoints(points+10);
    }

    return (
        <section 
            className="player-field-section" 
            style={{'backgroundColor': player? 'rgb(253, 63, 63)': 'rgb(83, 83, 255)', 
                'height': player? '65vh': '35vh'
            }}>
                <PointsBarComponent player={player} points={points}/>
        </section>
    )
}

export default MatchFieldComponent;