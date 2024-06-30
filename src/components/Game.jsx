import React, {useCallback, useEffect, useState} from 'react';
import Player from "./Player";
import Goal from "./Goal";

const Game = ({settings, gameBorders}) => {
    const [x, setX] = useState(gameBorders.width - settings.player.width);
    const [y, setY] = useState(gameBorders.height - settings.player.height);
    const [vx, setVx] = useState(0);
    const [vy, setVy] = useState(0);
    const [score, setScore] = useState(0);


    const resetPlayerPosition = useCallback(() => {
        setX(gameBorders.width - settings.player.width);
        setY(gameBorders.height - settings.player.height);
    }, [gameBorders, settings])

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    setVy(-1);
                    break;
                case 'ArrowDown':
                    setVy(1);
                    break;
                case 'ArrowLeft':
                    setVx(-1);
                    break;
                case 'ArrowRight':
                    setVx(1);
                    break;
                default:
                    break;
            }
        };

        const handleKeyUp = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    setVy(0);
                    break;
                case 'ArrowDown':
                    setVy(0);
                    break;
                case 'ArrowLeft':
                    setVx(0);
                    break;
                case 'ArrowRight':
                    setVx(0);
                    break;
                default:
                    break;
            }
        };

        const movePlayer = () => {
            // Calculate new positions
            const newX = x + vx;
            const newY = y + vy;

            // Check if the new position is within borders
            if (
                newX >= 0 &&
                newX <= gameBorders.width - 80 &&
                newY >= 0 &&
                newY <= gameBorders.height - 100
            ) {
                setX(newX);
                setY(newY);
            }
        };

        const interval = setInterval(movePlayer, 5); // Adjust interval for smoother movement

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            clearInterval(interval);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [vx, vy, x, y, gameBorders]);


    useEffect(() => {
        const checkCollision = () => {
            // Calculate player and goal positions
            const playerLeft = x;
            const playerRight = x + settings.player.width;
            const playerTop = y;
            const playerBottom = y + settings.player.height;

            const goalLeft = 0;
            const goalRight = settings.goal.width;
            const goalTop = 0;
            const goalBottom = settings.goal.height;

            // Check for collision
            if (
                playerRight >= goalLeft &&
                playerLeft <= goalRight &&
                playerBottom >= goalTop &&
                playerTop <= goalBottom
            ) {
                // Collision detected
                setScore((prevScore) => prevScore + 1);
                resetPlayerPosition()
                console.log("Collision detected");
            }
        };

        const interval = setInterval(checkCollision, 100); // Adjust interval for collision detection

        return () => {
            clearInterval(interval);
        };
    }, [x, y, settings, resetPlayerPosition]);


    console.log("score:", score);

    return (
        <div className="game-wrapper">
            <img
                className="background-image"
                alt=""
                // src={"assets/football-soccer-field-background.jpg"}
                src={`${process.env.PUBLIC_URL}/assets/${settings.background}`}
            ></img>
            <Player settings={settings} positionX={x} positionY={y}/>
            <Goal settings={settings}/>
            <div className="score">
                Score: {score}
            </div>
        </div>
    );
}

export default Game;
