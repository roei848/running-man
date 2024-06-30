import React from 'react';

const Player = ({ settings, positionX, positionY }) => {


    return (
        <div
            style={{ position: 'absolute', top: positionY, left: positionX, height: settings.player.height, width: settings.player.width }}
            className="player-img"
        >
            <img src={`${process.env.PUBLIC_URL}/assets/${settings.player.img}`} alt="player" />
        </div>
    );
};

export default Player;
