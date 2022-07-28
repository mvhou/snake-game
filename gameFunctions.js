import * as u from './utilities.js'
import { WIDTH, HEIGHT } from "./parameters.js";

export const checkTailHit = (position, tail) => (tail.find(x => u.checkPos(x, position)) !== undefined)

export const createNewCoin = (tail, board) => {
  let newCoin =   u.randomPos(HEIGHT-1, WIDTH-1);
  while (tail.find(x => (u.checkPos(x, newCoin)))) {
      newCoin = u.randomPos(HEIGHT-1, WIDTH-1);
  }
  u.setClass(newCoin, "coin", board);
  return newCoin;
}

export const manageTail = (snake, board) => {
  snake.tail.push(snake.position);
  if (snake.tail.length > snake.length) {
      u.removeClass(snake.tail.splice(0,1)[0], "snake", board);
  }
  u.setClass(snake.position, "snake", board)
}

export const getNewPosition = ([dY, dX], [pY, pX]) => {
  const newY = (dY + pY) % HEIGHT;
  const newX = (dX + pX) % WIDTH;
  return [(newY >= 0) ? newY : HEIGHT - 1, (newX >= 0) ? newX : WIDTH -1];
}