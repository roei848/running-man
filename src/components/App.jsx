import React from 'react';
import Game from "./Game";
import settings from './gameSettings.json';
import './app.css';

const App = () => {
    const screenBorders = {height: window.innerHeight, width: window.innerWidth};

    return (
        <div className="app-wrapper">
            <Game settings={settings} gameBorders={screenBorders}/>
        </div>
    );
}

export default App;
