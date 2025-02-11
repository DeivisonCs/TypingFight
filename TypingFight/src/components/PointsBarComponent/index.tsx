import React from "react";

import "./styles.css";

interface MatchProps {
    myId: string
    player: string
    score: number
}

const PointsBarComponent:React.FC<MatchProps> = ({player, score, myId}) => {

    const getBarRadius = () => {
        let border = '30';

        if(player == myId){
            return `0px 0px ${score<100? border:0}px 0px`
        }

        return `0px ${score<100? border:0}px 0px 0px`
    }

    const pointBarStyle = {
        borderRadius: getBarRadius(),
        width: `${score}%`
    }

    return (
        <div className="point-bar-div"
            style={{'top': player == myId? '0%': '100%',
                transform: player == myId? 'translateY(0%)' : 'translateY(-100%)',
            }}
        >
            <span className={`points-bar ${player == myId? 'my-bar': 'enemy-bar'}`}
                style={pointBarStyle}
            >

            </span>
        </div>
    )
}

export default PointsBarComponent;