import React from 'react';
import { useState, useEffect } from 'react';
import { generate } from 'random-words';
import { v4 as uuidv4 } from 'uuid';
import ListWords from './ListWords';

import '../App.css';

// This component represents the main area where the typing game happens. 
// It could include the columns for score, lives, and level counters, as well as the input box for typing.
const TypingGame = () => {
    const [wordColumns, setWordColumns] = useState([[], [], []])
    const [selectedColumn, setSelectedColumn] = useState(1);


    // Generate random word, and store into random column
    useEffect(() => {
        const interval = setInterval(() => {
            const randomWord = { word: generate(), id: uuidv4() };
            const randomColumn = Math.floor(Math.random() * 3);
            setWordColumns(prevColumns => {
                const updatedColumns = [...prevColumns];
                if (updatedColumns[randomColumn].length >= 10) {
                    updatedColumns[randomColumn].pop();
                }
                updatedColumns[randomColumn] = [randomWord, ...updatedColumns[randomColumn]];
                return updatedColumns;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    // Get right/left key press and update position
    useEffect(() => {
        const handleKeyPress = (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    setSelectedColumn(prev => Math.max(prev - 1, 0)); // Ensure column index doesn't go below 0
                    break;
                case 'ArrowRight':
                    setSelectedColumn(prev => Math.min(prev + 1, 2)); // Ensure column index doesn't exceed 2 (assuming 3 columns)
                    break;
                default:
                    break;
            }
        };
    
        window.addEventListener('keydown', handleKeyPress);
    
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <div id="gameWrapper">
            <div className="columnWrapper">
                {wordColumns.map((column, index) => (
                    <div key={index} className="column">
                        <ListWords items={column} />
                    </div>
                ))}
            </div>
            <div className="indicatorWrapper">
                <div className="indicators" style={{ left: `${selectedColumn * 33.33}%` }}></div>
            </div>

        
        </div>
    );
};

export default TypingGame;