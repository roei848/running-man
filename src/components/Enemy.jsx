import React, { useEffect, useState } from 'react';

const Enemy = ({ enemy, playerPosition, onCollision, gameBorders }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [velocity, setVelocity] = useState({ vx: enemy.speedX, vy: enemy.speedY });

    useEffect(() => {
        const moveEnemy = () => {
            setPosition(prevPosition => {
                let newX = prevPosition.x + velocity.vx;
                let newY = prevPosition.y + velocity.vy;

                // Check for collision with game borders and reverse direction if needed
                if (newX <= 0 || newX + enemy.width >= gameBorders.width) {
                    setVelocity(prevVelocity => ({ ...prevVelocity, vx: -prevVelocity.vx }));
                    newX = Math.max(0, Math.min(newX, gameBorders.width - enemy.width));
                }

                if (newY <= 0 || newY + enemy.height >= gameBorders.height) {
                    setVelocity(prevVelocity => ({ ...prevVelocity, vy: -prevVelocity.vy }));
                    newY = Math.max(0, Math.min(newY, gameBorders.height - enemy.height));
                }

                return { x: newX, y: newY };
            });
        };

        const interval = setInterval(moveEnemy, 50); // Move every 50ms

        return () => clearInterval(interval);
    }, [velocity, enemy.width, enemy.height, gameBorders]);

    useEffect(() => {
        // Check for collision with the player
        if (
            playerPosition.x < position.x + enemy.width &&
            playerPosition.x + 50 > position.x && // Assuming player width is 50
            playerPosition.y < position.y + enemy.height &&
            playerPosition.y + 50 > position.y // Assuming player height is 50
        ) {
            onCollision();
        }
    }, [position, playerPosition, enemy.width, enemy.height, onCollision]);

    return (
        <div
            style={{
                position: 'absolute',
                top: position.y,
                left: position.x,
                height: enemy.height,
                width: enemy.width
            }}
            className="enemy-img"
        >
            <img src={`${process.env.PUBLIC_URL}/assets/${enemy.img}`} alt="enemy" />
        </div>
    );
};

export default Enemy;
