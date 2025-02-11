import React from "react";

import "./styles.css";

interface MatchProps {
    player: boolean
    points: number
}

const PointsBarComponent:React.FC<MatchProps> = ({player, points}) => {

    return (
        <div className="point-bar-div"
            style={{'top': player? '0%': '100%',
                transform: player ? 'translateY(0%)' : 'translateY(-100%)',
            }}
        >
            <span className="points-bar" 
                style={{
                    boxShadow: player? '0px 5px 20px #fff': '0px -5px 20px #fff',
                    borderRadius: player? '0px 0px 30px 0px': '0px 30px 0px 0px',
                    width: points
                }}
            >

            </span>
        </div>
    )
}

export default PointsBarComponent;