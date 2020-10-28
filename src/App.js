import './App.css';

import React, { useEffect, useRef, useState } from 'react';

import { Food } from './game/Food';
import { GameFrame } from './game/GameFrame';
import { Snake } from './game/Snake';

function App() {
  const container = useRef();
  const [score, setScore] = useState(0);
  const [isDeath, setIsDeath] = useState(false);
  const [snake] = useState(new Snake());
  
  useEffect(() => {
    const gameFrame = new GameFrame(container.current);
    // snake need to know where is food placed
    snake.food = new Food();

    snake.onScoreChange = (s) => setScore(s);
    snake.onDeath = (v) => setIsDeath(v);

    gameFrame.addObject(snake);
    gameFrame.addObject(snake.food);

    gameFrame.start();
    snake.move();
  }, [snake]);

  const handleReset = () => {
    snake.tails = [];
    setScore(0);
  };

  return (
    <>
      <div id="game-container" ref={container}></div>

      <div>
        <span>Score:</span> <span>{score}</span>
      </div>

      <div>
        <span>Is death:</span> <span>{isDeath ? 'TRUE' : 'FALSE'}</span>
      </div>

      <div>
        <button onClick={handleReset}>
          Reset
        </button>
      </div>
    </>
  );
}

export default App;
