import { init } from './init.js'
import { playGame } from './game.js'

document.querySelector("#restart").onclick = async () => { 
    game.restart = true;
    game.restart = false;
    snake.newDirection = [1,0];
    playGame(initializeSnake(), initializeGame());
}

(_main_ => playGame(...init()))();
