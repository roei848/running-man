import React from 'react';

const Player = ({ player, playerPosition }) => {
    return (
        <div
            style={{ position: 'absolute', top: playerPosition.y, left: playerPosition.x, height: player.height, width: player.width }}
            className="player-img"
        >
            <img src={`${process.env.PUBLIC_URL}/assets/${player.img}`} alt="player" />
        </div>
    );
};

export default Player;
