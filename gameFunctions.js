import * as u from './utilities.js'
import { WIDTH, HEIGHT, STARTING_LENGTH } from "./parameters.js";


export const createNewCoin = (tail, board) => {
  let newCoin =   u.randomPos(HEIGHT-1, WIDTH-1);
  while (tail.find(x => (u.checkPos(x, newCoin)))) {
      newCoin = u.randomPos(HEIGHT-1, WIDTH-1);
  }
  u.setClass(newCoin, "coin", board);
  return newCoin;
}