import React, {useCallback, useEffect, useState} from 'react';
import Player from "./Player";
import Goal from "./Goal";
import Enemy from "./Enemy";

const Game = ({settings, gameBorders}) => {
    const [playerPosition, setPlayerPosition] = useState({
        x: gameBorders.width - settings.player.width,
        y: gameBorders.height - settings.player.height
    });
    const [playerVelocity, setPlayerVelocity] = useState({vx: 0, vy: 0});
    const [score, setScore] = useState(0);


    const resetPlayerPosition = useCallback(() => {
        setPlayerPosition({
            x: gameBorders.width - settings.player.width,
            y: gameBorders.height - settings.player.height
        })
    }, [gameBorders, settings])


    const handlePlayerGoalCollision = useCallback(() => {
        resetPlayerPosition();
        setScore((prevScore) => prevScore + 1);
    }, [resetPlayerPosition])

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    setPlayerVelocity((prev) => ({...prev, vy: -2}));
                    break;
                case 'ArrowDown':
                    setPlayerVelocity((prev) => ({...prev, vy: 2}));
                    break;
                case 'ArrowLeft':
                    setPlayerVelocity((prev) => ({...prev, vx: -2}));
                    break;
                case 'ArrowRight':
                    setPlayerVelocity((prev) => ({...prev, vx: 2}));
                    break;
                default:
                    break;
            }
        };

        const handleKeyUp = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                case 'ArrowDown':
                    setPlayerVelocity((prev) => ({...prev, vy: 0}));
                    break;
                case 'ArrowLeft':
                case 'ArrowRight':
                    setPlayerVelocity((prev) => ({...prev, vx: 0}));
                    break;
                default:
                    break;
            }
        };

        const movePlayer = () => {
            setPlayerPosition((prev) => {
                const newX = prev.x + playerVelocity.vx;
                const newY = prev.y + playerVelocity.vy;

                // Check if the new position is within borders
                if (
                    newX >= 0 &&
                    newX <= gameBorders.width - settings.player.width &&
                    newY >= 0 &&
                    newY <= gameBorders.height - settings.player.height
                ) {
                    return {x: newX, y: newY};
                }

                return prev;
            });
        };

        const interval = setInterval(movePlayer, 5); // Adjust interval for smoother movement

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            clearInterval(interval);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [playerVelocity, gameBorders, settings.player.width, settings.player.height]);


    return <div className="game-wrapper">
        <img
            className="background-image"
            alt=""
            src={`${process.env.PUBLIC_URL}/assets/${settings.background}`}
        ></img>
        <Player player={settings.player} playerPosition={playerPosition}/>
        {
            score > 0 ? settings.enemies.slice(0, score).map(enemy => {
                    return <Enemy enemy={enemy} player={settings.player} playerPosition={playerPosition}
                                  onCollision={resetPlayerPosition} gameBorders={gameBorders}/>
                }
            ) : <></>
        }
        <Goal goal={settings.goal} player={settings.player} playerPosition={playerPosition}
              onCollision={handlePlayerGoalCollision}/>
        <div className="score">
            Score: {score}
        </div>
    </div>;
}

export default Game;
