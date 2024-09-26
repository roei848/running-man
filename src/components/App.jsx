import React, { useState } from 'react';
import Game from "./Game";
import euroSet from './euroSet.json';
import nimrodSet from './nimrodSet.json';
import './app.css';

const App = () => {
    const screenBorders = { height: window.innerHeight, width: window.innerWidth };
    const [currentScreen, setCurrentScreen] = useState("main"); // Track if we're on main or in-game
    const [selectedMode, setSelectedMode] = useState(null); // Track selected game mode

    const gameModes = [
        { mode: "Euro", settings:euroSet },
        { mode: "Nimrod", settings: nimrodSet }
    ];

    const handleModeSelect = (mode) => {
        setSelectedMode(mode);
        setCurrentScreen("game"); // Switch to game screen
    };

    if (currentScreen === "game") {
        return (
            <div className="app-wrapper">
                <Game settings={selectedMode.settings} gameBorders={screenBorders} />
            </div>
        );
    }

    // Main Screen with Game Mode Selection
    return (
        <div className="main-screen">
            <h1 className="title">Select Game Mode</h1>
            <div className="mode-selection">
                {gameModes.map((mode) => (
                    <button
                        key={mode.mode}
                        className="mode-button"
                        onClick={() => handleModeSelect(mode)}>
                        {mode.mode}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default App;
