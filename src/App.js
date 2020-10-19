import React, { useEffect, useRef } from 'react';
import './App.css';
import { SCREEN } from './game/config';
import { Food } from './game/Food';
import { Snake } from './game/Snake';
import { SnakeGame } from './game/SnakeGame';

function App() {
  const container = useRef();
  useEffect(() => {
    const snakeGame = new SnakeGame(container.current);
    const food = new Food();
    const snake = new Snake(food);

    snakeGame.addObject(snake);
    snakeGame.addObject(food);

    snakeGame.start(SCREEN.interval);
    snake.move();
  }, []);

  return <div id="game-container" ref={container}></div>;
}

export default App;
