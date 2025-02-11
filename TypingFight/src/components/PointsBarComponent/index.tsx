import React from "react";

import "./styles.css";

interface MatchProps {
    player: boolean
    points: number
}

const PointsBarComponent:React.FC<MatchProps> = ({player, points}) => {

    const getBarRadius = () => {
        let border = '30';

        if(player){
            return `0px 0px ${points<100? border:0}px 0px`
        }

        return `0px ${points<100? border:0}px 0px 0px`
    }

    const pointBarStyle = {
        boxShadow: player? '0px 5px 20px #fff': '0px -5px 20px #fff',
        borderRadius: getBarRadius(),
        width: `${points}%`
    }

    return (
        <div className="point-bar-div"
            style={{'top': player? '0%': '100%',
                transform: player ? 'translateY(0%)' : 'translateY(-100%)',
            }}
        >
            <span className="points-bar" 
                style={pointBarStyle}
            >

            </span>
        </div>
    )
}

export default PointsBarComponent;