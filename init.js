import { WIDTH, HEIGHT, STARTING_LENGTH } from "./parameters.js";
import * as g from './gameFunctions.js'
import styling from "./styling.js";
import { playGame } from "./game.js";

const test = styling();

const createLine = () => `<line>${document.createElement('line').innerHTML = Array(WIDTH).fill(null).map(() => "<pixel><sub></sub></pixel>").join('')}</line>`;

const getDirection = (d, direction) => ((d[0] === 0 && direction[0] === 0) || (d[1] === 0 && direction[1] === 0)) ? direction : d;

const initializeGame = () => {
    const gb = document.querySelector('gameboard');
    const lines = Array(WIDTH).fill(null).map(createLine);
    gb.innerHTML = [...lines].join('');
    const b = [...document.querySelectorAll('line')].map(line => [...line.querySelectorAll('pixel')])
    return {
        score: 0,
        coin: g.createNewCoin([], b),
        board: b,
        restart: true,
        speed: 80,
        paused: false,
    };
}

const initializeSnake = () => ({
    position: [WIDTH / 2, HEIGHT / 2],
    direction: [1,0],
    tail: [],
    length: STARTING_LENGTH,
    dead: false,
});

const addEventListeners = (snake, game) => {
  document.addEventListener("keydown", (e) => {
      const moveMap = {
          "w": [-1, 0],
          "s": [1,0],
          "a": [0,-1],
          "d": [0,1]
      };
      if (Object.keys(moveMap).includes(e.key))
          snake.direction = getDirection(moveMap[e.key], snake.direction);
      else if (e.key === 'p') {
          game.paused = !game.paused
      }
  });

  document.querySelector("#restart").onclick = async () => {
    playGame(...restart());
  }

  document.querySelector("#snake-color").onchange = (e) => {
    test.setStyle("snake", e.target.value);
  }

  document.querySelector("#board-color").onchange = (e) => {
      test.setStyle("board", 'bg-' + e.target.value);
  }

  document.querySelector("#game-speed").onchange = (e) => {
      const speeds = {
          slow: 200,
          normal: 80,
          fast: 40
      }
      game.speed = speeds[e.target.value] || 100;
  }
  return [snake, game]
}

export const init = () => addEventListeners(initializeSnake(), initializeGame())

export const restart = () => [initializeSnake(), initializeGame()]