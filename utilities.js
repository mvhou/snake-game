import { WIDTH, HEIGHT } from "./parameters.js";

export const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const randomPos = (maxY, maxX) => [randomNum(0, maxY), randomNum(0, maxX)];

export const checkPos = ([y1, x1], [y2, x2]) => (y1 == y2 && x1 == x2);

export const sleep = async (t) => new Promise((r) => setTimeout(r, t));

export const setClass = ([y,x], c, board) => board[y][x].classList.add(c);

export const removeClass = ([y,x], c, board) => board[y][x].classList.remove(c);

export const getNewPosition = ([dY, dX], [pY, pX]) => {
  const newY = (dY + pY) % HEIGHT;
  const newX = (dX + pX) % WIDTH;
  return [(newY >= 0) ? newY : HEIGHT - 1, (newX >= 0) ? newX : WIDTH -1];
}

export const checkTailHit = (position, tail) => (tail.find(x => checkPos(x, position)) !== undefined)

export const updateScore = (score) => document.querySelector('#score').innerText = score;