import React from 'react';

const Goal = ({settings}) => {
    return (
        <div
            style={{position: 'absolute', top: 0, left: 0, width: settings.goal.width, height: settings.goal.height}}
            className="goal-img"
        >
            <img src={`${process.env.PUBLIC_URL}/assets/${settings.goal.img}`} alt="goal"/>
        </div>
    );
}

export default Goal;
