import React, { useEffect } from 'react';

const Goal = ({ goal, player, playerPosition,  onCollision }) => {
    useEffect(() => {
        // Check for collision with the player
        if (
            playerPosition.x < 0 + goal.width &&
            playerPosition.x + player.width > 0 &&
            playerPosition.y < 0 + goal.height &&
            playerPosition.y + player.height > 0
        ) {
            onCollision();
        }
    }, [playerPosition, player.height, player.width, goal.width, goal.height, onCollision]);

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: goal.width,
                height: goal.height
            }}
            className="goal-img"
        >
            <img src={`${process.env.PUBLIC_URL}/assets/${goal.img}`} alt="goal" />
        </div>
    );
};

export default Goal;
